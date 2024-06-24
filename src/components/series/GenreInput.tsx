"use client"
import { useState } from "react";
import GenreTag from "./GenreTag";

export default function GenreInput({ genres, onGenresChange }: { genres: any[] | null, onGenresChange: any}) {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedGenresId, setSelectedGenresId] = useState<string[]>([]);
    const [newGenre, setNewGenre] = useState<string>("");
    const [newGenreId, setNewGenreId] = useState<string>("");

    function addGenre(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (newGenre && !selectedGenres.includes(newGenre)) {
            const updatedGenres = [...selectedGenres, newGenre];
            setSelectedGenres(updatedGenres);
            setNewGenre("");
        }
        if (newGenreId && !selectedGenresId.includes(newGenreId)) {
            const updatedGenresId = [...selectedGenresId, newGenreId];
            setSelectedGenresId(updatedGenresId);
            onGenresChange(updatedGenresId);
            setNewGenreId("");
        }
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setNewGenre(event.target.value);
        setNewGenreId(genres?.find((genre) => genre.genre === event.target.value)?.id ?? "");
    }

    return (
        <>
            <div className="flex flex-row space-x-4">
                <select
                    value={newGenre}
                    onChange={handleSelectChange}
                    className="w-full text-gray-400 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    <option value="">Selecciona un género</option>
                    {genres?.map((genre) => (
                        <option key={genre.id} value={genre.genre} className="text-gray-600">
                            {genre.genre}
                        </option>
                    ))}
                </select>
                <button
                    onClick={addGenre}
                    className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 disabled:opacity-50"
                    disabled={!newGenre && !newGenreId}
                >
                    Add genre
                </button>
            </div>
            <div className="flex flex-row flex-wrap space-x-2 items-center">
                {selectedGenres.map((genre) => (
                    <GenreTag key={genre} genre={genre} />
                ))}
            </div>
        </>
    );
}
