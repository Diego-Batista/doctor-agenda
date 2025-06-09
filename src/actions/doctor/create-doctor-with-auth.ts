"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

const createDoctorSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  specialty: z.string().trim().min(1),
  appointmentPriceInCents: z.number().min(1),
  availableFromWeekDay: z.number().min(0).max(6),
  availableToWeekDay: z.number().min(0).max(6),
  availableFromTime: z.string().min(1),
  availableToTime: z.string().min(1),
});

export const createDoctorWithAuth = actionClient
  .schema(createDoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(parsedInput.password, 12);

    // Criar médico com credenciais
    await db.insert(doctorsTable).values({
      ...parsedInput,
      password: hashedPassword,
      clinicId: session.user.clinic.id,
    });

    revalidatePath("/doctors");
  });
