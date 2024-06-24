import SerieCard from "./SerieCard";
import { getSeries } from "@/app/series/actions";

export default async function SerieList({search, stars, category, platform}: {search: string, stars: number, category: string, platform: string}) {
  const {series, error} = await getSeries({search, category, platform});
  let filteredSeries = series;
  if (stars !== -1) {
    filteredSeries = series.filter((serie:any) => serie.reviews.reduce((acc : number, review : any) => acc + review.stars, 0) / serie.reviews.length > stars);
  }

  return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
        {filteredSeries?.map((serie:any) => (
          <SerieCard
            id={serie.id}
            key={serie.id}
            title={serie.title}
            description={serie.description}
            genres={serie.series_genres}
            stars={(serie.reviews.reduce((acc : number, review : any) => acc + review.stars, 0) / serie.reviews.length).toFixed(2)}
            starsCount={serie.reviews.length}
            imageUrl={serie.imageUrl}
          />
        ))}
      </div>
  );
}
