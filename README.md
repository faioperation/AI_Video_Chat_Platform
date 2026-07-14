# Enterprise AI Video Chat Platform (GPT + D-ID + ElevenLabs)

An enterprise-ready, full-stack video avatar chat platform that combines OpenAI GPT-4o-mini, ElevenLabs Voice Synthesis, and D-ID Talking Presenters to simulate a seamless, realtime avatar conversation experience.

---

## 1. Project Overview & Features
- **Realtime Avatar Simulation**: Simulates direct video conversation with a digital avatar by generating rapid, short video sequences (3–6s) on-demand.
- **AI Core Orchestration**: Integrates OpenAI for conversation generation, ElevenLabs for high-quality voice synthesis, and D-ID for realistic lip-sync rendering.
- **Admin Management Panel**: Includes user directories, detailed session logs, and credit allocation forms.
- **Token Usage Auditing**: Automatically parses prompt, completion, and total tokens from OpenAI and stores statistics in MySQL for analytics and billing.
- **Unified Reverse Proxy**: Fronted by Nginx to coordinate Next.js, Laravel APIs, and FastAPI servers under a single origin without CORS issues.

---

## 2. Architecture & Tech Stack

### Architecture Diagram
```
              [User HTTP Request (Port 80/443)]
                              │
                              ▼
                       ┌──────────────┐
                       │  Nginx Proxy │
                       └──────┬───────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌──────────────────┐ ┌─────────────────┐ ┌───────────────────┐
│ Next.js Frontend │ │ Laravel Backend │ │ FastAPI AI Server │
│   (Port 3000)    │ │   (Port 9000)   │ │    (Port 8000)    │
└──────────────────┘ └────────┬────────┘ └─────────┬─────────┘
                              ▼                    ▼
                      ┌───────┴───────┐   ┌────────┴────────┐
                      │ MySQL / Redis │   │ OpenAI / D-ID   │
                      └───────────────┘   └─────────────────┘
```

### Technologies Used
- **Frontend**: Next.js 16 (React 19), TailwindCSS 4, Axios, js-cookie
- **Backend**: Laravel 12 (PHP 8.2), Spatie Permission, Firebase JWT
- **AI Orchestration**: FastAPI (Python 3.10), Uvicorn, OpenAI SDK, D-ID Talks API
- **Infrastructure**: Nginx, Docker & Docker Compose, MySQL 8.0, Redis

---

## 3. Directory Layout
```
project/
├── ai/                # Python FastAPI server (LLM and video orchestration)
├── backend/           # Laravel 12 API server (User profiles, auth, token logging)
├── docs/              # Detailed audits, API specs, schemas, and roadmap
├── frontend/          # Next.js SPA client app
├── nginx/             # Nginx reverse proxy configurations
├── docker-compose.yml # Dev/Base docker services setup
└── .env.example       # Aggregated environmental variable configurations
```

---

## 4. Quickstart & Installation

### Prerequisites
- Docker and Docker Compose
- API Keys for OpenAI, D-ID, and ElevenLabs

### Setup Instructions

1. **Clone and Configure**:
   ```bash
   git clone <repo-url>
   cd project_8_AI_Video_Chat_Platform
   cp .env.example .env
   # Open .env and add your OpenAI, D-ID, and ElevenLabs API keys
   ```

2. **Launch via Docker**:
   ```bash
   docker compose up -d --build
   ```

3. **Migrate & Seed Databases**:
   ```bash
   docker compose exec backend php artisan migrate --force
   docker compose exec backend php artisan db:seed --class=RoleSeeder
   docker compose exec backend php artisan db:seed --class=AdminSeeder
   ```

4. **Verify Application**:
   Open `http://localhost` in your browser. The default administrator account is `neazmorshed407@gmail.com` with the password `password`.

---

## 5. API Overview & Authentication

- **Authentication**: JWT Token-based. The backend verifies requests by checking the `user_token` or `admin_token` stored in HTTP-Only cookies.
- **Key Endpoints**:
  - `POST /api/user-login`: Log in to user profiles.
  - `POST /api/session/create`: Initialize FastAPI chat session.
  - `POST /api/chat`: Submit text prompts, run GPT and D-ID render pipelines.
  - `GET /api/all-users`: Admin-only view to inspect registered users.

*For detailed route models, refer to [docs/api.md](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/api.md).*

---

## 6. Comprehensive Documentation Directory
To dive deeper into specific components, refer to our localized documentation:
- **[Audit Report](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/audit_report.md)**: Details code issues, security risks, and bottlenecks.
- **[Architecture & Flow](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/architecture.md)**: Systems architecture and dependency maps.
- **[API catalog](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/api.md)**: Route definitions, input validation, and output templates.
- **[Database layout](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/database.md)**: Schema specifications, column keys, and relations.
- **[AI Service Workflow](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/ai_service.md)**: Prompt configurations and D-ID poll loops.
- **[Deployment Guide](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/deployment.md)**: Manual startup, PM2, systemd, and VPS configuration.
- **[Readiness Checklist](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/checklist.md)**: Standard check models before pushing to production.
- **[Improvement Roadmap](file:///d:/FAI_Projects/project_8_AI_Video_Chat_Platform/docs/roadmap.md)**: Long term scalability improvements.
