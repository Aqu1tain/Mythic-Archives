# Lore Service

Microservice pour la gestion du bestiaire mythologique et des témoignages.

## Technologies

- **Express.js** - Framework web
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification via auth-service

## Architecture

```
lore-service/
├── src/
│   ├── config/
│   │   └── database.js      # Configuration MongoDB
│   ├── models/
│   │   ├── Creature.js      # Modèle Créature
│   │   ├── Testimony.js     # Modèle Témoignage
│   │   └── index.js         # Export des modèles
│   ├── controllers/         # Contrôleurs (à implémenter)
│   ├── services/            # Logique métier (à implémenter)
│   ├── repositories/        # Accès données (à implémenter)
│   ├── routes/              # Routes API (à implémenter)
│   ├── middlewares/         # Middlewares (à implémenter)
│   └── utils/               # Utilitaires (à implémenter)
├── index.js                 # Point d'entrée
├── package.json
└── .env.example

```

## Modèles

### Creature

- `id` - ObjectId MongoDB
- `authorId` - ID de l'utilisateur créateur (String)
- `name` - Nom unique de la créature
- `origin` - Origine de la créature (optionnel)
- `createdAt` - Date de création

**Contraintes:**
- Le nom doit être unique
- Le nom est obligatoire (2-100 caractères)

### Testimony

- `id` - ObjectId MongoDB
- `creatureId` - Référence vers Creature
- `authorId` - ID de l'utilisateur auteur
- `description` - Description du témoignage (obligatoire, 10-2000 caractères)
- `status` - Statut : PENDING | VALIDATED | REJECTED
- `validatedBy` - ID de l'expert validateur (null si PENDING)
- `validatedAt` - Date de validation (null si PENDING)
- `createdAt` - Date de création

**Contraintes:**
- Description obligatoire
- Status par défaut: PENDING

## Installation

```bash
cd lore-service
npm install
```

## Configuration

Créer un fichier `.env` basé sur `.env.example`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/mythos-archives
AUTH_SERVICE_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here
```

## Lancement

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Endpoints (à implémenter)

### Créatures
- `POST /creatures` - Créer une créature
- `GET /creatures/:id` - Récupérer une créature
- `GET /creatures` - Lister les créatures

### Témoignages
- `POST /testimonies` - Créer un témoignage
- `GET /creatures/:id/testimonies` - Témoignages d'une créature
- `POST /testimonies/:id/validate` - Valider un témoignage (EXPERT)
- `POST /testimonies/:id/reject` - Rejeter un témoignage (EXPERT)

## Règles métier à implémenter

- Impossible de valider son propre témoignage
- Impossible de soumettre deux témoignages sur la même créature en moins de 5 minutes
- JWT obligatoire pour toutes les opérations utilisateur
- Communication avec auth-service pour validation des tokens
