"use server";
import { createClient } from "@/utils/supabase/server";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export async function getSeries({ search, category, platform }: { search: string, category: string, platform: string}) {
  const client = createClient();
  let querySelect = "*"
  querySelect = getSelectQuery({category, platform});

  let query = client.from('series').select(querySelect) as PostgrestFilterBuilder<any, any, any, any, any>;
  
  if (search !== '') {
    query = query.ilike('title', `%${search}%`);
  }
  if (category !== '') {
    query = query.eq('series_genres.genre.genre', category);
  }
  if (platform !== '') {
    query = query.eq('series_platforms.platforms.platform', platform);
  }

  const { data: series, error } = await query.order('title', { ascending: true });

  return { series, error };
}


function getSelectQuery({ category, platform }: { category: string, platform: string}) : string{
  let query = '*,reviews(stars)'
  if (category !== '') {
    query += ',series_genres!inner(*, genre!inner(*))'
  }
  else {
    query += ',series_genres(*, genre(*))'
  }
  if (platform !== '') {
    query += ',series_platforms!inner(*, platforms!inner(*))'
  }

  return query
}

export async function getGenres(){
  const client = createClient();
  const { data: genres, error } = await client.from('genre').select('*');

  return { genres, error };
}

export async function getPlatforms(){
  const client = createClient();
  const { data: platforms, error } = await client.from('platforms').select('*');

  return { platforms, error };
}
