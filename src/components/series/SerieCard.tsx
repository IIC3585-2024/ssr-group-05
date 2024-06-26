"use client";

import Image from "next/image";
import Link from "next/link";

export default function SerieCard({
  id,
  title,
  description,
  genres,
  stars,
  starsCount,
  imageUrl = "/placeholder.jpeg",
}: {
  id: string;
  title: string;
  description: string;
  genres: any[];
  stars: string;
  starsCount: number;
  imageUrl: string | null;
}) {
  return (
    <Link href="/series/[id]" as={`/series/${id}`}>
      <div className="flex flex-col justify-between gap-2 p-2 bg-white shadow-md rounded-lg h-full transform duration-300 hover:scale-105 hover:bg-gray-200">
        <div className="flex flex-col gap-2 self-center">
          <Image
            src={imageUrl ? imageUrl : "/placeholder.jpeg"}
            alt="Placeholder"
            width={200}
            height={300}
            className="rounded-lg"
          />
          <h2 className="text-xl font-bold text-center">{title}</h2>
        </div>
        <p className="text-sm self-center">{description.slice(0, 50)}...</p>
        <div className="flex gap-1 flex-wrap">
          {genres.map((genre) => (
            <div key={genre.id} className="bg-gray-300 rounded-lg p-0.5">
              <p className="text-sm">{genre.genre.genre}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end w-full">
          <p className="text-sm">
            <Image
              src="/tomatoe.svg"
              alt="tomatoe"
              width={30}
              height={30}
              className="inline-block self-center items-center hover:animate-spin"
            />{" "}
            {stars} ({starsCount})
          </p>
        </div>
      </div>
    </Link>
  );
}
