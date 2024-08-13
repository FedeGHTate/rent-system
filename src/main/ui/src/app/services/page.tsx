'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptionList } from "@/components/ui/optionList";
import { Title } from "@/components/ui/title";
import { useRouter } from "next/navigation";

const avatarImage = "/images/services.png"

export default function Services() {

  const router = useRouter();

  const optionList = [
    {
      title: "Example 1",
      description: "Example 1, ...",
      image: avatarImage,
      route: "services/1"
    },
    {
      title: "Example 2",
      description: "Visualizacion alquiler 2",
      image: avatarImage,
      route: "services/2"
    },
  ];




  return (
    <main className='min-h-screen'>
      <Title title='Servicios' backgroundImage={avatarImage} />
      <div className='my-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        <Button onClick={() => router.push('services/add')}>Agregar</Button>
        </div>
      </div>
      <OptionList options={optionList} />
    </main>
  )
}