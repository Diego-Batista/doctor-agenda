"use client";

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { StatusBadge, type StatusType } from "./status-badge";

const statusOptions: { value: StatusType; label: string }[] = [
  { value: "confirmado", label: "Confirmado" },
  { value: "aguardando", label: "Aguardando" },
  { value: "finalizado", label: "Finalizado" },
  { value: "faltou", label: "Faltou" },
];

interface StatusSelectorProps {
  value: StatusType;
  onChange: (value: StatusType) => void;
  disabled?: boolean;
}

export function StatusSelector({
  value,
  onChange,
  disabled = false,
}: StatusSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="status"
          role="combobox"
          aria-expanded={open}
          className="min-w-[140px] items-start justify-between border-none px-0"
          disabled={disabled}
        >
          <StatusBadge className="w-full" status={value} />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
            <CommandGroup>
              {statusOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value as StatusType);
                    setOpen(false);
                  }}
                  className={cn(
                    "hover:bg-transparent",
                    value === option.value ? "bg-accent" : "bg-transparent",
                  )}
                >
                  {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  /> */}
                  <StatusBadge status={option.value} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
