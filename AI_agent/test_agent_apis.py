import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

gemini_key = os.getenv("GEMINI_API_KEY", "")
elevenlabs_key = os.getenv("ELEVENLABS_API_KEY", "")
elevenlabs_voice_id = os.getenv("ELEVENLABS_VOICE_ID", "GGBhcpAgpjSrBIr5MQwR")
sarvam_key = os.getenv("SARVAM_API_KEY", "")

print("=== CUSTOM ELEVENLABS VOICE TEST ===")
print(f"Voice ID: {elevenlabs_voice_id}")

if elevenlabs_key:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{elevenlabs_voice_id}"
    headers = {"xi-api-key": elevenlabs_key, "Content-Type": "application/json"}
    payload = {
        "text": "Namaste Kisan Bhai, welcome to Kisan Bima Sahayak PMFBY voice helpdesk.",
        "model_id": "eleven_multilingual_v2"
    }
    try:
        r = requests.post(url, json=payload, headers=headers, timeout=10)
        print(f"-> ElevenLabs TTS HTTP Status: {r.status_code}")
        if r.status_code == 200:
            print(f"-> SUCCESS! Received {len(r.content)} bytes of synthesized audio with voice ID '{elevenlabs_voice_id}'!")
        else:
            print(f"-> ElevenLabs Response Error: {r.text}")
    except Exception as e:
        print(f"-> ElevenLabs Exception: {e}")
else:
    print("-> ELEVENLABS_API_KEY missing!")
