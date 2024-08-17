"use client";


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { IApiResponse, ITenant, ITenantRequest } from "@/interfaces/rent-system-api";
import { getFetcher, patchFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export default function TenantId() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const { toast } = useToast();

  const form = useForm();

  const { data, error, isLoading } = useSWR<IApiResponse<ITenant>>(
    rentSystemPaths.tenants.details(tenantId),
    () => getFetcher(rentSystemPaths.tenants.details(tenantId))
  );

  
  const onSubmit = async () => {

    try{

      const values = form.getValues();
      const obj: ITenantRequest= {
        firstname: values.firstname || "",
        lastname:values.lastname || "",
        dni: values.dni || "",
        contactNumber: values.contactNumber || ""
      }

      const newData = await patchFetcher(rentSystemPaths.tenants.edit(tenantId),obj);
      toast({
        title: "Cambio guardado!",
        description: "El cambio del inquilino fue exitoso.",
      })
    } catch(error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description: "Hubo un problema al tratar de modificar el inquilino. Intento luego o consulte a un administrador."
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
            title={`${data?.value.firstname} ${data?.value.lastname}`}
            backgroundImage={rentSystemImages.tenant}
          />
 <div className="my-4 flex flex-col items-center">
          <Form {...form}>
            <form className="flex flex-col gap-4 justify-center" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Miguel"
                        defaultValue={data?.value.firstname}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={data?.value.lastname}
                        placeholder="Ej: Washington.."
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                            <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dni</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={data?.value.dni}
                        placeholder="Ej: 1111111"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                            <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de contacto</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={data?.value.contactNumber}
                        placeholder="Ej: 11999999"
                        onChange={(e) => field.onChange(e.target.value)}

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