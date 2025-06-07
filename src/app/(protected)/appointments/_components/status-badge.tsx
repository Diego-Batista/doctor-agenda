import type { appointmentStatusEnum } from "@/db/schema";
import { cn } from "@/lib/utils";

// Usando o tipo do enum do schema
type StatusType = (typeof appointmentStatusEnum.enumValues)[number];

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; className: string; dotColor: string }
> = {
  confirmado: {
    label: "Confirmado",
    className: "bg-green-50 text-green-700 border-green-200",
    dotColor: "bg-green-500",
  },
  aguardando: {
    label: "Aguardando",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    dotColor: "bg-yellow-500",
  },
  finalizado: {
    label: "Finalizado",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
  },
  faltou: {
    label: "Faltou",
    className: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.dotColor)} />
      {config.label}
    </div>
  );
}

export type { StatusType };
