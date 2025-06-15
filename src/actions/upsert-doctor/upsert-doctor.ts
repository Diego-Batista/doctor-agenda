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

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const {
      id,
      avatarImageUrl,
      phoneNumber,
      password,
      availableFromTime,
      availableToTime,
      ...rest
    } = parsedInput;

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

    if (!session?.user?.clinic?.id) {
      throw new Error("Unauthorized or clinic not found");
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const commonData = {
      ...rest,
      availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
      availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      ...(avatarImageUrl ? { avatarImageUrl } : {}),
      phoneNumber,
    };

    await db
      .insert(doctorsTable)
      .values({
        id,
        clinicId: session.user.clinic.id,
        ...commonData,
        password: hashedPassword ?? "", // avoid undefined
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...commonData,
          ...(hashedPassword ? { password: hashedPassword } : {}),
        },
      });

    revalidatePath("/doctors");
  });
