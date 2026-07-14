# Architecture and Scaling Roadmap

This roadmap outlines architectural, security, and scaling improvements recommended for high-volume production use.

---

## 1. Security Improvements

- **Remove Frontend Direct API Bypass**: Re-route all `/api/session/create` and `/api/chat` requests through the Laravel backend instead of calling the FastAPI port directly. This allows Laravel to run JWT verification cookies/middleware checks on every incoming chat request and prevents unauthorized third-party billing exploitation.
- **Implement Rate Limiting**: Enforce rate limiters using Laravel's middleware (`throttle:api`) or Nginx `limit_req_zone` blocks on FastAPI request handlers to prevent D-ID credit draining.

---

## 2. Performance & Latency Improvements

- **Asynchronous Task Queue for Polling**: Replace synchronous blocking loops (`time.sleep(1)`) in FastAPI with an asynchronous worker system like Celery (Python) or BullMQ (Node/Laravel). FastAPI submits video talk creation requests and returns immediately. A background worker polls D-ID and pushes the finished video URL to the client via WebSockets.
- **Pre-rendering and Caching**: Cache common greeting videos and static responses to reduce D-ID generation costs and lower chat response latency.

---

## 3. Operations & Infrastructure

- **Centralized Session State (Redis)**: Store FastAPI session data in Redis instead of localized memory (`sessions = {}`). This allows scaling the FastAPI service horizontally behind a load balancer without dropping session states.
- **Structured Logging & Monitoring**: Integrate logs (Laravel `storage/logs/laravel.log` and FastAPI logs) into an ELK stack or Grafana Loki. Set up Datadog or Prometheus monitoring for request rates, D-ID API success rates, and CPU/memory utilization.
- **Sentry Integration**: Add Sentry to frontend, backend, and AI service to capture runtime exceptions and track performance metrics.
