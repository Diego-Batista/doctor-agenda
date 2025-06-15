import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ClinicSettingsForm from "@/components/clinic-settings-form";
import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { clinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import ClinicSettingsModal from "./_components/clinic-settings-modal";

export default async function ClinicSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  const clinic = await db.query.clinicsTable.findFirst({
    where: eq(clinicsTable.id, session.user.clinic.id),
  });

  if (!clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Configurações da Clínica</PageTitle>
          <PageDescription>
            Gerencie as informações da sua clínica
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>

      <div className="flex justify-center">
        <ClinicSettingsForm clinic={clinic} />
      </div>
      <PageActions>
        <ClinicSettingsModal clinic={clinic} />
      </PageActions>
    </PageContainer>
  );
}
