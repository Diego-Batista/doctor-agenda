import { and, count, desc, eq, sum } from "drizzle-orm";
import {
  Activity,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Mail,
  Phone,
  TrendingUp,
  User,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/db";
import { appointmentsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import PacientForm from "./_components/pacientForm";

interface PatientDetailsProps {
  params: Promise<{ doctorId: string; patientId: string }>;
}

export default async function PatientDetails({ params }: PatientDetailsProps) {
  const { doctorId, patientId } = await params;

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, "");
    // Format as (XX) XXXXX-XXXX
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const [patient, appointments, stats] = await Promise.all([
    db.query.patientsTable.findFirst({
      where: eq(patientsTable.id, patientId),
    }),
    db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.patientId, patientId),
        eq(appointmentsTable.doctorId, doctorId),
      ),
      orderBy: [desc(appointmentsTable.date)],
    }),
    db
      .select({
        totalAppointments: count(appointmentsTable.id),
        totalSpent: sum(appointmentsTable.appointmentPriceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.patientId, patientId),
          eq(appointmentsTable.doctorId, doctorId),
        ),
      ),
  ]);

  if (!patient) {
    notFound();
  }

  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const statusColors = {
    confirmado: "bg-green-100 text-green-800",
    aguardando: "bg-yellow-100 text-yellow-800",
    finalizado: "bg-blue-100 text-blue-800",
    faltou: "bg-red-100 text-red-800",
  };

  const statusCounts = appointments.reduce(
    (acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho do paciente */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-2xl">
                  {patientInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                <div className="text-muted-foreground mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">
                      {formatPhoneNumber(patient.phoneNumber)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <Badge variant="outline">
                      {patient.sex === "male" ? "Masculino" : "Feminino"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Paciente
                </Button>
              </DialogTrigger>

              <PacientForm patient={patient} />
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Estatísticas do paciente */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Consultas
            </CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats[0]?.totalAppointments || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Consultas realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrencyInCents(Number(stats[0]?.totalSpent || 0))}
            </div>
            <p className="text-muted-foreground text-xs">
              Valor total investido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Finalizadas
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statusCounts.finalizado || 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Consultas concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faltas</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.faltou || 0}</div>
            <p className="text-muted-foreground text-xs">Consultas perdidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de consultas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico de Consultas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">
                Nenhuma consulta encontrada para este paciente
              </p>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted flex h-12 w-12 flex-col items-center justify-center rounded-lg">
                      <span className="text-xs font-medium">
                        {new Date(appointment.date).toLocaleDateString(
                          "pt-BR",
                          { day: "2-digit" },
                        )}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {new Date(appointment.date).toLocaleDateString(
                          "pt-BR",
                          { month: "short" },
                        )}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString(
                          "pt-BR",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(appointment.date).toLocaleTimeString(
                          "pt-BR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColors[appointment.status]}>
                      {appointment.status}
                    </Badge>
                    <span className="font-medium">
                      {formatCurrencyInCents(
                        appointment.appointmentPriceInCents,
                      )}
                    </span>
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
