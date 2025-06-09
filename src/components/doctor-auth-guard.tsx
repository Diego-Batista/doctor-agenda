"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

interface DoctorAuthGuardProps {
  children: React.ReactNode;
  doctorId: string;
}

export default function DoctorAuthGuard({
  children,
  doctorId,
}: DoctorAuthGuardProps) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const response = await fetch(`/api/verify-doctor-access/${doctorId}`);
        const data = await response.json();

        if (data.authorized) {
          setIsAuthorized(true);
        } else {
          router.push(`/doctor/login?redirect=/doctor/${doctorId}`);
        }
      } catch (error) {
        router.push(`/doctor/login?redirect=/doctor/${doctorId}`);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, [doctorId, router]);

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
