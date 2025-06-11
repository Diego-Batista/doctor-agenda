import { count, desc, eq } from "drizzle-orm";
import { Eye, Search } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { appointmentsTable, patientsTable } from "@/db/schema";

interface DoctorPatientsProps {
  params: Promise<{ doctorId: string }>;
  searchParams: Promise<{ search?: string }>;
}

export default async function DoctorPatients({
  params,
  searchParams,
}: DoctorPatientsProps) {
  const { doctorId } = await params;
  const { search } = await searchParams;

  // Buscar pacientes do médico com contagem de consultas
  const patientsWithAppointments = await db
    .select({
      id: patientsTable.id,
      name: patientsTable.name,
      email: patientsTable.email,
      phoneNumber: patientsTable.phoneNumber,
      sex: patientsTable.sex,
      createdAt: patientsTable.createdAt,
      appointmentCount: count(appointmentsTable.id),
    })
    .from(patientsTable)
    .leftJoin(
      appointmentsTable,
      eq(patientsTable.id, appointmentsTable.patientId),
    )
    .where(eq(appointmentsTable.doctorId, doctorId))
    .groupBy(
      patientsTable.id,
      patientsTable.name,
      patientsTable.email,
      patientsTable.phoneNumber,
      patientsTable.sex,
      patientsTable.createdAt,
    )
    .orderBy(desc(patientsTable.createdAt));

  // Filtrar por busca se fornecida
  const filteredPatients = search
    ? patientsWithAppointments.filter(
        (patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.email.toLowerCase().includes(search.toLowerCase()),
      )
    : patientsWithAppointments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Meus Pacientes</h2>
          <p className="text-muted-foreground">
            Gerencie seus pacientes e visualize seu histórico
          </p>
        </div>
      </div>

      {/* Barra de busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Buscar pacientes por nome ou email..."
              className="pl-10"
              defaultValue={search}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de pacientes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredPatients.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  {search
                    ? "Nenhum paciente encontrado com esse termo de busca"
                    : "Você ainda não tem pacientes"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredPatients.map((patient) => {
            const patientInitials = patient.name
              .split(" ")
              .map((name) => name[0])
              .join("");

            return (
              <Card
                key={patient.id}
                className="max-w-[300px] transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">
                        {patientInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="truncate text-lg">
                        {patient.name}
                      </CardTitle>
                      <p className="text-muted-foreground truncate text-sm">
                        {patient.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Telefone:
                    </span>
                    <span className="text-sm font-medium">
                      {patient.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Sexo:</span>
                    <Badge variant="outline">
                      {patient.sex === "male" ? "Masculino" : "Feminino"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Consultas:
                    </span>
                    <Badge variant="secondary">
                      {patient.appointmentCount} consulta
                      {patient.appointmentCount !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <div className="pt-2">
                    <Button asChild className="w-full" size="sm">
                      <Link href={`/doctor/${doctorId}/patients/${patient.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
