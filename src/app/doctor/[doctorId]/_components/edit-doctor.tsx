"use client";

import { useState } from "react";

import UpsertDoctorForm from "@/app/(protected)/doctors/_components/upsert-doctor-form";
import { getAvailability } from "@/app/(protected)/doctors/_helpers/availability";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable } from "@/db/schema";

type Props = {
  doctor: typeof doctorsTable.$inferSelect;
};

const EditDoctor = (props: Props) => {
  const [isUpsertDoctorDialogOpen, setIsUpsertDoctorDialogOpen] =
    useState(false);

  const availability = getAvailability(props.doctor);
  return (
    <div>
      <Dialog
        open={isUpsertDoctorDialogOpen}
        onOpenChange={setIsUpsertDoctorDialogOpen}
      >
        <DialogTrigger asChild>
          <Button className="mt-1 h-6 cursor-pointer text-start">
            Ver detalhes
          </Button>
        </DialogTrigger>
        <UpsertDoctorForm
          doctor={{
            ...props.doctor,
            availableFromTime: availability.from.format("HH:mm:ss"),
            availableToTime: availability.to.format("HH:mm:ss"),
          }}
          onSuccess={() => setIsUpsertDoctorDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default EditDoctor;
