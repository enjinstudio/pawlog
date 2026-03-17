-- Pets
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

-- Health log entries
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

-- Enable RLS
ALTER TABLE pawlog_pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawlog_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users manage own pets" ON pawlog_pets FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public pets readable" ON pawlog_pets FOR SELECT USING (is_public = true);
CREATE POLICY "Users manage own entries" ON pawlog_entries FOR ALL USING (
  pet_id IN (SELECT id FROM pawlog_pets WHERE user_id = auth.uid())
);
CREATE POLICY "Public entries readable" ON pawlog_entries FOR SELECT USING (
  pet_id IN (SELECT id FROM pawlog_pets WHERE is_public = true)
);
