# Tiara Catering

Bilingual English/Arabic Tiara Catering website built with the Next.js App Router and deployed as a static export to Firebase Hosting.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Node 22 or newer is required (`engines` in
`package.json`; CI builds on the `node:22` image).

To preview what actually ships — the exported files, served the way Hosting serves them,
redirects and clean URLs included:

```bash
npm run build
npm run start
```

## Production verification

```bash
npm test
```

This runs `next build` and then serves the exported `out/` directory from a local HTTP server that mimics Hosting's `cleanUrls`, asserting against the prerendered HTML a crawler would receive: the English and Arabic homepage and menu routes, SEO metadata, contact details, and Bevatel integration. Contact details are asserted against the constants in `app/contact-details.ts`, so changing a number there rolls through without the tests going stale.

## Deployment

`next.config.mjs` sets `output: "export"`, so `npm run build` emits a fully static site
into `out/`. There is no Node server in production — Firebase Hosting serves those files
directly.

Pushes to `main` deploy themselves. The `deploy-hosting-main` Cloud Build trigger (project
`tiara-catering`, region `us-central1`, wired to the repo through the `github-tiaragroup`
2nd-gen connection) runs the pipeline in `cloudbuild.yaml`:

```
npm ci  ->  npm run lint  ->  npm run build  ->  node --test tests/rendered-html.test.mjs  ->  firebase deploy --only hosting
```

Lint and tests gate the deploy: either one failing stops the build before anything reaches
Hosting. The deploy step authenticates as
`cloudbuild-deployer@tiara-catering.iam.gserviceaccount.com` through Application Default
Credentials on the Cloud Build metadata server, so no token or key file is involved.

To deploy by hand from a clean tree, `npm run deploy` builds and pushes to the same
project (`.firebaserc` pins it to `tiara-catering`).

`firebase.json` carries the Hosting behaviour worth knowing about:

- `cleanUrls` serves pages at extensionless paths (`/menus`, `/ar`).
- 301 redirects preserve the WordPress URLs the domain served before this site replaced it.
- Cache headers: content-addressed `/_next/static/**` and image and font assets are
  immutable for a year, everything else must revalidate.
