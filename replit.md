# UrbanPulse — City Mobility & Urban Experience Intelligence Platform

A luxury-grade analytics intelligence platform that tracks how citizens move through, experience, and interact with urban infrastructure — turning raw city data into actionable intelligence for smart-city planners, transit authorities, and urban policy makers.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/urbanpulse run dev` — run the frontend dashboard
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Recharts, Framer Motion, shadcn/ui
- API: Express 5 (path: `/api`)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for all endpoints)
- `lib/db/src/schema/` — Drizzle table definitions (zones, citizens, cohorts, mobility_events, experience_scores, infrastructure_reports, city_events, weather_snapshots, anomalies)
- `artifacts/api-server/src/routes/` — Express route handlers (dashboard, zones, mobility, cohorts, experience, infrastructure, cityevents, weather, anomalies)
- `artifacts/urbanpulse/src/pages/` — React pages (Dashboard, Zones, Mobility, Cohorts, Experience, Infrastructure, Anomalies, City Events)
- `artifacts/urbanpulse/src/components/layout.tsx` — Sidebar + layout wrapper
- `lib/api-client-react/src/generated/` — Generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — Generated Zod validators for server (do not edit)

## Architecture decisions

- **Contract-first API**: OpenAPI spec gates all codegen; frontend hooks and server validators are always in sync.
- **Star schema DB**: Fact table `mobility_events` links citizens → zones via transport mode; experience_scores and anomalies as behavioral overlays.
- **Analytics-first SQL**: Routes use raw `db.execute(sql\`...\`)` with window functions (RANK, LAG, MODE), CTEs, and aggregates for real BI-quality queries.
- **Glassmorphism pastel UI**: `backdrop-blur`, semi-transparent white cards on a warm gradient — intentionally distinct from dark-mode dashboard templates.
- **Seeded realistic data**: 50 citizens, 8 zones, 6 behavioral cohorts, 300 mobility events, plus weather, anomalies, city events, and experience scores.

## Product

UrbanPulse has 8 intelligence screens:
1. **Dashboard** — animated KPI cards, mobility trend chart, top zones ranking, transport split donut, anomaly alerts
2. **Zones** — zone explorer with heatmap intensity, experience score badges, district/type info
3. **Mobility** — live event feed with transport mode pills, crowding forecast by hour
4. **Cohorts** — behavioral segmentation cards, cohort analysis table, retention scores
5. **Experience** — zone experience scores chart, sentiment breakdown, trend arrows
6. **Infrastructure** — reports grouped by type, severity pipeline, open/resolved status
7. **Anomalies** — risk-scored alert cards, severity color coding, zone attribution
8. **City Events** — event timeline with mobility impact badges and attendance forecasts

## User preferences

- Pastel premium aesthetic: powder pink, blush, soft lavender, warm cream, glassmorphism
- Typography: Plus Jakarta Sans (headings) + Manrope (body)
- No emojis in UI
- Portfolio project — must look elite and recruiter-impressive

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after editing `openapi.yaml`
- Routes under `/api/zones/heatmap` must come BEFORE `/api/zones/:id` in the router (Express matches in order)
- The Google Fonts `@import url(...)` must be the very first line in `index.css`

## SQL Portfolio Features

The project showcases advanced SQL including:
- Window functions: `RANK() OVER`, `LAG() OVER`, `MODE() WITHIN GROUP`
- CTEs for multi-step analytics (cohort metrics, most-visited zones)
- Aggregates with `CASE WHEN` for sentiment ratio, severity scoring
- Forecast-style logic using historical avg + random variance
- Anomaly detection via threshold comparisons and cluster detection

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
