"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Title } from "@/components/ui/title";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  IApiResponse,
  IRent,
  ITenant,
} from "@/interfaces/rent-system-api";
import { deleteFetcher, getFetcher, postFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface IFormValues {
  tenantId : string
}

export default function Assign() {
  const { rentId } = useParams<{ rentId: string }>();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm();

  const { data, error, isLoading } = useSWR<IApiResponse<IRent>>(
    rentSystemPaths.rents.details(rentId),
    () => getFetcher(rentSystemPaths.rents.details(rentId))
  );

  const { data: tenantsData, isLoading: tenantsIsLoading } = useSWR<
    IApiResponse<Array<ITenant>>
  >(rentSystemPaths.tenants.base, () =>
    getFetcher(rentSystemPaths.tenants.base)
  );

  const onSubmit = async () => {
    try {

      const values = form.getValues() as IFormValues;

      if (values.tenantId != "noone") {
        await postFetcher(
          rentSystemPaths.rents.assignTenant(rentId),
          {
            tenantId : values.tenantId,
            occupancy : 1 
          }
        );
      } else {
        await deleteFetcher(
          rentSystemPaths.rents.assignTenant(rentId)
        );
      }

      toast({
        title: "Cambio guardado!",
        description: "El cambio de la renta fue exitosa.",
        action: (
          <ToastAction
            altText="Ver Alquiler"
            onClick={() => router.push(rentSystemPaths.rents.details(rentId))}
          >
            Ver Alquiler
          </ToastAction>
        ),
      });
    } catch (error) {

      console.log(error)

      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description:
          "Hubo un problema al tratar de modificar el alquiler. Intento luego o consulte a un administrador.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      {isLoading && tenantsIsLoading ? (
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
              <form
                className="flex flex-col gap-4 justify-center"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="tenantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inquilino Actual</FormLabel>
                      <Select
                      required
                        onValueChange={field.onChange}
                        defaultValue={
                          data?.value.actualTenant
                            ? data?.value.actualTenant.id
                            : field.value
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un inquilino" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem className="bg-red-700" value="noone">Ninguno</SelectItem>
                            {tenantsData?.value.map((t) => {
                              return (
                                <SelectItem key={t.id} value={t.id}>
                                  {`${t.lastname} ${t.firstname} - DNI: ${t.dni}`}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button className="my-2" type="submit">
                  Asignar
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
