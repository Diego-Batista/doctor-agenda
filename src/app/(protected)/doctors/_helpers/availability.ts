import "dayjs/locale/pt-br";

import dayjs from "dayjs";
dayjs.locale("pt-br");

import { doctorsTable } from "@/db/schema";

const weekDays = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

export const getAvailability = (doctor: typeof doctorsTable.$inferSelect) => {
  const from = dayjs()
    .hour(Number(doctor.availableFromTime.split(":")[0]))
    .minute(Number(doctor.availableFromTime.split(":")[1]))
    .second(Number(doctor.availableFromTime.split(":")[2] || 0));

  const to = dayjs()
    .hour(Number(doctor.availableToTime.split(":")[0]))
    .minute(Number(doctor.availableToTime.split(":")[1]))
    .second(Number(doctor.availableToTime.split(":")[2] || 0));

  return {
    from,
    to,
    fromWeekDay: weekDays[Number(doctor.availableFromWeekDay)],
    toWeekDay: weekDays[Number(doctor.availableToWeekDay)],
  };
};
