import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import React from 'react'

const avatarImage = "/images/rent.jpg";

export default function Add() {
  return (
    <main className="min-h-screen">
      <Title title="Creación de alquiler" backgroundImage={avatarImage} />
      <div className="my-4 flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">Nombre del alquiler</Label>
            <Input
              type="text"
              id="name"
              placeholder="Ejemplo: Alquiler numero 1"
            ></Input>
          </div>

          <div>
            <Label htmlFor="description">Descripción del alquiler</Label>
            <Textarea
              id="description"
              placeholder="Ejemplo: 2 cuartos + baño"
            ></Textarea>
          </div>

          <div>
            <Label htmlFor="price">Precio del alquiler</Label>
            <Input type="number" id="price" placeholder="0.0"></Input>
          </div>

          <div>
            <Label htmlFor="maxOccupancy">Cantidad máxima de inquilinos</Label>
            <Input type="number" id="maxOccupancy" placeholder="5"></Input>
          </div>
        </div>
        <div className="my-2">
          <Button>Agregar</Button>
        </div>
      </div>
    </main>
  )
}
