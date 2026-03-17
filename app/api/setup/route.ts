import { NextResponse } from 'next/server'

const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS pawlog_pets (
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
);

CREATE TABLE IF NOT EXISTS pawlog_entries (
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
);

ALTER TABLE pawlog_pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawlog_entries ENABLE ROW LEVEL SECURITY;

DO $do$ BEGIN
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
END $do$;
`

export async function GET(request: Request) {
  // Simple secret check
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  const SETUP_SECRET = process.env.SETUP_SECRET || 'pawlog-setup-2024'
  if (secret !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!SERVICE_KEY || !SUPABASE_URL) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  }

  try {
    // Use the pg package to run the migration
    const { default: pg } = await import('pg')
    const client = new pg.Client({
      connectionString: `postgresql://postgres.ablgxcbebsdsdocmffyk:${process.env.SUPABASE_DB_PASSWORD}@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres`,
      ssl: { rejectUnauthorized: false }
    })

    await client.connect()
    await client.query(MIGRATION_SQL)
    await client.end()

    return NextResponse.json({ success: true, message: 'Migration complete' })
  } catch (error) {
    return NextResponse.json({
      error: 'Migration failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
