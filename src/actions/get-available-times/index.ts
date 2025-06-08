"use server";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable, doctorsTable } from "@/db/schema";
import { generateTimeSlots } from "@/helpers/time";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getAvailableTimes = actionClient
  .schema(
    z.object({
      doctorId: z.string(),
      date: z.string().date(), // YYYY-MM-DD,
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Unauthorized");
    }
    if (!session.user.clinic) {
      throw new Error("Clínica não encontrada");
    }

    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.doctorId),
    });
    if (!doctor) {
      throw new Error("Médico não encontrado");
    }

    // Ajusta domingo (0) para 7 para bater com o banco
    const selectedDayOfWeekRaw = dayjs(parsedInput.date).day(); // 0 a 6
    const selectedDayOfWeek =
      selectedDayOfWeekRaw === 0 ? 7 : selectedDayOfWeekRaw;

    // Trata intervalo circular na semana
    const fromDay = doctor.availableFromWeekDay;
    const toDay = doctor.availableToWeekDay;
    let doctorIsAvailable = false;

    if (fromDay <= toDay) {
      // intervalo normal, ex: 1 a 5
      doctorIsAvailable =
        selectedDayOfWeek >= fromDay && selectedDayOfWeek <= toDay;
    } else {
      // intervalo circular, ex: 5 a 1 (quinta a segunda)
      doctorIsAvailable =
        selectedDayOfWeek >= fromDay || selectedDayOfWeek <= toDay;
    }

    if (!doctorIsAvailable) {
      return [];
    }

    const appointments = await db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.doctorId, parsedInput.doctorId),
    });

    const appointmentsOnSelectedDate = appointments
      .filter((appointment) =>
        dayjs(appointment.date).isSame(parsedInput.date, "day"),
      )
      .map((appointment) => dayjs(appointment.date).format("HH:mm:ss"));

    const timeSlots = generateTimeSlots();

    const doctorAvailableFrom = dayjs()
      .utc()
      .set("hour", Number(doctor.availableFromTime.split(":")[0]))
      .set("minute", Number(doctor.availableFromTime.split(":")[1]))
      .set("second", 0)
      .local();

    const doctorAvailableTo = dayjs()
      .utc()
      .set("hour", Number(doctor.availableToTime.split(":")[0]))
      .set("minute", Number(doctor.availableToTime.split(":")[1]))
      .set("second", 0)
      .local();

    const doctorTimeSlots = timeSlots.filter((time) => {
      const date = dayjs()
        .utc()
        .set("hour", Number(time.split(":")[0]))
        .set("minute", Number(time.split(":")[1]))
        .set("second", 0);

      return (
        date.format("HH:mm:ss") >= doctorAvailableFrom.format("HH:mm:ss") &&
        date.format("HH:mm:ss") <= doctorAvailableTo.format("HH:mm:ss")
      );
    });

    const isToday = dayjs(parsedInput.date).isSame(dayjs(), "day");

    return doctorTimeSlots.map((time) => {
      const timeDate = dayjs(`${parsedInput.date}T${time}`);
      const isAtLeast30MinLater = timeDate.isAfter(dayjs().add(30, "minute"));
      const isInFuture = !isToday || isAtLeast30MinLater;

      return {
        value: time,
        available: isInFuture && !appointmentsOnSelectedDate.includes(time),
        label: time.substring(0, 5),
      };
    });
  });
