'use server';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createSerie(formData: FormData) {
    const supabase = createClient();

    const imgFile = formData.get("imageUrl");
    const title = formData.get("title");

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

    await supabase.from("series").insert([
      {
        title: formData.get("title"),
        // streamingService: formData.get("streamingService"),
        // seasons: Number(formData.get("seasons")),
        // episodesPerSeason: Number(formData.get("episodesPerSeason")),
        description: formData.get("description"),
        // category: formData.get("category"),
        imageUrl: imgUrl,
      },
    ]);
    
    redirect("/series");
  }