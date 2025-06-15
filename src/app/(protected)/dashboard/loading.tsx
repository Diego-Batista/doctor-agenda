import { Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Tenha uma visão geral da sua clínica.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200"></div>
        </PageActions>
      </PageHeader>
      <PageContent>
        {/* Stats Cards Skeleton */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
              </CardHeader>
              <CardContent>
                <div className="mb-1 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* First Grid Row: Chart + Top Doctors */}
        <div className="mb-6 grid grid-cols-[2.25fr_1fr] gap-4">
          {/* Appointments Chart Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full animate-pulse rounded bg-gray-200"></div>
            </CardContent>
          </Card>

          {/* Top Doctors Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
                      <div>
                        <div className="mb-1 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Grid Row: Today's Appointments + Top Specialties */}
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          {/* Today's Appointments Table Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" />
                <CardTitle className="text-base">
                  Agendamentos de hoje
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Table Header Skeleton */}
                <div className="grid grid-cols-4 gap-4 border-b pb-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-18 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-14 animate-pulse rounded bg-gray-200"></div>
                </div>

                {/* Table Rows Skeleton */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 py-2">
                    <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Specialties Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-28 animate-pulse rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                    </div>
                    <div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageContainer>
  );
}
