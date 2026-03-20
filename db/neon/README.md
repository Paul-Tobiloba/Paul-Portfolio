1. Create a Neon Postgres database and copy its connection string.
2. Add that value as `DATABASE_URL` in your local `.env.local`.
3. Restore the portfolio data with:
   `psql "$env:DATABASE_URL" -f db/neon/projects.restore.sql`
4. Restart `npm run dev`.

The app will fall back to the local project dataset until `DATABASE_URL` is set.

For Neon SQL Editor use:
`db/neon/projects.insert.sql`
