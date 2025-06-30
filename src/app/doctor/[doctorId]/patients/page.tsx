import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { appointmentsTable, patientsTable } from "@/db/schema";

import { SearchInput } from "./_components/search-input";

interface DoctorPatientsProps {
  params: Promise<{ doctorId: string }>;
  searchParams: Promise<{ search?: string }>;
}

// Componente para o skeleton de loading
function PatientsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="max-w-[300px]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Componente para a lista de pacientes
async function PatientsList({
  doctorId,
  search,
}: {
  doctorId: string;
  search?: string;
}) {
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  // Construir condições de busca
  const searchConditions = [];
  searchConditions.push(eq(appointmentsTable.doctorId, doctorId));

  if (search && search.trim()) {
    const searchTerm = `%${search.trim()}%`;
    searchConditions.push(
      or(
        ilike(patientsTable.name, searchTerm),
        ilike(patientsTable.email, searchTerm),
      ),
    );
  }

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
    .where(and(...searchConditions))
    .groupBy(
      patientsTable.id,
      patientsTable.name,
      patientsTable.email,
      patientsTable.phoneNumber,
      patientsTable.sex,
      patientsTable.createdAt,
    )
    .orderBy(desc(patientsTable.createdAt));

  if (patientsWithAppointments.length === 0) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6">
          <div className="py-8 text-center">
            <p className="text-muted-foreground">
              {search
                ? `Nenhum paciente encontrado com o termo "${search}"`
                : "Você ainda não tem pacientes"}
            </p>
            {search && (
              <Button asChild variant="outline" className="mt-4 bg-transparent">
                <Link href={`/doctor/${doctorId}/patients`}>
                  Ver todos os pacientes
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {patientsWithAppointments.map((patient) => {
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
                <span className="text-muted-foreground text-sm">Telefone:</span>
                <span className="text-sm font-medium">
                  {formatPhoneNumber(patient.phoneNumber)}
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
      })}
    </>
  );
}

export default async function DoctorPatients({
  params,
  searchParams,
}: DoctorPatientsProps) {
  const { doctorId } = await params;
  const { search } = await searchParams;

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
          <SearchInput
            doctorId={doctorId}
            placeholder="Buscar pacientes por nome ou email..."
          />

          {/* Mostrar termo de busca atual */}
          {search && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                Buscando por: <strong>&quot;{search}&quot;</strong>
              </span>
              <Button asChild variant="outline" size="sm">
                <Link href={`/doctor/${doctorId}/patients`}>Limpar busca</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de pacientes com Suspense para loading */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<PatientsListSkeleton />}>
          <PatientsList doctorId={doctorId} search={search} />
        </Suspense>
      </div>
    </div>
  );
}
