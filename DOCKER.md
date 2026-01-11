# Docker Setup

## Prerequisites

- Docker
- Docker Compose

## Technical Details

- All services use Node.js 20 Alpine
- MongoDB 7
- Services communicate via internal Docker network

## Quick Start

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f auth-service
```

## Services

- **auth-service**: Port 3001
- **lore-service**: Port 3002
- **mythology-service**: Port 3003
- **mongodb**: Port 27017

## Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-jwt-secret
SERVICE_SECRET=your-service-secret
```

## Accessing Services

- Auth Service: http://localhost:3001
- Lore Service: http://localhost:3002
- Mythology Service: http://localhost:3003
