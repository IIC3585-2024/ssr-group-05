import { getGenres, getPlatforms } from "@/app/series/actions";
import SerieForm from "@/components/series/SerieForm";
import { createSerie } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Series() {
  const { genres, error } = await getGenres();
  const { platforms, error: errorPlatforms } = await getPlatforms();
  const supabase = createClient();
  const { data, error: errorAuth } = await supabase.auth.getUser();

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
