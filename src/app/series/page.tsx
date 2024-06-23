import SerieList from "@/components/SerieList";
import SerieListSkelleton from "@/components/SkeletonList";
import SearchInput from "@/components/SearchInput";
import StarDropdown from "@/components/StarDropdown";
import CategoryDropdown from "@/components/CategoryDropdown";
import PlatformDropdown from "@/components/PlatformDropdown";
import Link from "next/link";
import { Suspense } from "react";
import { getGenres, getPlatforms } from "@/app/series/actions";

export default async function Page({searchParams}
: {
  searchParams?: {
    search?: string,
    stars?: string,
    category?: string,
    platform?: string,
  };
}) {
  const search = searchParams?.search || '';
  const stars = Number(searchParams?.stars) || -1
  const category = searchParams?.category || '';
  const platform = searchParams?.platform || '';

  const {data: genres, error} = await getGenres();
  const {data: platforms, error: errorPlatforms} = await getPlatforms();

  return (
    <div className="flex flex-col w-full min-h-screen full p-4 space-y-4 bg-gray-100">
      <div className="flex flex-row justify-between px-6 py-5 bg-white rounded-lg mx-4">
        <div className="flex flex-row space-x-10">
          <StarDropdown />
          <SearchInput />
          <CategoryDropdown genres={genres} />
          <PlatformDropdown platforms={platforms} />
        </div>
        <Link href="/series/new">
          <button className="p-2 text-white bg-blue-500 rounded">Agregar serie</button>
        </Link>
      </div>
      <Suspense key={search + stars + category + platform} fallback={<SerieListSkelleton />}>
        <SerieList search={search} stars={stars} category={category} platform={platform}/>
      </Suspense>
    </div>
  );
}
