"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable, appointmentStatusEnum } from "@/db/schema";

const updateAppointmentStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(appointmentStatusEnum.enumValues),
});

export async function updateAppointmentStatus(
  data: z.infer<typeof updateAppointmentStatusSchema>,
) {
  try {
    // Validar dados
    const validatedData = updateAppointmentStatusSchema.parse(data);

    // Atualizar no banco de dados
    await db
      .update(appointmentsTable)
      .set({ status: validatedData.status })
      .where(eq(appointmentsTable.id, validatedData.id));

    revalidatePath("/appointments");

    return { success: true, message: "Status atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar status:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Dados inválidos",
        errors: error.errors,
      };
    }

    return { success: false, message: "Erro interno do servidor" };
  }
}
