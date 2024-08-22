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
import { Title } from "@/components/ui/title";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { IApiResponse, IService } from "@/interfaces/rent-system-api";
import { getFetcher, patchFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface IServiceCreateRequest {
  price: number;
  name: string;
}

export default function ServiceId() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const form = useForm();
  const { toast } = useToast();
  const { data, error, isLoading } = useSWR<IApiResponse<IService>>(
    rentSystemPaths.services.details(serviceId),
    () => getFetcher(rentSystemPaths.services.details(serviceId))
  );

  const onSubmit = async () => {
    try {
      const values = form.getValues();
      const obj: IServiceCreateRequest = {
        name: values.name || "",
        price: values.price || 0,
      };

      const newData = await patchFetcher(
        rentSystemPaths.services.edit(serviceId),
        obj
      );
      toast({
        title: "Cambio guardado!",
        description: "El cambio del servicio fue exitosa.",
      });
    } catch (error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description:
          "Hubo un problema al tratar de modificar el servicio. Intento luego o consulte a un administrador.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <Title
        title={`${data?.value.name}`}
        backgroundImage={rentSystemImages.service}
      />
      {isLoading ? (
        "Cargando.. "
      ) : error ? (
        error.message
      ) : (
        <>
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
                          placeholder="Ej: Agua"
                          defaultValue={data?.value.name}
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
                      <FormLabel>Precio (?)</FormLabel>
                      <FormControl>
                        <Input
                          required
                          min={0}

                          type="number"
                          defaultValue={data?.value.price}
                          placeholder="Ej: 199.9"
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="my-2" type="submit">
                  Guardar cambios
                </Button>
              </form>
            </Form>
          </div>
          <Toaster />
        </>
      )}
    </main>
  );
}
