export default function SeasonItem({ season }: { season: any }) {

  return (
    <>
      <tr key={season.id}>
        <td className="px-4 py-3 whitespace-nowrap">{season.seasonNumber}</td>
        <td className="px-4 py-3 whitespace-nowrap">{season.episodeCount}</td>
      </tr>
    </>
  );
}
