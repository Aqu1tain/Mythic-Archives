![Static Badge](https://img.shields.io/badge/Sup_de-Vinci)

# Mythic Archives

Mythic archives is a school project, in the context of a Backend course

## Installation

Warning : atm, we are still working on the code, so make sure to checkout on dev branch
```bash
git clone https://github.com/Aqu1tain/Mythic-Archives
cd Mythic-Archives
# Temporary, whilst the project is not released
git checkout dev
git pull origin
```

Then, launch each microservice separately
```bash
cd auth-service
npm run dev
```

Same for lore-service
```bash
cd lore-service
npm run dev
```

Check for the both of them on these endpoints (use postman or curl) :

```http request
GET "http:localhost:3001/health"
```
you should get a HTTP 200 code with a message like this :

```json
{
"status": "OK",
"service": "auth-service"
}
```

and done !

## API Documentation

See detailed API documentation for each service:
- [Auth Service API](./auth-service/API.md)
- [Lore Service API](./lore-service/API.md)