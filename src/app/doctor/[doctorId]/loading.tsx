import {
  CalendarDays,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Estatísticas - Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Pacientes
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Consultas
            </CardTitle>
            <CalendarDays className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Preço por Consulta
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>
      </div>

      {/* Consultas Recentes - Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Consultas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Skeleton para 5 consultas */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="mb-2 h-5 w-32 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
