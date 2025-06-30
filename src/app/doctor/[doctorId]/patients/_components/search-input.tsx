"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  doctorId: string;
  placeholder?: string;
}

export function SearchInput({
  doctorId,
  placeholder = "Buscar pacientes...",
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  // Debounce function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }

      const newUrl = `/doctor/${doctorId}/patients${params.toString() ? `?${params.toString()}` : ""}`;

      startTransition(() => {
        router.push(newUrl);
      });
    }, 300); // 300ms de delay

    return () => clearTimeout(timeoutId);
  }, [searchValue, doctorId, router, searchParams]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="relative">
      <Search
        className={`absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform transition-colors ${
          isPending ? "animate-pulse text-blue-500" : "text-muted-foreground"
        }`}
      />

      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="pr-10 pl-10"
      />

      {searchValue && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hover:bg-muted absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {isPending && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
