# Production Readiness Checklist

Before deploying this application to production, ensure that all items in this checklist are verified.

---

## 1. Environment & Configuration
- [ ] `APP_ENV` is set to `production` in Laravel.
- [ ] `APP_DEBUG` is set to `false` in Laravel.
- [ ] `APP_KEY` has been generated (`php artisan key:generate`).
- [ ] `JWT_KEY` has been set to a secure, random string.
- [ ] `NEXT_PUBLIC_API_BASE_URL` is pointing to the public domain name.
- [ ] API keys for OpenAI, D-ID, and ElevenLabs are configured.

## 2. Database & Storage
- [ ] MySQL database connection details are secure.
- [ ] DB credentials do not use default user names or blank passwords.
- [ ] Seeders for Roles (`admin`, `user`) and Admin users have been run.
- [ ] Default admin email and password (`password`) are changed immediately.
- [ ] Database backup jobs are scheduled daily.

## 3. Network & Security
- [ ] SSL certificates are configured and active (HTTPS enforced).
- [ ] CORS policies are restricted to the production domain.
- [ ] API ports (8000, 8080) are blocked by the firewall (only ports 80 and 443 are exposed).
- [ ] Rate limits are configured on critical endpoints.

## 4. Dockerization
- [ ] Docker images are built using multi-stage production targets.
- [ ] Containers run under non-root users where possible.
- [ ] Restart policies are set to `always` or `unless-stopped`.
- [ ] Docker volumes for database data persistence are configured.
- [ ] Health checks are active and logging statuses.
