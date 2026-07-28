function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200"></div>

      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>

        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>

        <div className="h-4 bg-gray-200 rounded w-2/3 mb-5"></div>

        <div className="flex gap-3">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>

          <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;