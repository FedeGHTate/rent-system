'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptionList } from "@/components/ui/optionList";
import { Title } from "@/components/ui/title";
import { getFetcher } from "@/utils/fetchers";
import { rentSystemImages } from "@/utils/imagesPaths";
import { rentSystemPaths } from "@/utils/path";
import { useRouter } from "next/navigation";
import useSWR from "swr";


const adapterToOptionList = (serviceList : any) => {

  const optionList = [
    {
      title: "Example 1",
      description: "Example 1, ...",
      image: rentSystemImages.service,
      route: "services/1"
    },
    {
      title: "Example 2",
      description: "Visualizacion alquiler 2",
      image: rentSystemImages.service,
      route: "services/2"
    },
  ];

  return optionList;
};

export default function Services() {

  const router = useRouter();
  const { data, error, isLoading } = useSWR(rentSystemPaths.services.base, () => getFetcher(rentSystemPaths.services.base));



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