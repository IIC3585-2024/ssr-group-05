"use client"
import { useState } from "react";
import GenreTag from "./GenreTag";

export default function SeasonInput({ onSeasonsChange }: { onSeasonsChange: any }) {
    const [seasons, setSeasons] = useState<number[]>([]);

    function handleSeasonsChange(event: React.ChangeEvent<HTMLInputElement>) {
        let newSeasons = []
        for (let i = 0; i < parseInt(event.target.value); i++) {
            newSeasons.push(1);
        }
        setSeasons(newSeasons);
    }

    function handleEpisodesChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        const updatedSeasons = [...seasons];
        updatedSeasons[index] = parseInt(event.target.value);
        setSeasons(updatedSeasons);
        onSeasonsChange(updatedSeasons);
    }

    return (
        <>
            <input
                type="number"
                min={1}
                name="numberOfSeasons"
                id="numberOfSeasons"
                placeholder="Temporadas"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                onChange={handleSeasonsChange}
            />

            <p className="text-gray-400">Episodios por temporada</p>
            <div className="flex flex-row flex-wrap">
            {seasons.map((season, index) => (
                    <input
                        type="number"
                        min={1}
                        name="episodes"
                        id="episodes"
                        key={index}
                        placeholder={`Temporada ${index + 1}`}
                        className="w-1/3 mx-2 my-1 h-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        onChange={(event) => handleEpisodesChange(index, event)}
                    />
            ))}
            </div>
        </>
    );
}