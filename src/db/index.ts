import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('/Users/kyrylokh/Documents/next-external-api/storage/database.sqlite')
const db = drizzle(sqlite)

export { db, sqlite }
export default db
