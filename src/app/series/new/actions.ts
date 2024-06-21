'use server';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createSerie(formData: FormData) {
    const supabase = createClient();

    await supabase.from("series").insert([
      {
        title: formData.get("title"),
        streamingService: formData.get("streamingService"),
        seasons: Number(formData.get("seasons")),
        episodesPerSeason: Number(formData.get("episodesPerSeason")),
        description: formData.get("description"),
        category: formData.get("category"),
        imageUrl: formData.get("imageUrl"),
      },
    ]);
    
    redirect("/series");
  }