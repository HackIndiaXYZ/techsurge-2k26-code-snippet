import asyncio
import os
import sys
import json
from dotenv import load_dotenv
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, Response
import uvicorn

from pipecat.audio.vad.silero import SileroVADAnalyzer
from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.runner import PipelineRunner
from pipecat.pipeline.task import PipelineParams, PipelineTask
from pipecat.processors.aggregators.llm_response_universal import (
    LLMContext,
    LLMContextAggregatorPair,
)
from pipecat.serializers.twilio import TwilioFrameSerializer
from pipecat.services.deepgram.stt import DeepgramSTTService
from pipecat.services.elevenlabs.tts import ElevenLabsTTSService
from pipecat.services.google.llm import GoogleLLMService
from pipecat.transports.websocket.fastapi import (
    FastAPIWebsocketParams,
    FastAPIWebsocketTransport,
)
from pipecat.transports.local.audio import LocalAudioTransport, LocalAudioTransportParams

load_dotenv()

app = FastAPI(title="crop.ins Telugu Voice AI Agent & Twilio Server")


@app.get("/")
@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "service": "crop.ins Telugu Voice AI Agent",
        "twilio_webhook_endpoint": "/twiml",
        "websocket_endpoint": "/ws"
    }


@app.api_route("/twiml", methods=["GET", "POST"])
@app.api_route("/webhook", methods=["GET", "POST"])
async def twilio_twiml_webhook(request: Request):
    """
    Twilio Webhook Handler.
    Twilio sends an HTTP POST request here when a phone call is received.
    Returns TwiML XML instructing Twilio to open a WebSocket Stream to /ws.
    """
    host = request.headers.get("host") or "localhost:8765"
    protocol = "wss" if ("ngrok" in host or "loca.lt" in host or "https" in str(request.url)) else "ws"
    ws_url = f"{protocol}://{host}/ws"

    twiml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Aditi">Namaskaram! Welcome to crop ins PMFBY voice helpdesk.</Say>
    <Connect>
        <Stream url="{ws_url}" />
    </Connect>
</Response>"""
    return Response(content=twiml_response, media_type="application/xml")


@app.websocket("/ws")
async def twilio_websocket_endpoint(websocket: WebSocket):
    """
    Twilio Media Streams WebSocket Handler.
    Handles bidirectional 8kHz audio streaming with Deepgram STT (Telugu),
    Gemini 2.5 Flash LLM, and ElevenLabs Multilingual TTS.
    """
    await websocket.accept()

    deepgram_key = os.getenv("DEEPGRAM_API_KEY", "")
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    elevenlabs_key = os.getenv("ELEVENLABS_API_KEY", "")

    if not gemini_key:
        print("⚠️ Warning: GEMINI_API_KEY is not set in AI_agent/.env")
    if not elevenlabs_key:
        print("⚠️ Warning: ELEVENLABS_API_KEY is not set in AI_agent/.env")

    # Read initial Twilio setup packet to extract streamSid
    stream_sid = "stream_default"
    try:
        raw_msg = await websocket.receive_text()
        msg_data = json.loads(raw_msg)
        if msg_data.get("event") == "start":
            stream_sid = msg_data.get("start", {}).get("streamSid", stream_sid)
        elif "streamSid" in msg_data:
            stream_sid = msg_data["streamSid"]
    except Exception as e:
        print(f"Notice: Initial WS frame read: {e}")

    serializer = TwilioFrameSerializer(
        stream_sid=stream_sid,
        params=TwilioFrameSerializer.InputParams(auto_hang_up=False)
    )

    transport = FastAPIWebsocketTransport(
        websocket=websocket,
        params=FastAPIWebsocketParams(
            audio_out_enabled=True,
            add_wav_header=False,
            serializer=serializer,
        )
    )

    # 1. Deepgram STT for Telugu ("te")
    stt = DeepgramSTTService(
        api_key=deepgram_key,
        settings=DeepgramSTTService.Settings(
            model="nova-2",
            language="te",
            smart_format=True,
            interim_results=True,
            keywords=["Namaskaram:2", "Danyavadalu:2"],
        ),
    )

    # 2. Gemini 2.5 Flash LLM Brain with Telugu Conversational Prompt
    llm = GoogleLLMService(
        api_key=gemini_key,
        settings=GoogleLLMService.Settings(
            model="gemini-3.6-flash",
        ),
    )

    # 3. ElevenLabs Multilingual v2 TTS for natural spoken Telugu
    tts = ElevenLabsTTSService(
        api_key=elevenlabs_key,
        settings=ElevenLabsTTSService.Settings(
            voice="21m00Tcm4TlvDq8ikWAM",
            model="eleven_multilingual_v2",
        ),
    )

    messages = [
        {
            "role": "system",
            "content": (
                "You are an AI customer assistant speaking natural, conversational Telugu for PMFBY crop insurance (crop.ins). "
                "Respond in simple spoken Telugu (వ్యవహారిక భాష), not literary Telugu. "
                "Keep responses to 1-2 concise sentences for low audio latency. "
                "You can use common English loanwords (like phone, ticket, policy, claim) as commonly spoken in Telugu."
            ),
        }
    ]

    context = LLMContext(messages)
    context_aggregator = LLMContextAggregatorPair(context)

    pipeline = Pipeline([
        transport.input(),
        stt,
        context_aggregator.user(),
        llm,
        tts,
        transport.output(),
        context_aggregator.assistant(),
    ])

    task = PipelineTask(
        pipeline,
        params=PipelineParams(
            allow_interruptions=True,
            enable_metrics=True,
        ),
    )

    print(f"[+] Twilio Stream connected! StreamSid: {stream_sid}")
    runner = PipelineRunner()
    try:
        await runner.run(task)
    except WebSocketDisconnect:
        print("🔌 Twilio WebSocket disconnected.")
    except Exception as err:
        print(f"Stream error: {err}")


async def run_local_mic_mode():
    """Fallback runner for testing on local microphone and speakers."""
    vad = SileroVADAnalyzer()
    transport = LocalAudioTransport(
        LocalAudioTransportParams(
            audio_in_enabled=True,
            audio_out_enabled=True,
            vad_analyzer=vad,
        )
    )

    deepgram_key = os.getenv("DEEPGRAM_API_KEY", "")
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    elevenlabs_key = os.getenv("ELEVENLABS_API_KEY", "")

    stt = DeepgramSTTService(
        api_key=deepgram_key,
        settings=DeepgramSTTService.Settings(
            model="nova-2",
            language="te",
            smart_format=True,
            interim_results=True,
        ),
    )

    llm = GoogleLLMService(
        api_key=gemini_key,
        settings=GoogleLLMService.Settings(model="gemini-2.5-flash"),
    )

    tts = ElevenLabsTTSService(
        api_key=elevenlabs_key,
        settings=ElevenLabsTTSService.Settings(
            voice="21m00Tcm4TlvDq8ikWAM",
            model="eleven_multilingual_v2",
        ),
    )

    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant speaking natural, conversational Telugu for PMFBY crop.ins.",
        }
    ]

    context = LLMContext(messages)
    context_aggregator = LLMContextAggregatorPair(context)

    pipeline = Pipeline([
        transport.input(),
        stt,
        context_aggregator.user(),
        llm,
        tts,
        transport.output(),
        context_aggregator.assistant(),
    ])

    task = PipelineTask(pipeline, params=PipelineParams(allow_interruptions=True))
    print("🎙️ Local Voice Agent initialized! Listening on microphone...")
    runner = PipelineRunner()
    await runner.run(task)


if __name__ == "__main__":
    if "--local" in sys.argv:
        asyncio.run(run_local_mic_mode())
    else:
        print("Starting crop.ins Twilio Voice AI Server on http://0.0.0.0:8765...")
        uvicorn.run("main:app", host="0.0.0.0", port=8765, reload=False)
