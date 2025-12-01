## Tixly – Modern Ticketing Platform

Tixly is a venture‑scale ticketing platform built on **Next.js 16 (App Router)** with a **minimal, premium UI** designed to impress event organizers, attendees, and investors.

- **Organizers**: create events, configure ticket types, and view a dashboard with sales insights.
- **Attendees**: discover events, buy tickets via a modern checkout, and manage tickets in a dedicated area.
- **Platform**: MongoDB‑backed auth and event storage, ready to evolve into a full SaaS product.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Tailwind CSS 4, custom design system (globals in `src/app/globals.css`)
- **State / Data**: React Query (configured provider), typed domain models in `src/types`
- **Auth**: Email + password with bcrypt & JWT (httpOnly cookie)
- **Database**: MongoDB (official Node driver)

Key directories:

- `src/app` – pages, routes, and API endpoints
- `src/components` – reusable UI, layout, and event components
- `src/data/mock-events.ts` – rich mock event data for the public experience
- `src/lib` – MongoDB client, auth helpers, formatting utilities

---

## Features Overview

- **Homepage**: hero search, featured events, categories, stats, organizer CTA.
- **Event discovery**: `/events` with search, filters, and sorting.
- **Event detail**: `/events/[slug]` with rich content and ticket selection sidebar.
- **Checkout**: `/checkout` multi‑step flow (contact + payment UI, mocked payment).
- **Auth**: `/login` for sign‑in / sign‑up wired to API (`/api/auth/login`, `/api/auth/register`).
- **Organizer dashboard**: `/dashboard` with stats, recent sales, and event list.
- **Create event**: `/create-event` multi‑step wizard posting to `/api/events`.
- **My tickets**: `/my-tickets` with upcoming/past tickets and QR code modal.

---

## Environment Setup

Create a `.env.local` file in the project root:

```bash
MONGODB_URI="your-mongodb-connection-string"
MONGODB_DB="tixly"
JWT_SECRET="a-long-random-secret-string"
```

- `MONGODB_URI`: standard Mongo connection URI (Atlas or self‑hosted).
- `MONGODB_DB`: database name (defaults to `tixly` if omitted).
- `JWT_SECRET`: a long, random string used to sign auth tokens.

---

## Installation & Scripts

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

> `npm run dev:watch` will run the dev server together with an auto‑commit script. For normal development, prefer `npm run dev`.

---

## Auth Flows (High Level)

- **Register**: `POST /api/auth/register`
  - Validates input, hashes password with bcrypt, stores user in `users` collection.
  - Returns user payload and sets a `tixly_token` httpOnly cookie (JWT).

- **Login**: `POST /api/auth/login`
  - Verifies email/password, signs JWT, and sets `tixly_token` cookie.

- **Session**: server helpers in `src/lib/auth.ts` read and verify the JWT to fetch the current user.

---

## Event Creation & Storage

- Client‑side event creation wizard lives at `/create-event`.
- On publish it calls `POST /api/events` with the form payload.
- The API route:
  - Requires a valid logged‑in user.
  - Normalizes basic fields (name, slug, dates, venue).
  - Stores the event in the `events` collection with `status = draft`.

The public experience still uses rich mock events for a polished demo while the MongoDB‑backed flow is ready for real data.

---

## Running Locally

1. Ensure MongoDB is reachable and your `.env.local` is configured.
2. Install dependencies with `npm install`.
3. Start the dev server with `npm run dev`.
4. Visit `http://localhost:3000`:
   - Try creating an account via `/login`.
   - Create an event via `/create-event`.
   - Explore the event discovery flow and organizer dashboard.

---

## Deployment

This project is designed to deploy cleanly on platforms that support Next.js:

- Set the same environment variables (`MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`) in your hosting provider.
- Use `npm run build` as the build command and `npm start` (or platform default) as the start command.

On Vercel, most defaults “just work”; configure your env vars and hit deploy.

