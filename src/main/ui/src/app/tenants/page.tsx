'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OptionList } from '@/components/ui/optionList'
import { Title } from '@/components/ui/title'
import { useRouter } from 'next/navigation';
import React from 'react'

const avatarImage = '/images/tenant.jpg'

const tenantList = [
  {
    name: "Miguel",
    lastname: "Arrabaseli",
    dni: 4999999,
    contactNumber: 111111,
    id: "1",
  },
  {
    name: "Miguel",
    lastname: "Arrabaseli",
    dni: 4999999,
    contactNumber: 111111,
    id: "1",
  },
];

interface Tenant {
  name: string,
  lastname: string,
  dni: number,
  contactNumber : number,
  id: string
}

const adapterToOptionList = (tenantList : Array<Tenant>) => {

  return tenantList.map(t => {
    return {
      title: `${t.name} ${t.lastname}`,
      description: `Ver información de ${t.name} ${t.lastname}`,
      image: avatarImage,
      route: `/tenants/${t.id}`
    }
  })
};

export default function Tenants() {

  const router = useRouter();

  return (
    <main className='min-h-screen'>
      <Title title='Inquilinos' backgroundImage={avatarImage} />
      <div className='my-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        <Button onClick={() => router.push('tenants/add')}>Agregar</Button>
        </div>
      </div>
      <OptionList options={adapterToOptionList(tenantList)} />
    </main>
  )
}
