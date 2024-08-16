'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { rentSystemImages } from "@/utils/imagesPaths";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postFetcher } from "@/utils/fetchers";
import { rentSystemPaths } from "@/utils/path";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const tenantFormSchema = z.object({
  firstname: z.string().min(1,{
    message: "El nombre es requerido.",
  }),
  lastname: z.string().min(1,{
    message: "El apellido es requerido.",
  }),
  dni: z.string().min(1,{
    message: "El dni es requerido",
  }),
  contactNumber: z.string().min(1,{
    message: "El numero de contacto tiene que ser 8 digitos minimo",
  }),
});

export default function RentAdd() {

  const form = useForm({ resolver: zodResolver(tenantFormSchema) });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async () => {

    try{
      const res = await postFetcher(rentSystemPaths.tenants.base,form.getValues());
      toast({
        title: "Inquilino creado!",
        description: "La creación del inquilino fue exitosa.",
        action: <ToastAction altText="Ver inquilinos" onClick={() => router.push(rentSystemPaths.tenants.base)}>Ver inquilinos</ToastAction>,
      })
    } catch(error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description: "Hubo un problema al tratar de crear el inquilino. Intento luego o consulte a un administrador."
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Title title="Nuevo inquilino" backgroundImage={rentSystemImages.tenant} />


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
                        required
                        placeholder="Ej: Miguel"
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
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        required
                        value={field.value || ""}
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
                        required
                        value={field.value || ""}
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
                        required
                        value={field.value || ""}
                        placeholder="Ej: 11999999"
                        onChange={(e) => field.onChange(e.target.value)}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="my-2" type="submit">Agregar inquilino</Button>
            </form>
          </Form>
          </div>
          <Toaster/>

    </main>
  );
}
