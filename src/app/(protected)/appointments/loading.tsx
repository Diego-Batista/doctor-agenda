import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";

export default function Loading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <Card>
          <CardContent className="p-0">
            {/* Table Header Skeleton */}
            <div className="bg-muted/50 border-b px-6 py-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-18 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Table Rows Skeleton */}
            <div className="divide-y">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="grid grid-cols-6 items-center gap-4">
                    {/* Data/Hora */}
                    <div className="space-y-1">
                      <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                    </div>

                    {/* Paciente */}
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    </div>

                    {/* Médico */}
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>

                    {/* Valor */}
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="border-t px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
