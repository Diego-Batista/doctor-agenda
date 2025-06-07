"use client";

import { DataTable } from "@/components/ui/data-table"; // ajuste conforme seu projeto
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import { getAppointmentsTableColumns } from "./table-columns";

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

type AppointmentsTableProps = {
  appointments: AppointmentWithRelations[];
  doctors: (typeof doctorsTable.$inferSelect)[];
  patients: (typeof patientsTable.$inferSelect)[];
};

const AppointmentsTable = ({
  appointments,
  doctors,
  patients,
}: AppointmentsTableProps) => {
  const columns = getAppointmentsTableColumns({ doctors, patients });

  return <DataTable data={appointments} columns={columns} />;
};

export default AppointmentsTable;
