"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/create-clinic/index";
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

import { UploadButton } from "../../doctors/_components/UploadButton";

const clinicFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  address: z.string().trim(),
  phoneNumber: z.string().trim(),
  email: z.string().email().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

const ClinicForm = () => {
  const form = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
    try {
      await createClinic(data.name, data.address, data.phoneNumber, data.email);
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.error(error);
      toast.error("Erro ao criar clínica.");
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Configurações da Clínica
        </CardTitle>
        <CardDescription>Informações da sua clínica</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto do médico</FormLabel>
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Salvando..." : "Criar clínica"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClinicForm;
