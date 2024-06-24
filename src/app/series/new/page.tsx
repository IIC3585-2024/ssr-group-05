import { getGenres, getPlatforms } from "@/app/series/actions";
import SerieForm from "@/components/SerieForm";
import { createSerie } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Series() {
  const { data: genres, error } = await getGenres();
  const { data: platforms, error: errorPlatforms } = await getPlatforms();
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (!data?.user)  {
    redirect("/auth/login");
  }

  return (
    <>
      <SerieForm
        genres={genres}
        platforms={platforms}
        createSerie={createSerie}
      />
    </>
  );
}
