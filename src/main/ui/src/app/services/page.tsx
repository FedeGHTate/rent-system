'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptionList } from "@/components/ui/optionList";
import { Title } from "@/components/ui/title";
import { IApiResponse, IService } from "@/interfaces/rent-system-api";
import { getFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { useRouter } from "next/navigation";
import useSWR from "swr";


const adapterToOptionList = (serviceList : Array<IService>) => {

  return serviceList.map(r => {
    return {
      title: r.name,
      description: `Información del servicio de ${r.name}`,
      image: rentSystemImages.service,
      route: rentSystemPaths.services.details(r.id)
    }
  })
};

export default function Services() {

  const router = useRouter();
  const { data, error, isLoading } = useSWR<IApiResponse<Array<IService>>>(rentSystemPaths.services.base, () => getFetcher(rentSystemPaths.services.base));



  return (
    <main className='min-h-screen'>
      <Title title='Servicios' backgroundImage={rentSystemImages.service} />
      <div className='my-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        <Button onClick={() => router.push('services/add')}>Agregar</Button>
        </div>
      </div>
      {
         isLoading? "Cargando ..": (error? error.message : <OptionList options={adapterToOptionList(data!.value)} />)
      }
    </main>
  )
}