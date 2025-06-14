import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import { AppointmentStatusCell } from "./appointment-status-cell";
import { StatusType } from "./status-badge";
import AppointmentsTableActions from "./table-actions";

export type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

export function getAppointmentsTableColumns({
  doctors,
  patients,
}: {
  doctors: AppointmentWithRelations["doctor"][];
  patients: AppointmentWithRelations["patient"][];
}): ColumnDef<AppointmentWithRelations>[] {
  return [
    {
      id: "patient",
      accessorKey: "patient.name",
      header: "Paciente",
    },
    {
      id: "doctor",
      accessorKey: "doctor.name",
      header: "Médico",
      cell: (params) => {
        const appointment = params.row.original;
        return appointment.doctor.name;
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Data e Hora",
      cell: (params) => {
        const appointment = params.row.original;
        return format(new Date(appointment.date), "dd/MM/yyyy 'às' HH:mm", {
          locale: ptBR,
        });
      },
    },
    {
      id: "specialty",
      accessorKey: "doctor.specialty",
      header: "Especialidade",
    },
    {
      id: "price",
      accessorKey: "appointmentPriceInCents",
      header: "Valor",
      cell: (params) => {
        const appointment = params.row.original;
        const price = appointment.appointmentPriceInCents / 100;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price);
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: (params) => {
        const appointment = params.row.original;
        return (
          <AppointmentStatusCell
            appointmentId={appointment.id}
            status={appointment.status as StatusType}
          />
        );
      },
    },
    {
      id: "actions",
      cell: (params) => {
        const appointment = params.row.original;
        return (
          <AppointmentsTableActions
            appointment={appointment}
            patients={patients}
            doctors={doctors}
          />
        );
      },
    },
  ];
}
