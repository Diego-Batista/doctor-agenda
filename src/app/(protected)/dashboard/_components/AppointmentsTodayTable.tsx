"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import { getAppointmentsTableColumns } from "../../appointments/_components/table-columns";

type Doctor = typeof doctorsTable.$inferSelect;
type Patient = typeof patientsTable.$inferSelect;

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient?: Patient;
  doctor: Doctor;
};

export default function AppointmentsTodayTable({
  appointments,
  doctors,
  patients,
}: {
  appointments: AppointmentWithRelations[];
  doctors: Doctor[];
  patients: Patient[];
}) {
  const columns = getAppointmentsTableColumns({
    doctors,
    patients,
  }) as ColumnDef<AppointmentWithRelations, unknown>[];

  return <DataTable columns={columns} data={appointments} />;
}
