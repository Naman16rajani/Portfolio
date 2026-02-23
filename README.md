# Portfolio

Payload CMS + Next.js portfolio project with PostgreSQL and Vercel Blob storage for media and resume PDF files.

## Prerequisites

- Bun `>=1.1`
- Node.js `^18.20.2 || >=20.9.0`
- PostgreSQL (local or hosted)
- Docker Desktop (only if you want Docker local setup)
- Vercel account (for deployment and Blob storage)

## 1) Download and Setup Project Locally

```bash
git clone <your-repo-url>
cd portfoliov2
bun install
```

Create environment file from the template:

```bash
cp .env.example .env
```

Update `.env` values:

- `DATABASE_URL` (PostgreSQL connection string)
- `PAYLOAD_SECRET` (long random secret)
- `BLOB_READ_WRITE_TOKEN` (required for Vercel Blob-backed media/resume storage)
- `VERCEL_OIDC_TOKEN` (if your environment uses it)

Start development server:

```bash
bun run dev
```

Open:

- App: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

## 2) Seed User Data (Manual Only)

This project includes a manual user seed command:

```bash
bun run seed:user
```

Optional overrides:

```bash
SEED_USER_EMAIL=you@example.com SEED_USER_PASSWORD=strong-password bun run seed:user
```

Important:

- The seed script is **not** executed automatically.
- Run it only when you intentionally want to seed/reset the test user.

## 3) Run Locally with Docker

The repository includes `Dockerfile` + `docker-compose.yml` for local app + PostgreSQL setup.

Start services:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up --build -d
```

Stop services:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

Notes:

- If `DATABASE_URL` is not set in `.env`, compose falls back to `postgresql://postgres:postgres@postgres:5432/portfolio?sslmode=disable`.
- `BLOB_READ_WRITE_TOKEN` is still required for upload flows that use Vercel Blob.

## 4) Deploy on Vercel

### Step-by-step

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New Project** and import this repo.
3. Configure required environment variables in Vercel Project Settings:
   - `DATABASE_URL`
   - `PAYLOAD_SECRET`
   - `BLOB_READ_WRITE_TOKEN` (**required** for resume/media PDF + file storage)
   - `VERCEL_OIDC_TOKEN` (if used by your setup)
4. Deploy.
5. After deploy, verify:
   - `/admin` loads correctly
   - media uploads work
   - resume PDF flow works via Blob-backed URLs

### Deploy Button

Replace `<REPOSITORY_URL>` with your actual repository URL when ready:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<REPOSITORY_URL>)

## 5) Helpful Commands

```bash
bun run dev
bun run build
bun run start
bun run lint
bun run test:int
bun run test:e2e
bun run generate:types
bun run generate:importmap
```
