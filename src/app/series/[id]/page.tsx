import { getSerieById, createReview } from "./actions";
import Image from "next/image";
import NewReview from "@/components/NewReview";
import ReviewCard from "@/components/ReviewCard";
import SeasonTable from "@/components/SeasonTable";
import PlatformList from "@/components/PlatformList";
import GenreTag from "@/components/GenreTag";

export default async function SerieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await getSerieById(params.id);
  if (error) return <div className="text-red-500">Error loading serie</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;
  const serie = data[0];

  const averageRating = (
    serie.reviews.reduce((acc: number, review: any) => acc + review.stars, 0) /
    serie.reviews.length
  ).toFixed(2);

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{serie.title}</h1>
      <div className="flex">
        <div className="flex flex-col mr-6">
          <Image
            src={"/placeholder.jpeg"}
            alt="Placeholder"
            width={200}
            height={300}
            className="rounded-lg"
          />
          <SeasonTable seasons={serie.seasons}/>
        </div>
        <div className="flex flex-col">
          <p className="mb-4">{serie.description}</p>
          <p className="my-4">
            <strong>Categoría</strong> {serie.category}
          </p>
          <div className="flex flex-wrap mb-4">
            {serie.series_genres.map((genre: any) => (
              <GenreTag key={genre.id} genre={genre} />
            ))}
          </div>
          <p className="my-4">
            <strong>Plataformas</strong>
          </p>
          <PlatformList platforms={serie.series_platforms} />
        </div>
      </div>

      <h2 className="text-3xl font-bold my-4">Reseñas</h2>
      <div>
        <NewReview serieId={serie.id} createReview={createReview} />
      </div>
      {serie.reviews.length !== 0 ? serie.reviews.map((review: any) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          title={review.title}
          content={review.content}
          stars={review.stars}
        />
      )) : <div className="text-gray-500 mt-8 ml-3">No hay reseñas</div>}
    </div>
  );
}
