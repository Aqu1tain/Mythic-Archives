![Static Badge](https://img.shields.io/badge/Sup_de-Vinci)

# Mythic Archives

Mythic archives is a school project, in the context of a Backend course

## Installation

```bash
git clone https://github.com/Aqu1tain/Mythic-Archives
cd Mythic-Archives
```

Install dependencies for each service:
```bash
cd auth-service
npm install
cd ../lore-service
npm install
cd ..
```

Launch each microservice separately:
```bash
cd auth-service
npm start
```

In another terminal:
```bash
cd lore-service
npm start
```

Check services are running:
```bash
curl http://localhost:3001/health
curl http://localhost:3002/health
```

Expected responses:
```json
{"status":"OK","service":"auth-service"}
{"status":"OK","service":"lore-service"}
```

## Services

- **auth-service**: http://localhost:3001
- **lore-service**: http://localhost:3002

## API Documentation

See detailed API documentation for each service:
- [Auth Service API](./auth-service/API.md)
- [Lore Service API](./lore-service/API.md)