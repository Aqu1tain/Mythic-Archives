# Lore Service API

Base URL: `http://localhost:3002`

All write operations require JWT authentication.

## Creatures

### Create Creature
```http
POST /creatures
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dragon",
  "origin": "Nordic"
}
```

### Get All Creatures
```http
GET /creatures?limit=50&skip=0
```

### Get Creature by ID
```http
GET /creatures/:id
```

### Update Creature
```http
PUT /creatures/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Dragon",
  "origin": "Celtic"
}
```

### Delete Creature
```http
DELETE /creatures/:id
Authorization: Bearer <token>
```

## Testimonies

### Create Testimony
```http
POST /testimonies
Authorization: Bearer <token>
Content-Type: application/json

{
  "creatureId": "507f1f77bcf86cd799439011",
  "description": "I saw it near the mountains"
}
```

### Get Testimonies for Creature
```http
GET /creatures/:id/testimonies?limit=50&skip=0
```

### Validate Testimony
```http
POST /testimonies/:id/validate
Authorization: Bearer <token>
Content-Type: application/json

{
  "validatorId": "1"
}
```

### Reject Testimony
```http
POST /testimonies/:id/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "rejecterId": "1"
}
```

## Business Rules
- Cannot validate own testimony
- 5-minute cooldown between testimonies for same creature
- Creature names must be unique
- Description is mandatory
