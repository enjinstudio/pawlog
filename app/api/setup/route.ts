import { NextResponse } from 'next/server'

const TABLES_SQL = [
  `CREATE TABLE IF NOT EXISTS pawlog_pets (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    breed text,
    dob date,
    gender text CHECK (gender IN ('male', 'female', 'unknown')),
    weight_kg numeric(5,2),
    photo_url text,
    is_public boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS pawlog_entries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    pet_id uuid REFERENCES pawlog_pets(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('vet_visit', 'vaccination', 'flea_treatment', 'worming', 'medication', 'weight', 'grooming', 'other')),
    title text NOT NULL,
    notes text,
    date date NOT NULL,
    next_due date,
    weight_kg numeric(5,2),
    vet_name text,
    photo_url text,
    created_at timestamptz DEFAULT now()
  )`,
  `ALTER TABLE pawlog_pets ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE pawlog_entries ENABLE ROW LEVEL SECURITY`,
  `DO $do$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pawlog_pets' AND policyname = 'Users manage own pets') THEN
      CREATE POLICY "Users manage own pets" ON pawlog_pets FOR ALL USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pawlog_pets' AND policyname = 'Public pets readable') THEN
      CREATE POLICY "Public pets readable" ON pawlog_pets FOR SELECT USING (is_public = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pawlog_entries' AND policyname = 'Users manage own entries') THEN
      CREATE POLICY "Users manage own entries" ON pawlog_entries FOR ALL USING (
        pet_id IN (SELECT id FROM pawlog_pets WHERE user_id = auth.uid())
      );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pawlog_entries' AND policyname = 'Public entries readable') THEN
      CREATE POLICY "Public entries readable" ON pawlog_entries FOR SELECT USING (
        pet_id IN (SELECT id FROM pawlog_pets WHERE is_public = true)
      );
    END IF;
  END $do$`,
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  const SETUP_SECRET = process.env.SETUP_SECRET || 'pawlog-setup-2024'
  if (secret !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD

  if (!SUPABASE_DB_PASSWORD) {
    return NextResponse.json({
      error: 'Missing SUPABASE_DB_PASSWORD env var',
      instructions: 'Add SUPABASE_DB_PASSWORD to your Vercel environment variables, then call this endpoint again',
      migration_sql: TABLES_SQL.join(';\n\n'),
    }, { status: 500 })
  }

  try {
    const { default: pg } = await import('pg')
    const client = new pg.Client({
      host: 'aws-0-ap-southeast-2.pooler.supabase.com',
      port: 6543,
      database: 'postgres',
      user: 'postgres.xpiykyqmbitpnvmdmorg',
      password: SUPABASE_DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    })

    await client.connect()

    const results = []
    for (const sql of TABLES_SQL) {
      try {
        await client.query(sql)
        results.push({ sql: sql.slice(0, 50) + '...', status: 'ok' })
      } catch (e) {
        results.push({ sql: sql.slice(0, 50) + '...', status: 'error', error: e instanceof Error ? e.message : String(e) })
      }
    }

    await client.end()
    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({
      error: 'Connection failed',
      details: error instanceof Error ? error.message : String(error),
      instructions: 'You can run the migration SQL manually in Supabase Dashboard > SQL Editor',
      migration_sql: TABLES_SQL.join(';\n\n'),
    }, { status: 500 })
  }
}
