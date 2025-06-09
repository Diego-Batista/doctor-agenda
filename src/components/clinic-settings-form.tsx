"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateClinic } from "@/actions/update-clinic";
import { UploadButton } from "@/app/(protected)/doctors/_components/UploadButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { clinicsTable } from "@/db/schema";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome da clínica é obrigatório.",
  }),
  address: z.string().trim().optional(),
  phoneNumber: z.string().trim().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

interface ClinicSettingsFormProps {
  clinic: typeof clinicsTable.$inferSelect;
}

export default function ClinicSettingsForm({
  clinic,
}: ClinicSettingsFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: clinic.name,
      address: clinic.address,
      phoneNumber: clinic.phoneNumber,
      email: clinic.email,
      website: clinic.website ?? "",
      imageUrl: clinic.imageUrl ?? "",
    },
  });

  const updateClinicAction = useAction(updateClinic, {
    onSuccess: () => {
      toast.success("Clínica atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar clínica.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateClinicAction.execute({
      id: clinic.id,
      ...values,
    });
    if (updateClinicAction.status === "hasSucceeded") {
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Configurações da Clínica
        </CardTitle>
        <CardDescription>
          Atualize as informações da sua clínica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto da clínica</FormLabel>
                  <FormControl>
                    <div>
                      <UploadButton
                        label="Selecionar Foto"
                        accept="image/*"
                        onUploadComplete={(url) =>
                          form.setValue("imageUrl", url)
                        }
                      />
                      <input type="hidden" {...form.register("imageUrl")} />

                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Foto da clínica"
                          width={128}
                          height={128}
                          className="mt-2 h-32 w-32 rounded object-cover"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Nome da Clínica *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Clínica São José" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Rua das Flores, 123 - Centro"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contato@clinica.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.clinica.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" disabled={updateClinicAction.isPending}>
                {updateClinicAction.isPending
                  ? "Salvando..."
                  : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
