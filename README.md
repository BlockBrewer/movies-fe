# Movie Platform – Frontend

Next.js interface for browsing and managing movies with poster uploads and secure auth.

## Features

- Authenticated session handling with automatic token refresh and guarded routes
- Movie list, create, edit, delete workflows with poster preview/upload and validation
- React Query caching, optimistic updates, background refetch, and toast feedback
- Tailwind + Radix UI component library, design tokens, and `/design-system` playground
- Pagination controls with loading skeletons, accessible focus states, and empty-state messaging
- next-intl powered localisation ready for multiple languages
- Strict TypeScript types, Zod form validation, Axios interceptors and error normalization

## Setup

1. `cd /Users/kamran/Downloads/code`
2. `npm install`
3. `cp .env.example .env.local`
4. Set `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:3025`)
5. `npm run dev` → app runs at `http://localhost:3001`

The UI expects the backend at `/v1` with auth and movie endpoints available.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

- Main branch is wired to AWS Amplify for automatic deploys on push
- Build command: `npm run build`, Amplify serves the Next.js output
- Configure `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_API_VERSION`, and other env vars in Amplify
- Ensure the backend endpoint is reachable from the Amplify hosting environment

