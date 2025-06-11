import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";

export async function getCurrentDoctor() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;
    const doctorId = cookieStore.get("doctor-id")?.value;

    if (!sessionToken || !doctorId) {
      return null;
    }

    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, doctorId),
    });
    if (!doctor) {
      return null;
    }

    return doctor;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return null;
  }
}

export async function verifyDoctorAccess(requestedDoctorId: string) {
  const currentDoctor = await getCurrentDoctor();

  if (!currentDoctor) {
    return { authorized: false, reason: "not_authenticated" };
  }

  if (currentDoctor.id !== requestedDoctorId) {
    return { authorized: false, reason: "not_authorized" };
  }

  return { authorized: true, doctor: currentDoctor };
}
