import { getSerieById, createReview } from "./actions";
import Image from "next/image";
import NewReview from "@/components/reviews/NewReview";
import ReviewCard from "@/components/reviews/ReviewCard";
import SeasonTable from "@/components/series/seasons/SeasonTable";
import PlatformList from "@/components/series/platforms/PlatformList";
import GenreTag from "@/components/series/GenreTag";
import { createClient } from "@/utils/supabase/server";

export default async function SerieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await getSerieById(params.id);
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (error) return <div className="text-red-500">Error loading serie</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;
  const serie = data[0];
  const imgUrl = serie.imageUrl ? serie.imageUrl : "/placeholder.jpeg";
  const reviewslength = serie?.reviews?.length;

  const averageRating = (
    serie.reviews.reduce((acc: number, review: any) => acc + review.stars, 0) /
    reviewslength
  ).toFixed(2);

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">{serie.title}</h1>
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="flex flex-col sm:mr-6">
          <Image
            src={imgUrl}
            alt="Placeholder"
            width={200}
            height={300}
            className="rounded-lg"
          />
          <SeasonTable seasons={serie.seasons} />
        </div>
        <div className="flex flex-col">
          <p className="mb-4">{serie.description}</p>
          <p className="my-4">
            <strong>Categoría</strong> {serie.category}
          </p>
          <div className="flex flex-wrap mb-4">
            {serie.series_genres.map((genre: any) => (
              <GenreTag key={genre.genre.id} genre={genre} />
            ))}
          </div>
          <p className="my-4">
            <strong>Plataformas</strong>
          </p>
          <PlatformList platforms={serie.series_platforms} />
        </div>
      </div>

      <h2 className="text-3xl font-bold my-4">
        Reseñas{" "}
        <Image
          src="/tomatoe.svg"
          alt="tomatoe"
          width={30}
          height={30}
          className="inline-block self-center items-center hover:animate-spin"
        />{" "}
        {averageRating} ({reviewslength})
      </h2>
      {userData?.user && (
        <div>
          <NewReview serieId={serie.id} createReview={createReview} />
        </div>
      )}
      {serie.reviews.length !== 0 ? (
        serie.reviews.map((review: any) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            title={review.title}
            content={review.content}
            stars={review.stars}
          />
        ))
      ) : (
        <div className="text-gray-500 mt-8 ml-3">No hay reseñas</div>
      )}
    </div>
  );
}
