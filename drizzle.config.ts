import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: '/Users/kyrylokh/Documents/next-external-api/storage/database.sqlite'
  }
})
