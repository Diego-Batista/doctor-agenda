"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateAppointmentStatus } from "@/actions/update-appointment-status/update-appointment-status";

import type { StatusType } from "./status-badge";
import { StatusSelector } from "./status-selector";

interface AppointmentStatusCellProps {
  appointmentId: string;
  status: StatusType;
}

export function AppointmentStatusCell({
  appointmentId,
  status,
}: AppointmentStatusCellProps) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState<StatusType>(status);

  const handleStatusChange = (newStatus: StatusType) => {
    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus({
          id: appointmentId,
          status: newStatus,
        });

        if (result.success) {
          setCurrentStatus(newStatus);
          toast.success(result.message);
        } else {
          toast.error(result.message || "Erro ao atualizar status");
        }
      } catch (error) {
        toast.error("Erro ao atualizar status");
        console.error("Erro:", error);
      }
    });
  };

  return (
    <StatusSelector
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isPending}
    />
  );
}
