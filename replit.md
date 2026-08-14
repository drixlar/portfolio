# Med Lamari — Full-Stack Engineer Portfolio

A premium bilingual portfolio for Mohamed (Med) Lamari, presenting his verified experience, technical stack, education, certifications, and selected software projects to European and international recruiters.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/med-lamari-portfolio run dev` — run the portfolio preview
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/med-lamari-portfolio/src/App.tsx` — portfolio sections, bilingual content, interactions, and navigation
- `artifacts/med-lamari-portfolio/src/index.css` — visual theme, responsive layout, animations, and reduced-motion rules
- `artifacts/med-lamari-portfolio/public/` — portrait and CV download assets
- `attached_assets/` — original user-provided brief, CV, and portrait

## Architecture decisions

- Portfolio content is maintained as structured TypeScript data inside the frontend so the experience timeline, skills, projects, education, certifications, languages, and translations remain easy to update.
- English is the default language; French switches instantly on the client and covers the full visible experience, not only navigation.
- The CV is the source of truth for professional claims. Private details such as birth date and home address are intentionally excluded.
- The portfolio is frontend-only for now; the GitHub project cards use the exact supplied repository URLs and avoid claiming unsupported live demos or features.

## Product

The site introduces Med as a Full-Stack Software Engineer focused on Java, Spring Boot, Angular, Node.js, microservices, REST APIs, and modern web development. It includes an expandable experience timeline, skills by category, an architecture visualization, two selected GitHub projects, academic journey, certifications, language levels, contact links, and a downloadable CV.

## User preferences

- Keep professional information accurate to the supplied CV; do not invent employers, responsibilities, technologies, dates, certificates, or contact links.
- Preserve the premium dark engineering-product direction, bilingual English/French support, and responsive/mobile-first behavior.

## Gotchas

- The current portfolio is a presentation-first frontend and does not require the shared API server or database.
- Keep the public CV and portrait assets available when changing the download or profile image paths.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
