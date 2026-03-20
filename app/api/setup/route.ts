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
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const PROJECT_REF = SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1]

  if (!SUPABASE_DB_PASSWORD || !PROJECT_REF) {
    return NextResponse.json({
      error: 'Missing SUPABASE_DB_PASSWORD env var',
      instructions: [
        '1. Go to Supabase Dashboard > Settings > Database',
        '2. Copy the database password',
        '3. Run: npx vercel env add SUPABASE_DB_PASSWORD',
        '4. Redeploy, then call this endpoint again',
      ],
      migration_sql: TABLES_SQL.join(';\n\n'),
    }, { status: 500 })
  }

  try {
    const { default: pg } = await import('pg')

    // Try direct connection first (IPv6, works from Vercel), then pooler (IPv4)
    const configs = [
      {
        name: 'direct',
        host: `db.${PROJECT_REF}.supabase.co`,
        port: 5432,
        user: 'postgres',
        password: SUPABASE_DB_PASSWORD,
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
      },
      {
        name: 'pooler-session',
        host: 'aws-0-ap-southeast-2.pooler.supabase.com',
        port: 5432,
        user: `postgres.${PROJECT_REF}`,
        password: SUPABASE_DB_PASSWORD,
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
      },
      {
        name: 'pooler-transaction',
        host: 'aws-0-ap-southeast-2.pooler.supabase.com',
        port: 6543,
        user: `postgres.${PROJECT_REF}`,
        password: SUPABASE_DB_PASSWORD,
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
      },
    ]

    let connected = false
    let client: InstanceType<typeof pg.Client> | null = null
    const connectionErrors: string[] = []

    for (const config of configs) {
      try {
        const c = new pg.Client(config)
        await c.connect()
        client = c
        connected = true
        console.log(`[setup] Connected via ${config.name}`)
        break
      } catch (e) {
        connectionErrors.push(`${config.name}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }

    if (!connected || !client) {
      return NextResponse.json({
        error: 'Could not connect to database',
        attempts: connectionErrors,
        hint: 'Check SUPABASE_DB_PASSWORD is correct (Dashboard > Settings > Database)',
        migration_sql: TABLES_SQL.join(';\n\n'),
      }, { status: 500 })
    }

    const results = []
    for (const sql of TABLES_SQL) {
      try {
        await client.query(sql)
        results.push({ sql: sql.slice(0, 60) + '...', status: 'ok' })
      } catch (e) {
        results.push({ sql: sql.slice(0, 60) + '...', status: 'error', error: e instanceof Error ? e.message : String(e) })
      }
    }

    await client.end()
    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({
      error: 'Migration failed',
      details: error instanceof Error ? error.message : String(error),
      instructions: 'Run the migration SQL manually in Supabase Dashboard > SQL Editor',
      migration_sql: TABLES_SQL.join(';\n\n'),
    }, { status: 500 })
  }
}
