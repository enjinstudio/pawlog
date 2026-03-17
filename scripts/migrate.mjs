#!/usr/bin/env node
// Run: node scripts/migrate.mjs

const SUPABASE_URL = 'https://ablgxcbebsdsdocmffyk.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibGd4Y2JlYnNkc2RvY21mZnlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2MjEwMywiZXhwIjoyMDg4MzM4MTAzfQ.zQ77U5Fe_-wo0-RWNdQLEhScUsX_FdSGIN_B5ZdqZYY'

const sql = `
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

DO $$ BEGIN
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
END $$;
`

const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

for (const statement of statements) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql: statement + ';' }),
    })
    const text = await res.text()
    console.log(`Status: ${res.status}`, text.slice(0, 100))
  } catch (e) {
    console.error('Error:', e.message)
  }
}

console.log('Migration complete.')
