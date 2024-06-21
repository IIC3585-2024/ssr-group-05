"use server";
import { createClient } from "@/utils/supabase/server";

export async function getSeries() {
  const supabase = createClient();

  const { data, error } = await supabase
  .from('series')
  .select(`
    *,
    reviews (
      stars
    )
  `);
  return { data, error };
}
