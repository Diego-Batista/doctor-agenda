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

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho do paciente - Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="animate-pulse bg-gray-200">
                  <div className="h-8 w-8 rounded bg-gray-300"></div>
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="mb-2 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" disabled>
              <Edit className="mr-2 h-4 w-4" />
              Editar Paciente
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Estatísticas do paciente - Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Consultas
            </CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-12 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200"></div>
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
            <div className="mb-1 h-8 w-12 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faltas</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-8 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200"></div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de consultas - Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico de Consultas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Skeleton para múltiplas consultas */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 animate-pulse flex-col items-center justify-center rounded-lg bg-gray-200">
                    <div className="mb-1 h-3 w-6 rounded bg-gray-300"></div>
                    <div className="h-2 w-8 rounded bg-gray-300"></div>
                  </div>
                  <div>
                    <div className="mb-2 h-5 w-48 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
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
