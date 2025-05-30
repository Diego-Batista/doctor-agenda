import { and, count, eq, gte, lte, sum } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { DatePicker } from "./components/date-picker";
import StatsCards from "./components/stats-cards";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const PatientsPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  function isValidDateString(dateStr: string | undefined): boolean {
    return !!dateStr && !isNaN(new Date(dateStr).getTime());
  }

  const { from, to } = await searchParams;

  const defaultFrom = new Date();
  defaultFrom.setDate(defaultFrom.getDate() - 30);

  const defaultTo = new Date();

  const fromDate = isValidDateString(from) ? new Date(from) : defaultFrom;
  const toDate = isValidDateString(to) ? new Date(to) : defaultTo;

  const [totalRevenue, totalAppointments, totalPatients, totalDoctors] =
    await Promise.all([
      db
        .select({
          total: sum(appointmentsTable.appointmentPriceInCents),
        })
        .from(appointmentsTable)
        .where(
          and(
            eq(appointmentsTable.clinicId, session.user.clinic.id),
            gte(appointmentsTable.date, new Date(fromDate)),
            lte(appointmentsTable.date, new Date(toDate)),
          ),
        ),
      db
        .select({
          total: count(),
        })
        .from(appointmentsTable)
        .where(
          and(
            eq(appointmentsTable.clinicId, session.user.clinic.id),
            gte(appointmentsTable.date, new Date(fromDate)),
            lte(appointmentsTable.date, new Date(toDate)),
          ),
        ),
      db
        .select({
          total: count(),
        })
        .from(patientsTable)
        .where(eq(patientsTable.clinicId, session.user.clinic.id)),
      db
        .select({
          total: count(),
        })
        .from(doctorsTable)
        .where(eq(doctorsTable.clinicId, session.user.clinic.id)),
    ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Tenha uma visão geral dos pacientes e suas consultas
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCards
          totalRevenue={
            totalRevenue[0].total ? Number(totalRevenue[0].total) : 0
          }
          totalAppointments={totalAppointments[0].total ?? 0}
          totalPatients={totalPatients[0].total ?? 0}
          totalDoctors={totalDoctors[0].total ?? 0}
        />
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
