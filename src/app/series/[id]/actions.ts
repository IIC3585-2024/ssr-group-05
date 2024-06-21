'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSerieById(id: string) {
  const supabase = createClient();
  
    const { data, error } = await supabase.from("series").select("*, reviews(*)").eq("id", id)
    return { data, error };
}

export async function createReview(formData: FormData) {
  const supabase = createClient();

  await supabase.from("reviews").insert({
    serieId: formData.get("serieId"),
    title: formData.get("title"),
    content: formData.get("content"),
    stars: Number(formData.get("stars")),
  });

  revalidatePath(`/series/${formData.get("serieId")}`, "layout");
}