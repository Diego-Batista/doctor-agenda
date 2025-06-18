import { redirect } from "next/navigation";

import { getCurrentDoctor } from "@/lib/auth-doctor";

import { DoctorWelcomeCard } from "./_components/doctor-welcome-card";

export default async function DoctorHomePage() {
  const doctor = await getCurrentDoctor();

  if (!doctor) {
    redirect("/doctor/login");
  }

  return <DoctorWelcomeCard doctor={doctor} />;
}
