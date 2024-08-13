import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import React from "react";

const avatarImage = "/images/tenant.jpg";

export default function RentId() {
  const tenant = {
    name: "Miguel",
    lastname: "Arrabaseli",
    dni: 4999999,
    contactNumber: 111111,
    id: "1",
  };



  return (
    <main className="min-h-screen">
      <Title title={`${tenant.name} ${tenant.lastname}`} backgroundImage={avatarImage} />
      <div className="my-4 flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">Nombre del inquilino</Label>
            <Input
              type="text"
              id="name"
              value={tenant.name}
            ></Input>
          </div>

          <div>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              type="text"
              id="lastname"
              value={tenant.lastname}
            ></Input>
          </div>

          <div>
            <Label htmlFor="dni">Dni</Label>
            <Input type="number" id="dni" value={tenant.dni}></Input>
          </div>

          <div>
            <Label htmlFor="contactNumber">Numero de contacto</Label>
            <Input type="number" id="contactNumber" value={tenant.contactNumber}></Input>
          </div>
        </div>
        <div className="my-2">
          <Button>Guardar cambios</Button>
        </div>
      </div>
    </main>
  );
}
