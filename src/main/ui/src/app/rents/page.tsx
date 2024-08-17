'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OptionList } from '@/components/ui/optionList'
import { Title } from '@/components/ui/title'
import { IApiResponse, IRent } from '@/interfaces/rent-system-api';
import { getFetcher } from '@/utils/fetchers';
import { rentSystemImages } from '@/utils/imagesPaths';
import { rentSystemPaths } from '@/utils/path';
import { useRouter } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';

const adapterToOptionList = (rentList : Array<IRent>) => {

  return rentList.map(r => {
    
    return {
      title: r.name,
      description: r.description,
      image: rentSystemImages.rent,
      route: rentSystemPaths.rents.details(r.id)
    }
  })
};

export default function Rents() {

  const router = useRouter();

  const { data, isLoading, error } = useSWR<IApiResponse<Array<IRent>>>(rentSystemPaths.rents.base,() => getFetcher(rentSystemPaths.rents.base));

  return (
    <main className='min-h-screen'>
      <Title title='Alquileres' backgroundImage={rentSystemImages.rent} />
      <div className='my-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        <Button onClick={() => router.push('rents/add')}>Agregar</Button>
        </div>
      </div>
      {
        isLoading? "Cargando ..": (error? error.message : <OptionList options={adapterToOptionList(data!.value)} />)
      }    
      </main>
  )
}
