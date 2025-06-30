"use client";

import { motion } from "framer-motion";
import { Stethoscope, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Doctor = {
  id: string;
  name: string;
  specialty?: string | null;
  avatarImageUrl?: string | null;
};

interface DoctorWelcomeCardProps {
  doctor: Doctor;
}

export function DoctorWelcomeCard({ doctor }: DoctorWelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {doctor.avatarImageUrl ? (
            <Image
              src={doctor.avatarImageUrl}
              alt={doctor.name}
              width={64}
              height={64}
              className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          )}
          <CardTitle className="text-2xl font-bold">
            Bem-vindo, Dr. {doctor.name}!
          </CardTitle>
          <div className="text-muted-foreground text-center">
            <p>Especialidade: {doctor.specialty || "Não informada"}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href={`/doctor/${doctor.id}`}>
              <User className="mr-2 h-4 w-4" />
              Acessar Minha Área
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
