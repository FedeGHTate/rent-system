import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";

const avatarImage = "/images/tax.png"

export default function Bill() {

  return (
    <main className='min-h-screen'>
      <Title title='Facturas' backgroundImage={avatarImage} />
      <div className='my-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4 justify-center'>
        <Input type='text' placeholder='Buscar 🔍'></Input>
        </div>
      </div>
      Proximamente..
    </main>
  )
}