# IMS backend

Node.js + Express API for the Islamic Mission School website, backed by MySQL or MariaDB.
In production one Node app serves both the API (`/api`) and the built website (`../frontend/dist`).

## First-time setup

```bash
cp .env.example .env          # then fill in the database details and JWT_SECRET
npm install
npm run migrate               # creates the tables
npm run create-admin -- admin@example.com "a long password"
npm run dev                   # http://localhost:4000
```

Run the website alongside it with `npm run dev` in `../frontend` (port 3000). Vite forwards `/api` and `/uploads` to this server.

## Tests

```bash
npm test
```

The API tests run without a database. The end-to-end tests in `test/db.test.js` need a MySQL/MariaDB server (set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`). They create and drop a throwaway `ims_test` database, and skip themselves when no server is reachable.

## What's where

| Path | Purpose |
|---|---|
| `migrations/` | SQL schema, applied in order by `npm run migrate` |
| `src/collections.js` | Every table the admin can edit, with its allowed fields |
| `src/auth.js` | Admin login (bcrypt + httpOnly cookie), logout, change password |
| `src/routes/public.js` | Read-only data for the website (`/api/public/...`) |
| `src/routes/admin.js` | Create, update, reorder and delete, plus the homepage builder (`/api/admin/...`) |
| `src/routes/uploads.js` | Photo and PDF uploads, stored in `uploads/` |

## Deploying on Hostinger (Node.js app)

1. Create a MySQL database in hPanel and note its name, user and password.
2. Build the website: `npm run build` in `frontend/`.
3. Upload the repository, then set the app root to `backend/` and the start command to `npm start`.
4. Add the variables from `.env.example` in hPanel, with `NODE_ENV=production` and a fresh `JWT_SECRET`.
5. Run `npm run migrate` and `npm run create-admin` once over SSH.
6. Keep `uploads/` between deploys. It holds files uploaded through the admin panel.
