import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://wxqniegssylytzzrapac.supabase.co/';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_1BAZtRxgKgGLGBfuUhF97A_bDWTYsHe';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);