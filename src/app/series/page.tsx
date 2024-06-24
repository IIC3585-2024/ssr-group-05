import SerieList from "@/components/series/SerieList";
import SearchInput from "@/components/series/filters/SearchInput";
import StarDropdown from "@/components/series/filters/StarDropdown";
import CategoryDropdown from "@/components/series/filters/CategoryDropdown";
import PlatformDropdown from "@/components/series/filters/PlatformDropdown";
import Link from "next/link";
import { Suspense } from "react";
import { getGenres, getPlatforms } from "@/app/series/actions";
import { createClient } from "@/utils/supabase/server";
import SerieListSkelleton from "@/app/series/loading";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    stars?: string;
    category?: string;
    platform?: string;
  };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const search = searchParams?.search || "";
  const stars = Number(searchParams?.stars) || -1;
  const category = searchParams?.category || "";
  const platform = searchParams?.platform || "";

  const { genres, error } = await getGenres();
  const { platforms, error: errorPlatforms } = await getPlatforms();

  return (
    <div className="flex flex-col w-full min-h-screen full p-4 space-y-4 bg-gray-100">
      <div className="px-6 py-5 bg-white rounded-lg mx-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data?.user && (
            <Link href="/series/new" className="flex flex-col sm:flex-row">
              <button className="p-2 text-white bg-blue-500 rounded text-nowrap">
                Agregar serie
              </button>
            </Link>
          )}
          <StarDropdown />
          <SearchInput />
          <CategoryDropdown genres={genres} />
          <PlatformDropdown platforms={platforms} />
        </div>
      </div>
      <Suspense
        key={search + stars + category + platform}
        fallback={<SerieListSkelleton />}
      >
        <SerieList
          search={search}
          stars={stars}
          category={category}
          platform={platform}
        />
      </Suspense>
    </div>
  );
}
