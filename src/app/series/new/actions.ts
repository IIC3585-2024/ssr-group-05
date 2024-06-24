'use server';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createSerie(formData: FormData) {
    const supabase = createClient();

    const imgFile = formData.get("imageUrl");
    const title = formData.get("title");
    const description = formData.get("description");
    const genres = JSON.parse(formData.get("genres") as string);
    const platforms = JSON.parse(formData.get("platforms") as string);
    const seasons = JSON.parse(formData.get("seasons") as string);

    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const storageUrl = baseUrl + (process.env.NEXT_PUBLIC_SUPABASE_STORAGE ?? '');

    let imgUrl = null;

    if (imgFile instanceof File && imgFile.size > 0) {
      const file = imgFile as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      imgUrl = title + Date.now().toString() + ".png";

      const { data, error } = await supabase.storage
        .from("images")
        .upload(imgUrl, buffer, {
          contentType: "image/png",
        });

      imgUrl = storageUrl + imgUrl;

      if (error) {
        imgUrl = null;
      }
    }

    const serie = await supabase.from("series").insert([
      {
        title: title,
        description: description,
        imageUrl: imgUrl,
      },
    ]).select();

    const seasonDataArray = [] as any[];

    if(serie.data) {
      seasons.map((season: number, index: number) => {
        seasonDataArray.push({
          seriesId: serie.data[0].id,
          seasonNumber: index + 1,
          episodeCount: season,
        });
      });

      const {error} = await supabase.from("seasons").insert(seasonDataArray);

      const genreDataArray = genres.map((genre: string) => ({
        seriesId: serie.data[0].id,
        genreId: genre,
      }));

      await supabase.from("series_genres").insert(genreDataArray);

      const platformDataArray = platforms.map((platform: any) => ({
        seriesId: serie.data[0].id,
        platformId: platform.id,
        platformUrl: platform.url,
      }));

        await supabase.from("series_platforms").insert(platformDataArray);
    }
    
    redirect("/series");
}