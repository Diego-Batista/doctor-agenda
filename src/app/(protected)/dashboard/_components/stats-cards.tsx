import { CalendarDays, DollarSign, Stethoscope, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalRevenue: number;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
}

const StatsCards = ({
  totalRevenue,
  totalAppointments,
  totalPatients,
  totalDoctors,
}: StatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <DollarSign className="text-primary h-4 w-4" />
          </div>
          <CardTitle className="flex-1 text-sm font-medium text-[#5B7189]">
            Faturamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalRevenue / 100)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <CalendarDays className="text-primary h-4 w-4" />
          </div>
          <CardTitle className="flex-1 text-sm font-medium text-[#5B7189]">
            Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAppointments}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Users className="text-primary h-4 w-4" />
          </div>
          <CardTitle className="flex-1 text-sm font-medium text-[#5B7189]">
            Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Stethoscope className="text-primary h-4 w-4" />
          </div>
          <CardTitle className="flex-1 text-sm font-medium text-[#5B7189]">
            Médicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDoctors}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
