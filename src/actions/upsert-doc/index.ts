"use server";

import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime; // 15:30:00
    const availableToTime = parsedInput.availableToTime; // 16:00:00
    const { id, avatarImageUrl, password, ...rest } = parsedInput;

    const availableFromTimeUTC = dayjs()
      .set("hour", Number.parseInt(availableFromTime.split(":")[0]))
      .set("minute", Number.parseInt(availableFromTime.split(":")[1]))
      .set("second", Number.parseInt(availableFromTime.split(":")[2]))
      .utc();
    const availableToTimeUTC = dayjs()
      .set("hour", Number.parseInt(availableToTime.split(":")[0]))
      .set("minute", Number.parseInt(availableToTime.split(":")[1]))
      .set("second", Number.parseInt(availableToTime.split(":")[2]))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    // Preparar dados para inserção/atualização
    const doctorData = {
      ...rest,
      id,
      clinicId: session.user.clinic.id,
      availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
      availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      ...(avatarImageUrl ? { avatarImageUrl } : {}),
      password,
    };

    // Se há senha, fazer hash
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      doctorData.password = hashedPassword;
    }

    await db
      .insert(doctorsTable)
      .values({
        ...doctorData,
        password: doctorData.password || "", // Ensure password is never undefined
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...rest,
          availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
          availableToTime: availableToTimeUTC.format("HH:mm:ss"),
          ...(avatarImageUrl ? { avatarImageUrl } : {}),
          // Só atualiza senha se foi fornecida
          ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
        },
      });
    revalidatePath("/doctors");
  });
