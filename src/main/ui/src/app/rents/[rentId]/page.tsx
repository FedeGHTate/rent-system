'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/ui/title";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { IApiResponse, IRent, IRentUpdateRequest } from "@/interfaces/rent-system-api";
import { getFetcher, patchFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export default function RentId() {


  const { rentId } = useParams<{ rentId: string }>();
  const { toast } = useToast();

  const form = useForm();

  const { data, error, isLoading } = useSWR<IApiResponse<IRent>>(
    rentSystemPaths.rents.details(rentId),
    () => getFetcher(rentSystemPaths.rents.details(rentId))
  );

  
  const onSubmit = async () => {

    try{

      const values = form.getValues();
      const obj: IRentUpdateRequest= {
        name: values.name || "",
        maximumOccupancy: values.maximumOccupancy || 0,
        price: values.price || 0,
        description: values.description || ""
      }

      console.log(obj)

      const newData = await patchFetcher(rentSystemPaths.rents.edit(rentId),obj);
      toast({
        title: "Cambio guardado!",
        description: "El cambio de la renta fue exitosa.",
      })
    } catch(error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description: "Hubo un problema al tratar de modificar el alquiler. Intento luego o consulte a un administrador."
      })
    }
  }

  return (
    <main className="min-h-screen">
      {isLoading ? (
        "Cargando.. "
      ) : error ? (
        error.message
      ) : (
        <>
          <Title
            title={`${data?.value.name}`}
            backgroundImage={rentSystemImages.rent}
          />
 <div className="my-4 flex flex-col items-center">
          <Form {...form}>
            <form className="flex flex-col gap-4 justify-center" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Casita azul"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                  <Textarea
                    placeholder="Ejemplo: 2 cuartos + baño"
                    className="resize-none"
                    defaultValue={data?.value.description}
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
                      defaultValue={data?.value.maximumOccupancy}
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
                  <FormLabel>Precio (?)</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      defaultValue={data?.value.price}
                      placeholder="Ej: 199.9"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button className="my-2" type="submit">Guardar cambios</Button>
            </form>
          </Form>
          </div>
          <Toaster />
        </>
      )}
    </main>
  );
}
