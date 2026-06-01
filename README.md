# SSL+++ — Services Solutions Life+++

Plateforme de gestion pour structure d'accompagnement scolaire (6–18 ans).

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Espaces séparés (avec authentification)

| Espace | URL | Accès |
|--------|-----|-------|
| **Site public** | `/`, `/inscription`, `/contact`, `/reglement-interieur` | Ouvert à tous |
| **Espace Parent** | `/parent/*` | Connexion requise → `/connexion/parent` |
| **Back-office** | `/admin/*` | Connexion requise → `/connexion/admin` |

### Comptes démo (MVP)

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Parent | `parent@ssl.dz` | `parent123` |
| Admin Principal | `admin@ssl.dz` | `admin123` |
| Admin Secondaire | `admin2@ssl.dz` | `admin2123` |
| Staff | `staff@ssl.dz` | `staff123` |

> En production : remplacer par NextAuth.js ou authentification serveur + base de données.

## Structure

```
src/app/
├── (public)/          # Site vitrine + inscription
├── connexion/         # Pages de login parent & équipe
├── (parent)/parent/   # Portail parent protégé
└── (admin)/admin/     # Back-office protégé
```

## Prochaines étapes

1. Base de données (PostgreSQL + Prisma)
2. Authentification production (NextAuth.js)
3. Permissions fines par rôle (Admin 2 vs Admin 1)
4. Badgeuse API temps réel
