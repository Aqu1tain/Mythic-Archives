# Mythic Archives

Plateforme de recensement de créatures mythologiques avec système de témoignages et validation par des experts.

## Architecture

- **auth-service**: Service d'authentification (Express + Prisma + SQLite)
- **lore-service**: Service de gestion du bestiaire et témoignages (Express + Mongoose + MongoDB)

## Installation

### Auth Service

```bash
cd auth-service
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Le service démarre sur le port 3001.

### Test

Vérifiez que le service fonctionne:

```bash
curl http://localhost:3001/health
```

## Stack Technique

- Node.js + Express.js
- Prisma (SQL) + Mongoose (MongoDB)
- JWT pour l'authentification
- Rôles: USER, EXPERT, ADMIN

## Documentation

À venir: Swagger/OpenAPI
