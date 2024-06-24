function SerieCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between gap-2 p-2 bg-white shadow-md rounded-lg h-full animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="w-48 h-52 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-6 bg-gray-200 rounded"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-28 h-4 bg-gray-200 rounded"></div>
        <div className="w-40 h-4 bg-gray-200 rounded"></div>
        <div className="w-48 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="flex justify-between w-full">
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
      {[...Array(12)].map((_, index) => (
        <SerieCardSkeleton key={index} />
      ))}
    </div>
  );
}
