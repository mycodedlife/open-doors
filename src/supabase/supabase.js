import { createClient } from '@supabase/supabase-js'

  export const supabase = createClient  ('https://fhkngjofxoqvsxcxttaa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoa25nam9meG9xdnN4Y3h0dGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3Mjc0MzQsImV4cCI6MjAwNDMwMzQzNH0.8kp10rFvmw077_Nv9Ht9vepH5pYsLBAW7VWB12yl8MQ')