"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const getAppointments = actionClient.action(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const clinicId = session?.user?.clinic?.id;
  if (!clinicId) {
    throw new Error("Unauthorized or clinic not found");
  }

  const [patients, doctors, appointments] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, clinicId),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, clinicId),
    }),
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, clinicId),
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return { patients, doctors, appointments };
});
