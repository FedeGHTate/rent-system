'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { rentSystemPaths } from "@/utils/path";
import { postFetcher } from "@/utils/fetchers";
import { ToastAction } from "@/components/ui/toast";
import { rentSystemImages } from "@/utils/imagesPaths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";

const serviceFormSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  price: z.number().nonnegative({
    message: "El precio debe ser mayor o igual a 0",
  }),
});

export default function ServiceAdd() {
  const form = useForm({ resolver: zodResolver(serviceFormSchema) });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async () => {
    try {
      const res = await postFetcher(
        rentSystemPaths.services.base,
        form.getValues()
      );
      toast({
        title: "Servicio creado!",
        description: "La creación del serivicio fue exitosa.",
        action: (
          <ToastAction
            altText="Ver Servicio"
            onClick={() => router.push(rentSystemPaths.services.base)}
          >
            Ver servicios
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description:
          "Hubo un problema al tratar de crear el servicio. Intento luego o consulte a un administrador.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <Title
        title="Nuevo Servicio"
        backgroundImage={rentSystemImages.service}
      />

      <div className="my-4 flex flex-col items-center">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 justify-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Ej: Luz"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio ($)</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      value={field.value || ""}
                      placeholder="Ej: 299.9"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="my-2" type="submit">
              Agregar Servicio
            </Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </main>
  );
}
