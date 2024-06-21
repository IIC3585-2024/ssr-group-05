import SerieCard from "@/components/SerieCard";
import Link from "next/link";
import { getSeries } from "./actions";

export default async function Page() {
  const { data: series, error } = await getSeries();

  return (
    <div className="flex flex-col w-full min-h-screen full p-4 space-y-4 bg-gray-100">
      <Link href="/series/new">
        <button className="p-2 text-white bg-blue-500 rounded">Agregar serie</button>
      </Link>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
        {series?.map((serie) => (
          <SerieCard
            id={serie.id}
            key={serie.id}
            title={serie.title}
            streamingService={serie.streamingService}
            seasons={serie.seasons}
            episodesPerSeason={serie.episodesPerSeason}
            description={serie.description}
            category={serie.category}
            stars={(serie.reviews.reduce((acc : number, review : any) => acc + review.stars, 0) / serie.reviews.length).toFixed(2)}
            starsCount={serie.reviews.length}
            imageUrl={serie.imageUrl || undefined}
            
          />
        ))}
      </div>
    </div>
  );
}
