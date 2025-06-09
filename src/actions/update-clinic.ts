"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { clinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

const updateClinicSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1, {
    message: "Nome da clínica é obrigatório.",
  }),
  address: z.string().trim().optional(),
  phoneNumber: z.string().trim().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export const updateClinic = actionClient
  .schema(updateClinicSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic || session.user.clinic.id !== parsedInput.id) {
      throw new Error("Unauthorized to update this clinic");
    }

    // Preparar dados da clínica, removendo campos vazios
    const { id, ...updateData } = parsedInput;
    const clinicData = {
      name: updateData.name,
      address: updateData.address,
      phoneNumber: updateData.phoneNumber,
      email: updateData.email,
      website: updateData.website || null,
      imageUrl: updateData.imageUrl || null,
    };

    await db
      .update(clinicsTable)
      .set(clinicData)
      .where(eq(clinicsTable.id, id));

    revalidatePath("/clinic-settings");
    revalidatePath("/doctors");
  });
