"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/ui/title";
import { rentSystemImages } from "@/utils/imagesPaths";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { rentSystemPaths } from "@/utils/path";
import { postFetcher } from "@/utils/fetchers";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { IApiResponse, IRent } from "@/interfaces/rent-system-api";

const rentFormSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  description: z.string(),
  maximumOccupancy: z.number().positive({
    message: "La cantidad debe ser mayor a 0",
  }),
  price: z.number().nonnegative({
    message: "El precio debe ser mayor o igual a 0",
  }),
});

export default function Add() {
  const form = useForm({ resolver: zodResolver(rentFormSchema) });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async () => {
    try {
      const res : IApiResponse<IRent> = await postFetcher(
        rentSystemPaths.rents.base,
        form.getValues()
      );

      toast({
        title: "Alquiler creado!",
        description: "La creación del alquiler fue exitosa.",
        action: (
          <ToastAction
            altText="Ver alquiler"
            onClick={() => router.push(rentSystemPaths.rents.details(res.value.id))}
          >
            Ver alquiler
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description:
          "Hubo un problema al tratar de crear el alquiler. Intento luego o consulte a un administrador.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <Title
        title="Creación de alquiler"
        backgroundImage={rentSystemImages.rent}
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
                      placeholder="Ej: Casa azul"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                  <Textarea
                    required
                    placeholder="Ejemplo: 2 cuartos + baño"
                    className="resize-none"
                    {...field }
                  ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maximumOccupancy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maxima cantidad de personas aceptadas</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      value={field.value || ""}
                      placeholder="Ej: 3"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
              Agregar alquiler
            </Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </main>
  );
}
