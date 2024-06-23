import SeasonItem from "./SeasonItem";

export default function SeasonTable({seasons}:{seasons: any[]}) {
    const filteredSeasons = seasons.sort((a, b) => a.seasonNumber - b.seasonNumber);

    return (
        <table className="w-10 divide-y divide-gray-200 mt-6">
            <thead className="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Temporada
                    </th>
                    <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Episodios
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredSeasons.map((season) => (
                    <SeasonItem key={season.id} season={season} />
                ))}
            </tbody>
        </table>
    )
}