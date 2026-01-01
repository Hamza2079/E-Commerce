import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Product Card Skeleton */}
              <div className="bg-card border rounded-lg overflow-hidden">
                {/* Image */}
                <Skeleton className="aspect-square w-full" />

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Badges */}
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>

                  {/* Title */}
                  <Skeleton className="h-6 w-full" />

                  {/* Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Rating */}
                  <Skeleton className="h-4 w-24" />

                  {/* Stock */}
                  <Skeleton className="h-4 w-20" />

                  {/* Price & Button */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
