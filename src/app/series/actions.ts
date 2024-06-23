"use server";
import { createClient } from "@/utils/supabase/server";

export async function getSeries({ search, stars }: { search: string, stars: number }) {
  const client = createClient();
  let query

  if (stars !== -1){
    query = client.from('series')
      .select(`
        *,
        reviews!inner(
          stars
        ),
        series_genres(*, genre(*))
      `)
      .gte('reviews.stars', stars);
  } else {
    query = client.from('series')
    .select(`
      *,
      reviews(
        stars
      ),
      series_genres(*, genre(*))
    `);
  }
  
  if (search !== '') {
    query = query.ilike('title', `%${search}%`);
  }

  const { data: series, error } = await query.order('title', { ascending: true });

  return { data: series, error };
}
