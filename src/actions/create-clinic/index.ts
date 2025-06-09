"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createClinic = async (
  name: string,
  address: string,
  phoneNumber: string,
  email: string,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Criar clínica apenas com nome (outros campos são opcionais)
  const [clinic] = await db
    .insert(clinicsTable)
    .values({
      name,
      address,
      phoneNumber,
      email,
      website: null,
      imageUrl: null,
    })
    .returning();

  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });

  redirect("/dashboard");
};
