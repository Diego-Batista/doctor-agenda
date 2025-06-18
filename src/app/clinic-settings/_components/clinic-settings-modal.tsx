"use client";

import { EditIcon } from "lucide-react";
import { useState } from "react";

import ClinicSettingsForm from "@/components/clinic-settings-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { clinicsTable } from "@/db/schema";

interface ClinicSettingsModalProps {
  clinic: typeof clinicsTable.$inferSelect;
}

export default function ClinicSettingsModal({
  clinic,
}: ClinicSettingsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost2" className="has-[>svg]:px-2">
          <EditIcon className="text-muted-foreground" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <div className="mt-4">
          <ClinicSettingsForm clinic={clinic} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
