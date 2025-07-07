import { and, count, desc, eq, gte, sum } from "drizzle-orm";
import {
  CalendarDays,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

import { AppointmentStatusCell } from "@/app/(protected)/appointments/_components/appointment-status-cell";
import { StatusType } from "@/app/(protected)/appointments/_components/status-badge";
import AppointmentsTableActions from "@/app/(protected)/appointments/_components/table-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

interface DoctorDashboardProps {
  params: Promise<{ doctorId: string }>;
}

export default async function DoctorDashboard({
  params,
}: DoctorDashboardProps) {
  const { doctorId } = await params;

  // Buscar estatísticas do médico
  const [
    doctor,
    totalPatients,
    totalAppointments,
    monthlyRevenue,
    recentAppointments,
  ] = await Promise.all([
    db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, doctorId),
    }),
    db
      .select({ count: count() })
      .from(patientsTable)
      .innerJoin(
        appointmentsTable,
        eq(patientsTable.id, appointmentsTable.patientId),
      )
      .where(eq(appointmentsTable.doctorId, doctorId)),
    db
      .select({ count: count() })
      .from(appointmentsTable)
      .where(eq(appointmentsTable.doctorId, doctorId)),
    db
      .select({
        total: sum(appointmentsTable.appointmentPriceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.doctorId, doctorId),
          gte(
            appointmentsTable.date,
            new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          ),
        ),
      ),
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.doctorId, doctorId),
      with: {
        patient: true,
      },
      orderBy: [desc(appointmentsTable.date)],
      limit: 5,
    }),
  ]);

  if (!doctor) {
    return <div>Médico não encontrado</div>;
  }

  return (
    <div className="space-y-8">
      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-[#5B7189]">
            <CardTitle className="text-sm font-medium text-[#5B7189]">
              Total de Pacientes
            </CardTitle>
            <Users className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPatients[0]?.count || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Pacientes únicos atendidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#5B7189]">
              Total de Consultas
            </CardTitle>
            <CalendarDays className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAppointments[0]?.count || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Consultas realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#5B7189]">
              Receita Mensal
            </CardTitle>
            <DollarSign className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrencyInCents(Number(monthlyRevenue[0]?.total || 0))}
            </div>
            <p className="text-muted-foreground text-xs">
              Receita do mês atual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#5B7189]">
              Preço por Consulta
            </CardTitle>
            <TrendingUp className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrencyInCents(doctor.appointmentPriceInCents)}
            </div>
            <p className="text-muted-foreground text-xs">Valor por consulta</p>
          </CardContent>
        </Card>
      </div>

      {/* Consultas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#5B7189]">
            <Clock className="text-primary h-5 w-5" />
            Consultas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppointments.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center">
                Nenhuma consulta encontrada
              </p>
            ) : (
              recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{appointment.patient.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(appointment.date).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-end gap-3 md:flex-row">
                    <AppointmentStatusCell
                      appointmentId={appointment.id}
                      status={appointment.status as StatusType}
                    />
                    <div className="flex w-full items-center justify-end">
                      <span className="font-medium">
                        {formatCurrencyInCents(
                          appointment.appointmentPriceInCents,
                        )}
                      </span>
                      <AppointmentsTableActions
                        appointment={{
                          ...appointment,
                          doctor, // Certifique-se de que a variável 'doctor' está disponível no escopo
                        }}
                        patients={[appointment.patient]}
                        doctors={[doctor]}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
