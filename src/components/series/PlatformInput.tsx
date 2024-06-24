"use client"
import { useState } from "react";
import GenreTag from "./GenreTag";

export default function PlatformInput({ platforms, onPlatformsChange }: { platforms: any[] | null, onPlatformsChange: any}) {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedPlatformsId, setSelectedPlatformsId] = useState<any[]>([]);
    const [newPlatform, setNewPlatform] = useState<string>("");
    const [newPlatformId, setNewPlatformId] = useState<string>("");
    const [newPlatformUrl, setNewPlatformUrl] = useState<string>("");

    function addPlatform(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (newPlatform && !selectedPlatforms.includes(newPlatform) && newPlatformUrl) {
            const updatedPlatforms = [...selectedPlatforms, newPlatform];
            setSelectedPlatforms(updatedPlatforms);
            setNewPlatform("");
        }
        if (newPlatformId && !selectedPlatformsId.includes(newPlatformId) && newPlatformUrl) {
            const updatedPlatformsId = [...selectedPlatformsId, {id: newPlatformId, url: newPlatformUrl}];
            setSelectedPlatformsId(updatedPlatformsId);
            onPlatformsChange(updatedPlatformsId);
            setNewPlatformId("");
            setNewPlatformUrl("");
        }
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setNewPlatform(event.target.value);
        setNewPlatformId(platforms?.find((platform) => platform.platform === event.target.value)?.id ?? "");
    }

    function handleNewPlatformUrl(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPlatformUrl(event.target.value);
    }

    return (
        <>
            <div className="flex flex-row space-x-4">
                <div className="space-y-2">
                <select
                    value={newPlatform}
                    onChange={handleSelectChange}
                    className="w-full text-gray-400 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    <option value="">Selecciona una plataforma</option>
                    {platforms?.map((platform) => (
                        <option key={platform.id} value={platform.platform} className="text-gray-600">
                            {platform.platform}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="platformUrl"
                    id="platformUrl"
                    placeholder="Url de la plataforma"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                    onChange={handleNewPlatformUrl}
                    value={newPlatformUrl}
                />
                </div>
                <button
                    onClick={addPlatform}
                    className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 disabled:opacity-50"
                    disabled={!newPlatform || !newPlatformUrl}
                >
                    Add platform
                </button>
            </div>
            <div className="flex flex-row flex-wrap space-x-2 items-center">
                {selectedPlatforms.map((platform) => (
                    <GenreTag key={platform} genre={platform} />
                ))}
            </div>
        </>
    );
}
