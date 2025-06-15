import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto space-y-4 p-4">
      <Skeleton className="h-10 w-[150px]" />
      <Skeleton className="h-4 w-full max-w-[500px]" />

      <Skeleton className="h-[100px] w-full rounded-lg" />

      <div className="flex gap-4">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  );
}
