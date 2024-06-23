"use server";
import { createClient } from "@/utils/supabase/server";
import { PostgrestBuilder, PostgrestFilterBuilder, PostgrestQueryBuilder } from "@supabase/postgrest-js";

export async function getSeries({ search, stars, category, platform }: { search: string, stars: number, category: string, platform: string}) {
  const client = createClient();
  let querySelect = "*"
  querySelect = getSelectQuery({stars, category, platform});

  let query = client.from('series').select(querySelect) as PostgrestFilterBuilder<any, any, any, any, any>;
  
  if (search !== '') {
    query = query.ilike('title', `%${search}%`);
  }
  if (stars !== -1) {
    query = query.gte('reviews.stars', stars);
  }
  if (category !== '') {
    query = query.eq('series_genres.genre.genre', category);
  }
  if (platform !== '') {
    query = query.eq('series_platforms.platforms.platform', platform);
  }

  const { data: series, error } = await query.order('title', { ascending: true });

  return { data: series, error };
}


function getSelectQuery({ stars, category, platform }: { stars: number, category: string, platform: string}) : string{
  let query = '*'
  if (stars !== -1){
    query += ',reviews!inner(stars)'
  }
  else {
    query += ',reviews(stars)'
  }
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

  return { data: genres, error };
}

export async function getPlatforms(){
  const client = createClient();
  const { data: platforms, error } = await client.from('platforms').select('*');

  return { data: platforms, error };
}
