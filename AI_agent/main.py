import os
from dotenv import load_dotenv
from deepgram import DeepgramClient

def transcribe_audio():
    # Load environment variables from .env
    load_dotenv()

    # Initialize the client using your environment variable
    deepgram = DeepgramClient(api_key=os.getenv("DEEPGRAM_API_KEY"))

    try:
        # Call the API using Deepgram SDK v7 syntax
        response = deepgram.listen.v1.media.transcribe_url(
            url="https://static.deepgram.com/examples/interview_speech-analytics.wav",
            model="nova-2",
            smart_format=True,
        )

        # Output the final transcript string
        print(response.results.channels[0].alternatives[0].transcript)

    except Exception as error:
        print(f"Deepgram error: {error}")

if __name__ == "__main__":
    transcribe_audio()
