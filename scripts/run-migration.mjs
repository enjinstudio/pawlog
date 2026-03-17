#!/usr/bin/env node
// Run: node scripts/run-migration.mjs
// Uses pg to connect directly to Supabase and run the migration

import pg from 'pg'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const { Client } = pg

// Supabase connection via connection pooler
// Format: postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
// We need the DB password - try env or prompt

const PROJECT_REF = 'ablgxcbebsdsdocmffyk'
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD

if (!DB_PASSWORD) {
  console.error('Error: SUPABASE_DB_PASSWORD env var not set')
  console.log('Run: SUPABASE_DB_PASSWORD=yourpassword node scripts/run-migration.mjs')
  process.exit(1)
}

const connectionString = `postgresql://postgres.${PROJECT_REF}:${DB_PASSWORD}@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres`

const sql = readFileSync(join(__dirname, '../supabase/migrations/001_pawlog_schema.sql'), 'utf-8')

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('Connected to database')
  await client.query(sql)
  console.log('Migration complete!')
} catch (err) {
  console.error('Migration failed:', err.message)
} finally {
  await client.end()
}
