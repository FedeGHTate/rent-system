'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OptionList } from '@/components/ui/optionList'
import { Title } from '@/components/ui/title'
import { IApiResponse, ITenant } from '@/interfaces/rent-system-api';
import { getFetcher } from '@/utils/fetchers';
import { rentSystemImages } from '@/utils/imagesPaths';
import { rentSystemPaths } from '@/utils/path';
import { useRouter } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';

const adapterToOptionList = (tenantList : Array<ITenant>) => {

  return tenantList.map(t => {
    return {
      title: `${t.firstname} ${t.lastname}`,
      description: `Ver información de ${t.firstname} ${t.lastname}`,
      image: rentSystemImages.tenant,
      route: rentSystemPaths.tenants.details(t.id)
    }
  })
};

export default function Tenants() {

  const router = useRouter();

  const { data, isLoading, error } = useSWR<IApiResponse<Array<ITenant>>>(rentSystemPaths.tenants.base,() => getFetcher(rentSystemPaths.tenants.base));

  return (
    <main className='min-h-screen'>
      <Title title='Inquilinos' backgroundImage={rentSystemImages.tenant} />
      <div className='my-4 flex flex-col items-center'> 
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        <Button onClick={() => router.push('tenants/add')}>Agregar</Button>
        </div>
      </div>
      {
        isLoading? "Cargando ..": (error? error.message : <OptionList options={adapterToOptionList(data!.value)} />)
      }
    
    </main>
  )
}
