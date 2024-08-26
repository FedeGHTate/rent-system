"use client";
import { Title } from "@/components/ui/title";
import { DataTable } from "./data-table";
import { rentSystemImages } from "@/utils/imagesPaths";
import { columns } from "./columns";
import { IApiResponse, IBill } from "@/interfaces/rent-system-api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { rentSystemPaths } from "@/utils/path";
import useSWR from "swr";
import { getFetcher, postFetcher } from "@/utils/fetchers";
import { ExportButton } from "./exportButton";


export default function Bill() {
  const router = useRouter();
  const { data, isLoading, error } = useSWR<IApiResponse<Array<IBill>>>(
    rentSystemPaths.bills.base,
    () => getFetcher(rentSystemPaths.bills.base)
  );

  const onPayClick = async (id : string) => {
    await postFetcher(rentSystemPaths.bills.pay(id), {})
  }
  
  const onRefundClick = async (id : string) => {
    await postFetcher(rentSystemPaths.bills.refund(id), {})
  }
  
  const onCancelClick = async (id : string) => {  
    await postFetcher(rentSystemPaths.bills.cancel(id), {})
    router.refresh();

  }

  return (
    <main className="min-h-screen">
      <Title title="Facturas" backgroundImage={rentSystemImages.tax} />

      {isLoading ? (
        "Cargando .."
      ) : error ? (
        error.message
      ) : (
        <>
          <div className="my-4 flex flex-row gap-2 justify-center">
            <Button className="bg-green-400" onClick={() => router.push(rentSystemPaths.bills.create)}>
              Crear factura
            </Button>
            <ExportButton />
          </div>
          <DataTable columns={columns} onCancelClick={onPayClick} onPayClick={onPayClick} onRefundClick={onRefundClick}  data={data?.value!} />
        </>
      )}
    </main>
  );
}