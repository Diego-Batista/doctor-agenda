"use client";

import { useState } from "react";

import UpsertPatientForm from "@/components/upsert-patient-form";

type PacientProps = {
  name: string;
  phoneNumber: string;
  email: string;
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  clinicId: string;
  sex: "male" | "female";
};

interface Props {
  patient: PacientProps;
}

const PacientForm = ({ patient }: Props) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);
  return (
    <UpsertPatientForm
      patient={patient}
      onSuccess={() => setIsUpsertPatientDialogOpen(false)}
      isOpen={isUpsertPatientDialogOpen}
    />
  );
};

export default PacientForm;
