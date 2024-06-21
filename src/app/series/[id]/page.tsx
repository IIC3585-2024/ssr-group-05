import { getSerieById, createReview } from "./actions";
import Image from "next/image";
import NewReview from "@/components/NewReview";
import ReviewCard from "@/components/ReviewCard";

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
      <div className="flex justify-between items-center">
        <Image
          src={serie.imageUrl || "/placeholder.jpeg"}
          alt="Placeholder"
          width={200}
          height={300}
          className="rounded-lg"
        />
        <p className="mb-4">{serie.description}</p>
      </div>
      <p className="mb-2">
        <strong>Servicios de streaming</strong> {serie.streamingService}
      </p>
      <p className="mb-2">
        <strong>Temporadas:</strong> {serie.seasons}
      </p>
      <p className="mb-2">
        <strong>Episodios por temporada:</strong> {serie.episodesPerSeason}
      </p>
      <p className="mb-4">
        <strong>Categoría:</strong> {serie.category}
      </p>
      <p>
        ⭐️ {averageRating} ({serie.reviews.length})
      </p>

      <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
      <div>
        <NewReview serieId={serie.id} createReview={createReview} />
      </div>
      {serie.reviews.map((review: any) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          title={review.title}
          content={review.content}
          stars={review.stars}
        />
      ))}
    </div>
  );
}
