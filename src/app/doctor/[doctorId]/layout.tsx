import { eq } from "drizzle-orm";
import { ArrowLeft, BarChart3, Users } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type React from "react";

import { logoutDoctor } from "@/actions/doctor/logout-doctor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { verifyDoctorAccess } from "@/lib/auth-doctor";

interface DoctorLayoutProps {
  children: React.ReactNode;
  params: Promise<{ doctorId: string }>;
}

export default async function DoctorLayout({
  children,
  params,
}: DoctorLayoutProps) {
  const { doctorId } = await params;

  // Verificar se o médico tem acesso a esta página
  const verification = await verifyDoctorAccess(doctorId);

  if (!verification.authorized) {
    if (verification.reason === "not_authenticated") {
      redirect(
        "/doctor/login?redirect=" + encodeURIComponent(`/doctor/${doctorId}`),
      );
    } else {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Acesso Negado
            </h1>
            <p className="text-muted-foreground mb-4">
              Você não tem permissão para acessar esta página.
            </p>
            <Button asChild>
              <Link href="/doctor/login">Fazer Login</Link>
            </Button>
          </div>
        </div>
      );
    }
  }

  const doctor = await db.query.doctorsTable.findFirst({
    where: eq(doctorsTable.id, doctorId),
  });

  if (!doctor) {
    notFound();
  }

  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/doctors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {doctor.avatarImageUrl ? (
                    <AvatarImage
                      src={doctor.avatarImageUrl || "/placeholder.svg"}
                      alt={doctor.name}
                    />
                  ) : (
                    <AvatarFallback>{doctorInitials}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold">Dr. {doctor.name}</h1>
                  <p className="text-muted-foreground text-sm">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <form action={logoutDoctor}>
                <Button variant="outline" size="sm" type="submit">
                  Sair
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex space-x-8">
          <Link
            href={`/doctor/${doctorId}`}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white hover:shadow-sm"
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href={`/doctor/${doctorId}/patients`}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white hover:shadow-sm"
          >
            <Users className="h-4 w-4" />
            Pacientes
          </Link>
        </nav>

        {children}
      </div>
    </div>
  );
}
