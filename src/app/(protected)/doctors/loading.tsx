import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  PageActions,
  PageContainer,
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
          <PageTitle>Médicos</PageTitle>
          <PageDescription>Gerencie os médicos da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Médico
          </Button>
        </PageActions>
      </PageHeader>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex flex-col items-center space-y-3">
                {/* Avatar Skeleton */}
                <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200"></div>

                {/* Name Skeleton */}
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>

                {/* Specialty Skeleton */}
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Contact Info Skeletons */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>

                {/* Price Skeleton */}
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="h-8 flex-1 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
