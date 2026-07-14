# Database Schema & Models Documentation

This document describes the database tables, schema models, relations, indices, and constraints in the system.

---

## 1. Schema Specifications

### `users` Table
Stores registered customers/users who access the talking avatar room.

| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | bigint | Primary Key, Auto Increment | Unique User ID |
| `name` | varchar(255) | Not Null | User's full name |
| `email` | varchar(255) | Unique, Index | User's email |
| `email_verified_at` | timestamp | Nullable | Email validation timestamp |
| `password` | varchar(255) | Not Null | Hashed password |
| `mobile` | varchar(255) | Nullable | Phone number |
| `hear_about_us` | varchar(255) | Nullable | Analytics marketing info |
| `otp` | varchar(255) | Nullable | 4-digit OTP for resets |
| `remember_token` | varchar(100) | Nullable | Cookie remember token |
| `created_at` / `updated_at` | timestamp | Nullable | Standard timestamps |

### `save_token_usages` Table
Tracks OpenAI token consumption statistics and duration logs for each chat session.

| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | bigint | Primary Key, Auto Increment | Log entry ID |
| `user_id` | bigint | Foreign Key (cascade/restrict) | Associated User ID |
| `user_name` | varchar(50) | Not Null | User's name cached at log time |
| `user_email` | varchar(50) | Not Null | User's email cached at log time |
| `chat_duration_seconds` | int | Nullable | Total chat session duration in seconds |
| `session_token` | varchar(255) | Not Null | FastAPI session token UUID |
| `prompt_tokens` | varchar(255) | Not Null | Number of prompt tokens sent to GPT |
| `completion_tokens` | varchar(255) | Not Null | Number of completion tokens generated |
| `total_tokens` | varchar(255) | Not Null | Total tokens consumed (prompt + completion) |
| `created_at` / `updated_at` | timestamp | Nullable | Standard timestamps |

---

## 2. Relationships

```
┌──────────────┐          ┌─────────────────────┐
│    users     │          │  save_token_usages  │
├──────────────┤          ├─────────────────────┤
│ id           ├─────────►│ user_id (FK)        │
│ name         │ 1      * │ user_name           │
│ email        │          │ session_token       │
└──────────────┘          └─────────────────────┘
```

- **User to Token Usages**: One User can have many `SaveTokenUsage` logs (`1:N` relationship).
- **Constraints**: If a user is deleted, Spatie permission tables and token usages enforce relational mapping rules.

---

## 3. Database Setup Instructions

1. Ensure MySQL is running and an empty database named `ai_video_chat` is created.
2. Run database migrations:
   ```bash
   php artisan migrate
   ```
3. Run seeds to register Spatie roles (`admin`, `user`) and default administrator:
   ```bash
   php artisan db:seed --class=RoleSeeder
   php artisan db:seed --class=AdminSeeder
   ```
