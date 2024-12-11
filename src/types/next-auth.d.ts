import 'next-auth';
import { User as SupabaseUser } from '@supabase/supabase-js';

declare module 'next-auth' {
  interface SupabaseUser extends User {
    id: string;
    email: string;
    name?: string;
    image?: string;
  }
}
export {};
}