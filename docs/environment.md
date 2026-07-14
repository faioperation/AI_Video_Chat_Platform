# Environment Variables Catalog

This document lists and defines all environment variables required by the frontend, backend, and AI services.

---

## 1. Laravel Backend Variables

| Variable | Description | Required | Default | Used By | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `APP_NAME` | Name of the Application | Optional | `Laravel` | Laravel Core | `AIVideoChat` |
| `APP_ENV` | Environment Type | Required | `local` | Laravel Core | `production` |
| `APP_KEY` | Application Encryption Key | Required | None | Laravel Security | `base64:sha256...` |
| `APP_DEBUG` | Enable Debug Output | Optional | `true` | Exception Handler | `false` |
| `APP_URL` | Base URL of Laravel Backend | Required | `http://localhost` | Asset URL helpers | `https://api.example.com` |
| `DB_CONNECTION` | Database Driver | Required | `mysql` | Laravel DB | `mysql` |
| `DB_HOST` | Database host hostname | Required | `127.0.0.1` | Laravel DB | `db` (Docker) |
| `DB_PORT` | Database port number | Required | `3306` | Laravel DB | `3306` |
| `DB_DATABASE` | Database name | Required | `ai_video_chat` | Laravel DB | `video_chat_db` |
| `DB_USERNAME` | Database username | Required | `root` | Laravel DB | `root` |
| `DB_PASSWORD` | Database password | Required | None | Laravel DB | `secure_db_pass` |
| `JWT_KEY` | Secret key for signing JWTs | Required | None | `JWTToken` Helper | `base64_jwt_secret` |
| `AI_SERVER_URL` | Endpoint of Python AI Server | Required | `http://127.0.0.1:8000` | `ChatController` | `http://ai:8000` (Docker) |

---

## 2. FastAPI AI Service Variables

| Variable | Description | Required | Default | Used By | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OPENAI_API_KEY` | OpenAI API Auth Key | Required | None | OpenAI Client | `sk-proj-...` |
| `ELEVENLABS_VOICE_ID` | Voice ID for ElevenLabs speech | Optional | `56AoDkrOh6qfVPDXZ7Pt` | D-ID Video payload | `21m00Tcm4TlvDq8ikWAM` |
| `DID_API_KEY` | D-ID API Credentials key | Required | None | D-ID Header basicauth | `apikey_value` |
| `PRESENTER_ID` | D-ID avatar presenter ID | Optional | `amy-jcwCkr1grs` | D-ID talk request | `amy-jcwCkr1grs` |
| `DID_POLL_TIMEOUT` | Rendering timeout duration (s) | Optional | `60` | Polling loop | `120` |

---

## 3. Frontend Next.js Variables

| Variable | Description | Required | Default | Used By | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_BASE_URL` | Address of Laravel backend API | Required | `http://127.0.0.1:8000` | Axios API Clients | `http://localhost:8000` |
