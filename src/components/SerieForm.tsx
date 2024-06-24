"use client"

import { useState } from "react";
import GenreInput from "@/components/GenreInput";
import PlatformInput from "@/components/PlatformInput";
import SeasonInput from "@/components/SeasonInput";

export default function Series({ genres, platforms, createSerie } : { genres: any, platforms:any, createSerie: any }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<number[]>([]);

  function handleGenresChange(genres: string[]) {
    setSelectedGenres(genres);
  }

  function handlePlatformsChange(platforms: string[]) {
    setSelectedPlatforms(platforms);
  }

  function handleSeasonsChange(seasons: number[]) {
    setSeasons(seasons);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("genres", JSON.stringify(selectedGenres));
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    formData.append("seasons", JSON.stringify(seasons));

    await createSerie(formData);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Agregar Serie</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Título"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Descripción"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          ></textarea>
          <SeasonInput onSeasonsChange={handleSeasonsChange}/>
          <GenreInput genres={genres} onGenresChange={handleGenresChange} />
          <PlatformInput platforms={platforms} onPlatformsChange={handlePlatformsChange} />
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Agregar serie
          </button>
        </div>
      </form>
    </div>
  );
}
