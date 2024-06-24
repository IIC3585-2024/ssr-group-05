export default function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 animate-pulse">
      <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md">
        <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
        <div className="flex flex-col space-y-4">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-12 bg-gray-400 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
