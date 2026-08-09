# Tiara Catering

Bilingual English/Arabic Tiara Catering website built with the Next.js App Router and prepared for Firebase App Hosting.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production verification

```bash
npm test
```

This creates a native Next.js production build, starts it locally, and verifies the English and Arabic homepage and menu routes, SEO metadata, contact details, and Bevatel integration.

## Firebase App Hosting

The repository is ready for Firebase's native Next.js adapter:

- `npm run build` runs `next build`.
- `npm run start` runs `next start`.
- `apphosting.yaml` defines the Cloud Run runtime limits.
- `package-lock.json` is committed so App Hosting can detect and reproduce the framework build.
- Node.js 22 is declared in `package.json`.

To deploy, create an App Hosting backend in the Firebase console, connect this repository, set this directory as the app root, and use `main` as the live branch. Firebase will run the native Next.js build automatically.

The previous Sites/Vinext commands remain available as `npm run dev:sites`, `npm run build:sites`, and `npm run start:sites` for compatibility with the existing hosted preview.
