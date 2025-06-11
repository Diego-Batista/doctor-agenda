"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginDoctor = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    try {
      // Buscar médico por email (assumindo que você tem um campo email na tabela doctors)
      const doctor = await db.query.doctorsTable.findFirst({
        where: eq(doctorsTable.email, email),
      });

      if (!doctor) {
        return {
          success: false,
          error: "Email ou senha incorretos",
        };
      }

      // Verificar senha (assumindo que você tem um campo password hasheado)
      const isValidPassword = await bcrypt.compare(password, doctor.password);

      if (!isValidPassword) {
        return {
          success: false,
          error: "Email ou senha incorretos",
        };
      }

      // Criar sessão
      const sessionToken = generateSessionToken();
      const cookieStore = await cookies();

      cookieStore.set("session-token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      cookieStore.set("doctor-id", doctor.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      return {
        success: true,
        doctorId: doctor.id,
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return {
        success: false,
        error: "Erro interno do servidor",
      };
    }
  });

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
