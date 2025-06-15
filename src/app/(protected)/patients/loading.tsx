import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Paciente
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <Card>
          <CardContent className="p-0">
            {/* DataTable Toolbar Skeleton */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                  <Input
                    placeholder="Buscar pacientes..."
                    className="w-64 pl-8"
                    disabled
                  />
                </div>
                <div className="h-9 w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-9 w-16 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Table Header Skeleton */}
            <div className="bg-muted/50 border-b">
              <div className="grid grid-cols-6 gap-4 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-18 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Table Rows Skeleton */}
            <div className="divide-y">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="hover:bg-muted/50 grid grid-cols-6 items-center gap-4 px-4 py-3"
                >
                  {/* Checkbox + Name */}
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>

                  {/* Phone */}
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>

                  {/* Gender */}
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>

                  {/* Created Date */}
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="border-t px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                    <div className="flex gap-1">
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
