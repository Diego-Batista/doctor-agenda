import { Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentDoctor } from "@/lib/auth-doctor";

export default async function DoctorHomePage() {
  const doctor = await getCurrentDoctor();

  if (!doctor) {
    redirect("/doctor/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Stethoscope className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Bem-vindo, Dr. {doctor.name}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-muted-foreground text-center">
            <p>Especialidade: {doctor.specialty}</p>
          </div>

          <Button asChild className="w-full" size="lg">
            <Link href={`/doctor/${doctor.id}`}>
              <User className="mr-2 h-4 w-4" />
              Acessar Minha Área
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
