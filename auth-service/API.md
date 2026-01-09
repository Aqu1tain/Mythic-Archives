# Auth Service API

Base URL: `http://localhost:3001`

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "role": "USER",
    "reputation": 0
  },
  "token": "eyJhbGc..."
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": { ... },
  "token": "eyJhbGc..."
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "role": "USER",
  "reputation": 0
}
```

## Admin Routes

### List All Users
```http
GET /admin/users
Authorization: Bearer <admin-token>
```

### Update User Role
```http
PATCH /users/:id/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "EXPERT"
}
```

## Roles
- USER: Default role
- EXPERT: Elevated privileges
- ADMIN: Full access
