import Image from "next/image";
import Link from "next/link";

export default function SerieCard({
  id,
  title,
  streamingService,
  seasons,
  episodesPerSeason,
  description,
  category,
  stars,
  starsCount,
  imageUrl = "/placeholder.jpeg",
}: {
  id: string;
  title: string;
  streamingService: string;
  seasons: number;
  episodesPerSeason: number;
  description: string;
  category: string;
  stars: string;
  starsCount: number;
  imageUrl: string;
}) {
  return (
    <Link href="/series/[id]" as={`/series/${id}`}>
      <div className="flex flex-col items-center justify-between gap-2 p-2 bg-white shadow-md rounded-lg">
        <Image
          src={imageUrl}
          alt="Placeholder"
          width={200}
          height={300}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-between gap-2">
          <h2 className="text-xl font-bold text-center">{title}</h2>
          <p className="text-sm">{streamingService}</p>
          <p className="text-sm">Temporadas: {seasons}</p>
          <p className="text-sm">
            Episodios por temporada: {episodesPerSeason}
          </p>
          <p className="text-sm">{description.slice(0, 50)}...</p>
          <div className="flex justify-between">
            <p className="text-sm">{category}</p>
            <p className="text-sm">⭐️ {stars} ({starsCount})</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
