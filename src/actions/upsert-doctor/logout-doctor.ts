"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutDoctor() {
  const cookieStore = await cookies();

  cookieStore.delete("session-token");
  cookieStore.delete("doctor-id");

  redirect("/doctor/login");
}
