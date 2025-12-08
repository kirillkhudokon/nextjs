import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const posts = sqliteTable('Posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  url: text('url').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  UserId: integer('UserId'),
  createdAt: text('createdAt').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt').notNull().default(sql`CURRENT_TIMESTAMP`)
})
