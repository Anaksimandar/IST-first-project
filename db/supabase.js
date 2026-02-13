import { createClient } from '@supabase/supabase-js';
console.log(process.env.SUPABASE_KEY, process.env.SUPABASE_URL);

const connection = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


export default connection;