"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const getClinic = actionClient.action(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Buscar relação usuário -> clínica
  const userToClinic = await db.query.usersToClinicsTable.findFirst({
    where: eq(usersToClinicsTable.userId, userId),
  });

  if (!userToClinic) {
    throw new Error("User not linked to any clinic");
  }

  // Buscar dados da clínica
  const clinic = await db.query.clinicsTable.findFirst({
    where: eq(clinicsTable.id, userToClinic.clinicId),
    columns: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      phoneNumber: true,
      website: true,
      imageUrl: true,
      address: true,
    },
  });

  if (!clinic) {
    throw new Error("Clinic not found");
  }

  return { clinic };
});
