import asyncio
import os
import sys
from dotenv import load_dotenv

from pipecat.audio.vad.silero import SileroVADAnalyzer
from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.runner import PipelineRunner
from pipecat.pipeline.task import PipelineParams, PipelineTask
from pipecat.processors.aggregators.llm_response_universal import (
    LLMContext,
    LLMContextAggregatorPair,
)
from pipecat.services.deepgram.stt import DeepgramSTTService
from pipecat.services.sarvam.tts import SarvamTTSService, SarvamTTSSettings
from pipecat.services.google.llm import GoogleLLMService
from pipecat.transports.local.audio import LocalAudioTransport, LocalAudioTransportParams


async def main():
    load_dotenv()

    deepgram_key = os.getenv("DEEPGRAM_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")
    sarvam_key = os.getenv("SARVAM_API_KEY")

    if not gemini_key:
        print("⚠️ Warning: GEMINI_API_KEY is not set in AI_agent/.env")
    if not sarvam_key:
        print("⚠️ Warning: SARVAM_API_KEY is not set in AI_agent/.env")

    # 1. Local microphone and speaker transport with Silero VAD
    vad = SileroVADAnalyzer()
    transport = LocalAudioTransport(
        LocalAudioTransportParams(
            audio_in_enabled=True,
            audio_out_enabled=True,
            vad_analyzer=vad,
        )
    )

    # 2. Deepgram STT configured specifically for Telugu
    stt = DeepgramSTTService(
        api_key=deepgram_key or "",
        settings=DeepgramSTTService.Settings(
            model="nova-2",
            language="te",
            smart_format=True,
            interim_results=True,
            keywords=[
                "Namaskaram:2",
                "Danyavadalu:2",
            ],
        ),
    )

    # 3. LLM Brain with Spoken Telugu prompt constraints (Gemini Flash)
    llm = GoogleLLMService(
        api_key=gemini_key or "",
        settings=GoogleLLMService.Settings(
            model="gemini-3.6-flash",
        ),
    )

    # 4. Native Telugu TTS (Sarvam AI bulbul:v3 model)
    tts = SarvamTTSService(
        api_key=sarvam_key or "",
        settings=SarvamTTSSettings(
            model="bulbul:v3",
            language="te-IN",
            voice="aditya",
        ),
    )

    # Conversational context and system prompt
    messages = [
        {
            "role": "system",
            "content": (
                "You are an AI customer assistant speaking natural, conversational Telugu. "
                "Respond in simple spoken Telugu (వ్యవహారిక భాష), not literary Telugu. "
                "Keep responses to 1-2 concise sentences for low audio latency. "
                "You can use common English loanwords (like phone, ticket, time) as commonly spoken in Telugu."
            ),
        }
    ]

    context = LLMContext(messages)
    context_aggregator = LLMContextAggregatorPair(context)

    # Assemble the sequential stream pipeline
    pipeline = Pipeline([
        transport.input(),              # Audio in from mic
        stt,                            # Telugu Speech -> Telugu Text
        context_aggregator.user(),      # User speech aggregation into context
        llm,                            # Telugu Text -> Response Text
        tts,                            # Response Text -> Telugu Audio
        transport.output(),             # Audio out to speaker
        context_aggregator.assistant(), # Assistant audio response into context
    ])

    task = PipelineTask(
        pipeline,
        params=PipelineParams(
            allow_interruptions=True,
            enable_metrics=True,
        ),
    )

    print("🎙️ Telugu Voice AI Agent initialized! Listening for voice input...")
    runner = PipelineRunner()
    await runner.run(task)


if __name__ == "__main__":
    asyncio.run(main())
