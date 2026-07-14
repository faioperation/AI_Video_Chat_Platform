# API Documentation

This catalog documents the API endpoints of both the Laravel backend and the FastAPI AI service.

---

## 1. Laravel Backend APIs

### User Management & Authentication

#### User Registration
- **Method**: `POST`
- **Route**: `/api/user-registration`
- **Request Body**:
  ```json
  {
    "name": "Ahmed Rahman",
    "email": "ahmed@example.com",
    "mobile": "01700000000",
    "password": "securepassword123",
    "password_confirmation": "securepassword123",
    "hear_about_us": "Google Search"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "status": "success",
    "message": "User registered successfully"
  }
  ```

#### User Login
- **Method**: `POST`
- **Route**: `/api/user-login`
- **Request Body**:
  ```json
  {
    "email": "ahmed@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**: `200 OK` (Sets `user_token` HTTP-Only Cookie)
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "token": "eyJhbGciOi...",
    "user": {
      "id": 1,
      "name": "Ahmed Rahman",
      "email": "ahmed@example.com"
    }
  }
  ```

#### User Logout
- **Method**: `GET`
- **Route**: `/api/user-logout`
- **Headers**: `Authorization: Bearer <token>` or Cookie: `user_token=<token>`
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "Logged out successfully"
  }
  ```

#### Send OTP (Password Reset)
- **Method**: `POST`
- **Route**: `/api/user-send-otp`
- **Request Body**:
  ```json
  {
    "email": "ahmed@example.com"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "4 digit OTP code has been sent to your email"
  }
  ```

#### Verify OTP
- **Method**: `POST`
- **Route**: `/api/user-verify-otp`
- **Request Body**:
  ```json
  {
    "email": "ahmed@example.com",
    "otp": "4892"
  }
  ```
- **Response**: `200 OK` (Sets short-lived `user_token` Cookie for reset password step)
  ```json
  {
    "status": "success",
    "message": "OTP verified successfully",
    "token": "eyJhbGciOi..."
  }
  ```

#### Reset Password
- **Method**: `POST`
- **Route**: `/api/user-reset-password`
- **Headers**: Requires User OTP-verified cookie token.
- **Request Body**:
  ```json
  {
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "Password reset successfully"
  }
  ```

---

### Admin Administration APIs

#### Admin Login
- **Method**: `POST`
- **Route**: `/api/admin-login`
- **Request Body**:
  ```json
  {
    "email": "neazmorshed407@gmail.com",
    "password": "password"
  }
  ```
- **Response**: `200 OK` (Sets `admin_token` Cookie)
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "token": "eyJhbGciOi..."
  }
  ```

#### List All Users
- **Method**: `GET`
- **Route**: `/api/all-users`
- **Headers**: Requires `admin_token` cookie.
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "users": [
      {
        "id": 1,
        "name": "Ahmed Rahman",
        "email": "ahmed@example.com",
        "mobile": "01700000000",
        "created_at": "2026-07-14T08:00:00.000000Z"
      }
    ]
  }
  ```

---

## 2. FastAPI AI Service APIs

#### Create Chat Session
- **Method**: `POST`
- **Route**: `/api/session/create`
- **Response**: `200 OK`
  ```json
  {
    "session_token": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"
  }
  ```

#### AI Chat Start (Submit message, get GPT response + video)
- **Method**: `POST`
- **Route**: `/api/chat`
- **Request Body**:
  ```json
  {
    "session_token": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "message": "Tell me a joke."
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "reply_text": "Why don't scientists trust atoms? Because they make up everything!",
    "video_url": "https://d-id-talks-prod.s3.amazonaws.com/.../talk.mp4",
    "chat_duration_seconds": 15,
    "session_token": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "prompt_tokens": 28,
    "completion_tokens": 14,
    "total_tokens": 42
  }
  ```

#### Mark Video as Played
- **Method**: `POST`
- **Route**: `/api/session/{token}/played`
- **Response**: `200 OK`
  ```json
  {
    "ok": true,
    "state": "IDLE"
  }
  ```
