import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-muted-foreground animate-pulse">
        Loading categories...
      </p>
    </div>
  );
}
