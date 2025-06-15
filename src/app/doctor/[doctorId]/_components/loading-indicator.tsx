"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function LoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    // const handleStop = () => setIsLoading(false);

    // Create a new URL object to track navigation changes
    const url = pathname + searchParams.toString();

    // Store the current URL
    let currentUrl = url;

    // Check if navigation has occurred
    const checkNavigation = () => {
      const newUrl = window.location.pathname + window.location.search;
      if (newUrl !== currentUrl) {
        handleStart();
        currentUrl = newUrl;
      }
    };

    // Set up interval to check for navigation
    const interval = setInterval(checkNavigation, 100);

    // Clean up interval
    return () => clearInterval(interval);
  }, [pathname, searchParams]);

  return (
    <div
      className={cn(
        "bg-primary/80 fixed top-0 right-0 left-0 z-50 h-1 transition-all duration-300",
        isLoading ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="bg-primary text-primary-foreground absolute right-0 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    </div>
  );
}
