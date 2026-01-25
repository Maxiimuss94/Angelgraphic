# ANGEL GRAPHIC — Portfolio

Site portfolio pour **ANGEL GRAPHIC**, design graphique et identité visuelle.  
Next.js (App Router), Tailwind CSS, Framer Motion, Sanity.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

| Dossier / fichier | Rôle |
|-------------------|------|
| `app/` | Pages et layout (App Router) |
| `components/` | Navbar, Hero, MonHistoire, MaVision, Portfolio, Projects, Services, Contact, Journal, Footer, Lightbox |
| `lib/constants.ts` | Email, navigation, réseaux sociaux, catégories |
| `lib/journal.ts` | Journal (articles) |
| `lib/sanity.ts` | Client Sanity, GROQ, projets |
| `sanity.config.ts`, `sanity/schemas/` | Sanity Studio, schéma `project` |
| `data/journal.json` | Articles du journal |
| `app/api/contact/route.ts` | API contact (simulation) |

## Configuration

### Sanity (projets)

1. Créer un projet sur [sanity.io/manage](https://sanity.io/manage).
2. Copier `env.example` vers `.env.local`, renseigner `NEXT_PUBLIC_SANITY_PROJECT_ID` et `NEXT_PUBLIC_SANITY_DATASET`.
3. Dans le projet Sanity → **API** → **CORS origins** : ajouter `http://localhost:3000` (et l’URL de production en déploiement), avec *Allow credentials*.
4. **Studio** : `/studio` pour gérer les projets. **Admin** : `/admin` pour les explications.

### Logo

Remplacer `public/Angel Graphic New Logo Design 3 PNG.png` par le logo souhaité, ou adapter `LOGO_PATH` dans `components/Navbar.tsx`.

### Contact

- Email et liens : `lib/constants.ts`.
- Envoi réel : brancher Resend, Nodemailer ou Formspree dans `app/api/contact/route.ts`.

### Journal

Modifier `data/journal.json` pour ajouter ou éditer des articles (`slug`, `title`, `excerpt`, `date`, `content`).

## Build

```bash
npm run build
npm run start
```

## Déploiement sur Vercel

1. **Pousser le code sur Git**  
   GitHub, GitLab ou Bitbucket. Vercel se connecte à ton dépôt.

2. **Créer un projet Vercel**  
   - Va sur [vercel.com](https://vercel.com) et connecte-toi (ou crée un compte).  
   - **Add New** → **Project** → importe ton dépôt `angel-graphic-site`.  
   - Framework : **Next.js** (détecté automatiquement).  
   - **Deploy**.

3. **Variables d’environnement**  
   Dans le projet Vercel → **Settings** → **Environment Variables**, ajoute :
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = ton Project ID Sanity  
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`  
   Puis **Redeploy** le projet pour qu’elles soient prises en compte.

4. **CORS Sanity**  
   Dans [sanity.io/manage](https://sanity.io/manage) → ton projet → **API** → **CORS origins** :  
   - Ajoute l’URL de production (ex. `https://ton-site.vercel.app` ou ton domaine custom).  
   - Coche **Allow credentials**.  
   Ainsi le Studio sur `/studio` et les données projets fonctionneront en prod.

5. **Déploiements suivants**  
   À chaque push sur la branche connectée (souvent `main`), Vercel redéploie automatiquement.

---

© ANGEL GRAPHIC
