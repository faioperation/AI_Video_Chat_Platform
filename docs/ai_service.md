# AI Service Integration Documentation

This document explains the AI workflow, prompting style, video render orchestrations, and integration details with OpenAI, D-ID, and ElevenLabs.

---

## 1. AI Integration Workflow

The platform provides a simulated realtime avatar conversation using a request-response sequence:

```
[User Message] 
      │
      ▼
┌──────────────┐      Prompt
│  call_gpt()  ├──────────────► [OpenAI API] (gpt-4o-mini)
└──────┬───────┘                    │
       │                            ▼ (concise reply text)
┌──────▼─────────────┐
│ create_did_video() ├────────► [D-ID Talk Request] (ElevenLabs Voice, Presenter ID)
└──────┬─────────────┘              │
       │                            ▼ (talk_id)
┌──────▼────────────┐
│ poll_did_video()  ├────────► [Poll D-ID Status]
└──────┬────────────┘              │
       │                            ▼ (mp4 signed S3 URL)
       └────────────────────────────┘ ──► Returns response to client
```

---

## 2. LLM Prompt System

- **Model**: `gpt-4o-mini`
- **Max Tokens**: `150`
- **System Prompt**:
  > "You are a friendly AI assistant. Keep responses short. Within 1-2 lines."
  
The constraints ensure the text-to-speech engine produces a short audio script (typically 3–6 seconds long). This minimizes the video generation wait time and latency, enhancing the "realtime" simulation.

---

## 3. Video Presenter & Text-To-Speech (TTS) Config

- **TTS Engine**: ElevenLabs (through D-ID direct integration).
- **Default Voice ID**: `56AoDkrOh6qfVPDXZ7Pt` (configurable via `ELEVENLABS_VOICE_ID`).
- **Avatar Presenter ID**: `amy-jcwCkr1grs` (configurable via `PRESENTER_ID`).
- **D-ID Endpoint**: `POST https://api.d-id.com/talks`
- **D-ID Payload Structure**:
  ```json
  {
    "script": {
      "type": "text",
      "input": "<GPT_REPLY_TEXT>",
      "provider": {
        "type": "elevenlabs",
        "voice_id": "56AoDkrOh6qfVPDXZ7Pt"
      }
    },
    "presenter_id": "amy-jcwCkr1grs",
    "config": {
      "fluent": false,
      "pad_audio": 0.0
    }
  }
  ```

---

## 4. Video Rendering & Polling

Because D-ID processes video renders asynchronously, the FastAPI server enters a polling loop:
1. Calls `GET https://api.d-id.com/talks/{talk_id}` every 1 second.
2. Checks the `status` field in the response:
   - `done`: Extraction is successful, returns `result_url` (signed S3 download URL).
   - `failed`: Stops polling and raises a RuntimeError.
3. Timeout guard: If the rendering takes longer than `DID_POLL_TIMEOUT` (default: 60s), the loop terminates and throws a TimeoutError.
