# Deployment Guide - Local & Production

This guide covers deployment instructions for local development and production environments using Docker Compose, Nginx, SSL, and Linux Virtual Private Servers (VPS).

---

## 1. Local Development Setup (Manual)

### Prerequisites
- PHP 8.2+ & Composer
- Node.js 18+ & npm
- Python 3.8+ & pip
- MySQL server running locally

### Running the Services

1. **Backend**:
   ```bash
   cd backend
   cp .env.example .env
   composer install
   php artisan key:generate
   php artisan migrate
   php artisan db:seed --class=RoleSeeder
   php artisan db:seed --class=AdminSeeder
   php artisan serve --port=8080
   ```
2. **AI Service**:
   ```bash
   cd ai
   pip install -r requirements.txt
   # Set OPENAI_API_KEY and DID_API_KEY in ai/.env
   uvicorn main:app --reload --port=8000
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 2. Docker & Docker Compose Deployment

The application is dockerized using a multi-service layout: `frontend` (Next.js), `backend` (Laravel 12 + PHP-FPM), `ai` (FastAPI), `db` (MySQL), and `redis` (Cache).

### Quickstart (Local Docker)

1. Clone and navigate to the project directory:
   ```bash
   cd project_8_AI_Video_Chat_Platform
   ```
2. Configure environmental credentials in `.env` (use `.env.example` as a template).
3. Start the containers using Docker Compose:
   ```bash
   docker compose up -d --build
   ```
4. Perform database setup inside the running backend container:
   ```bash
   docker compose exec backend php artisan migrate --force
   docker compose exec backend php artisan db:seed --class=RoleSeeder
   docker compose exec backend php artisan db:seed --class=AdminSeeder
   ```

---

## 3. Production VPS Deployment (Ubuntu + Nginx + SSL)

For production, we run the services behind an Nginx reverse proxy which terminates SSL using Let's Encrypt certificates.

### Step 1: Install Docker & Nginx on VPS
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose nginx certbot python3-certbot-nginx -y
```

### Step 2: Configure Domain and SSL
Point your domain (e.g., `chat.example.com`) to the VPS IP address. Run certbot to request SSL certificates:
```bash
sudo certbot --nginx -d chat.example.com
```

### Step 3: Configure Nginx as Reverse Proxy
Replace `/etc/nginx/sites-available/default` with:
```nginx
server {
    listen 80;
    server_name chat.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name chat.example.com;

    ssl_certificate /etc/letsencrypt/live/chat.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chat.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000; # Frontend Next.js
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/session/create {
        proxy_pass http://127.0.0.1:8000; # FastAPI Session Create
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/chat {
        proxy_pass http://127.0.0.1:8000; # FastAPI Chat Handler
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://127.0.0.1:8080; # Laravel REST endpoints
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Reload Nginx:
```bash
sudo systemctl reload nginx
```

### Step 4: Run docker-compose in Production Mode
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
This deploys the containers securely. The ports (3000, 8080, 8000) are mapped internally on the host network, leaving Nginx as the single gateway interface.
