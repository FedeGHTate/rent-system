'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OptionList } from '@/components/ui/optionList'
import { Title } from '@/components/ui/title'
import { useRouter } from 'next/navigation';
import React from 'react'

const avatarImage = '/images/rent.jpg'

const optionList = [
  {
    title: "Alquiler 1",
    description: "Alquiler 1, ...",
    image: avatarImage,
    route: "rents/1"
  },
  {
    title: "Alquiler 2",
    description: "Visualizacion alquiler 2",
    image: avatarImage,
    route: "rents/2"
  },
];

export default function Rents() {

  const router = useRouter();

  return (
    <main className='min-h-screen'>
      <Title title='Alquileres' backgroundImage={avatarImage} />
      <div className='my-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        <Button onClick={() => router.push('rents/add')}>Agregar</Button>
        </div>
      </div>
      <OptionList options={optionList} />
    </main>
  )
}
