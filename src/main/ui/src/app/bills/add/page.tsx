"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Title } from "@/components/ui/title";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { IApiResponse, IBill, IBillCreateRequest, IRent } from "@/interfaces/rent-system-api";
import { getFetcher, postFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

const billFormSchema = z.object({
  rentId: z.string().min(1, {
    message: "El alquiler es requerido",
  }),
  days: z.number().positive({
    message: "La cantidad debe ser mayor a 0",
  }),
  withRecharges: z.boolean().default(false).optional(),
});

export default function Add() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({ resolver: zodResolver(billFormSchema) });
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const { data, isLoading, error } = useSWR<IApiResponse<Array<IRent>>>(
    rentSystemPaths.rents.base,
    () => getFetcher(rentSystemPaths.rents.base)
  );

  const onSubmit = async () => {
    try {
      setIsLoadingFetch(true);
      const res: IApiResponse<IBill> = await postFetcher(
        rentSystemPaths.bills.base,
        form.getValues()
      );

      setIsLoadingFetch(false);

      toast({
        title: "Factura creada!",
        description: "La creación de la factura fue exitosa.",
        action: (
          <ToastAction
            altText="Ver factura"
            onClick={() => router.push(rentSystemPaths.bills.details(res.value.id))}
          >
            Ver Factura
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description:
          "Hubo un problema al tratar de crear la factura. Intento luego o consulte a un administrador.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <Title title="Crear factura" backgroundImage={rentSystemImages.tax} />
      <div className="my-4 flex flex-row gap-2 justify-center">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 justify-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="rentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alquiler</FormLabel>
                  <Select
                    required
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige un alquiler" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.value
                        .filter((r) => r.status == "OCCUPIED")
                        .map((r) => {
                          return (
                            <SelectItem key={r.id} value={r.id}>
                              {`${r.name} - ${r.actualTenant.lastname} - ${r.price}$`}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿En cuantos dias vence?</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      value={field.value || ""}
                      placeholder="Ej: 5"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="withRecharges"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="mx-1">
                    <FormLabel className="text-base">
                      Incluir servicios
                    </FormLabel>
                    <FormDescription>
                      Suma una parte del total de los servicios
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isLoadingFetch ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando..
              </Button>
            ) : (
              <Button className="my-2" type="submit">
                Crear factura
              </Button>
            )}
          </form>
        </Form>
      </div>
      <Toaster />
    </main>
  );
}
