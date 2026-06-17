-- Drop the existing primary key constraint
ALTER TABLE employees DROP CONSTRAINT IF EXISTS employees_pkey;

-- Drop the old BIGINT id column
ALTER TABLE employees DROP COLUMN IF EXISTS id;

-- Add the new UUID id column
ALTER TABLE employees ADD COLUMN id UUID PRIMARY KEY DEFAULT gen_random_uuid();
