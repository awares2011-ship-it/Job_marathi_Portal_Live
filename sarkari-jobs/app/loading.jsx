// app/loading.jsx - Global loading skeleton
export default function Loading() {
  return (
    <div className="container-main py-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gray-200 rounded-3xl h-48 mb-8" />

      {/* Cards skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
            <div className="h-16 bg-gray-100 rounded-xl" />
            <div className="h-8 bg-gray-200 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
