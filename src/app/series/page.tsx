import SerieList from "@/components/SerieList";
import SerieListSkelleton from "@/components/SkeletonList";
import SearchInput from "@/components/SearchInput";
import StarDropdown from "@/components/StarDropdown";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({searchParams}
: {
  searchParams?: {
    search?: string,
    stars?: string,
  };
}) {
  const search = searchParams?.search || '';
  const stars = Number(searchParams?.stars) || -1

  return (
    <div className="flex flex-col w-full min-h-screen full p-4 space-y-4 bg-gray-100">
      <div className="flex flex-row justify-between px-6 py-5 bg-white rounded-lg mx-4">
        <div className="flex flex-row space-x-10">
          <StarDropdown />
          <SearchInput />
        </div>
        <Link href="/series/new">
          <button className="p-2 text-white bg-blue-500 rounded">Agregar serie</button>
        </Link>
      </div>
      <Suspense key={search + stars} fallback={<SerieListSkelleton />}>
        <SerieList search={search} stars={stars}/>
      </Suspense>
    </div>
  );
}
