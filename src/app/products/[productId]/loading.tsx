import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Skeleton */}
      <nav className="border-b bg-muted/30" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-5 w-64" />
        </div>
      </nav>

      {/* Product Details Skeleton */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            </div>

            {/* Right Column - Info Skeleton */}
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
              </div>

              {/* Rating */}
              <Skeleton className="h-5 w-32" />

              {/* Price */}
              <Skeleton className="h-10 w-24" />

              {/* Description */}
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Stock */}
              <Skeleton className="h-12 w-full rounded-lg" />

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 flex-1 rounded-lg" />
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
