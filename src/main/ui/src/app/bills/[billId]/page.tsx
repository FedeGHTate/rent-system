"use client";
import { Title } from "@/components/ui/title";
import { rentSystemImages } from "@/utils/imagesPaths";
import { IApiResponse, IBill } from "@/interfaces/rent-system-api";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { rentSystemPaths } from "@/utils/path";
import useSWR from "swr";
import { getFetcher, postFetcher } from "@/utils/fetchers";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatDateToDDMMYY } from "@/utils/formatDateToDDMMY";
import { translateBillStatus } from "@/utils/translateBillStatus";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

enum SubmitAction {
  PAY,
  REFUND,
  CANCEL
}

export default function Bill() {
  const { billId } = useParams<{ billId: string }>();
  const { toast } = useToast();
  const [isLoadingAction, setIsLoadingAction] = useState(false)

  const { data, isLoading, error, mutate } = useSWR<IApiResponse<IBill>>(
    rentSystemPaths.bills.details(billId),
    () => getFetcher(rentSystemPaths.bills.details(billId))
  );

  const onSubmit = async (id: string, submitType: SubmitAction) => {
    try {

      setIsLoadingAction(true);
      toast({
        title: "Espere por favor",
        description: "Se está completando el cambio ..",
      });

      let response : IApiResponse<IBill>; 
      switch (submitType) {
        case SubmitAction.PAY:
          response = await postFetcher(rentSystemPaths.bills.pay(id), {});
          break;
      
        case SubmitAction.REFUND:
          response = await postFetcher(rentSystemPaths.bills.refund(id), {});
          break;
      
        case SubmitAction.CANCEL:
          response = await postFetcher(rentSystemPaths.bills.cancel(id), {});
          break;
      
        default:
          throw new Error("Error")
          break;
      }

      mutate(response)
      toast({
        title: "Listo!",
        description: "Cambio completado!",
      });
      setIsLoadingAction(false);

    } catch (error) {
      toast({
        title: "Uh hubo un problema!",
        variant: "destructive",
        description:
          "Hubo un problema al tratar de modificar la factura. Intento luego o consulte a un administrador.",
      });
    }
  };

  const onPayClick = async (id : string) => {
    await postFetcher(rentSystemPaths.bills.pay(id), {})
  }
  
  const onRefundClick = async (id : string) => {
    await postFetcher(rentSystemPaths.bills.refund(id), {})
  }
  
  const onCancelClick = async (id : string) => {  
    await postFetcher(rentSystemPaths.bills.cancel(id), {})
  }

  return (
    <main className="min-h-screen">
      <Title title="Factura" backgroundImage={rentSystemImages.tax} />

      {isLoading ? (
        "Cargando .."
      ) : error ? (
        error.message
      ) : (
          <div className="my-4 flex flex-col gap-2 items-center">

            <div className="grid gap-4 p-4   w-96">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenantName" className="text-right">
                  Inquilino
                </Label>
                <Input
                  id="tenantName"
                  disabled
                  value={`${data?.value.tenant.firstname} ${data?.value.tenant.lastname}`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rentName" className="text-right">
                  Alquiler
                </Label>
                <Input
                  id="rentName"
                  disabled
                  value={data?.value.billRentInfo.rentName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio del Alquiler
                </Label>
                <Input
                  id="rentPrice"
                  disabled
                  value={`${data?.value.basePrice? (data?.value.basePrice) : 0} $`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Gastos adicionales
                </Label>
                <Input
                  id="additionals"
                  disabled
                  value={`${data?.value.serviceCharge? (data?.value.serviceCharge) : 0} $`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio Final
                </Label>
                <Input
                  id="price"
                  disabled
                  value={`${data?.value.amount} $`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issueDate" className="text-right">
                  Fecha de emision
                </Label>
                <Input
                  id="issueDate"
                  disabled
                  value={formatDateToDDMMYY(data?.value.issueDate!)}
                  className="col-span-3"
                />
              </div>
              {data?.value.status == "PAID" ? (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paidDate" className="text-right">
                    Fecha de pago
                  </Label>
                  <Input
                    id="paidDate"
                    disabled
                    value={formatDateToDDMMYY(data?.value.paidDate)}
                    className="col-span-3"
                  />
                </div>
              ) : data?.value.status == "CANCELLED" || data?.value.status == "REFUNDED" ? (
                <></>
              ) : (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Fecha de vencimiento
                  </Label>
                  <Input
                    id="dueDate"
                    disabled
                    value={formatDateToDDMMYY(data?.value.dueDate!)}
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado de la factura
                </Label>
                <Input
                  id="status"
                  disabled
                  value={translateBillStatus(data?.value.status!)}
                  className="col-span-3"
                />
              </div>

              {data?.value.status == "PAID" ? (
                <Button disabled={isLoadingAction} onClick={() => onSubmit(data?.value.id,SubmitAction.REFUND)} type="submit" className="bg-yellow-600" >Reembolsar factura</Button>
              ) : data?.value.status == "UNPAID" ? (
                <div className="flex flex-row gap-5 justify-center">
                <Button disabled={isLoadingAction} onClick={() => onSubmit(data?.value.id,SubmitAction.PAY)} type="submit" variant="destructive" className="bg-green-500">Pagada</Button>
                <Button disabled={isLoadingAction} onClick={() => onSubmit(data?.value.id,SubmitAction.CANCEL)} type="submit" variant="destructive">Cancelar</Button>
                </div>
              ) : (
                <>
                </>
              )}

            </div>
          </div>
      )}             
      <Toaster/>
    </main>
  );
}