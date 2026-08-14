# Deploying med-lamari-portfolio to Vercel

Recommended steps:

1. Push your repository to GitHub/GitLab/Bitbucket if not already pushed.
2. In Vercel dashboard, click "New Project" → Import Git Repository.
3. Set the project Root to `artifacts/med-lamari-portfolio`.
4. Set the **Framework Preset** (Vercel usually detects Vite) or leave auto-detect.
5. Build Command: `pnpm build` (or `npm run build` / `yarn build` depending on your package manager).
6. Output Directory: `dist`.
7. Environment variables: none required for a static build (add if your app needs any).
8. Deploy.

Alternate CLI deploy (from repo root):

```bash
cd artifacts/med-lamari-portfolio
vercel --prod
```

If you use a monorepo and prefer a single-root Vercel project, set the build command to:

```bash
pnpm --filter @workspace/med-lamari-portfolio run build
```

This repository includes `vercel.json` which uses `@vercel/static-build` and serves the `dist` directory.
