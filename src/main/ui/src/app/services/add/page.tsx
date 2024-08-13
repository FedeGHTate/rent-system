import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import React from 'react'

const avatarImage = "/images/services.png";

export default function Add() {
  return (
    <main className="min-h-screen">
      <Title title="Creación de servicio" backgroundImage={avatarImage} />
      <div className="my-4 flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">Nombre de Servicio</Label>
            <Input
              type="text"
              id="name"
              placeholder="Ejemplo: Luz"
            ></Input>
          </div>
          <div>
            <Label htmlFor="price">Precio del servicio</Label>
            <Input type="number" id="price" placeholder="0.0"></Input>
          </div>
        </div>
        <div className="my-2">
          <Button>Agregar</Button>
        </div>
      </div>
    </main>
  )
}