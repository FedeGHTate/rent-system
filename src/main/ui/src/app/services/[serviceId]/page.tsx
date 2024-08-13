import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import React from "react";

const avatarImage = "/images/services.png";

export default function ServiceId() {
  const service = {
    title: "Servicio 1",
    price: 11.20,
    image: avatarImage,
    route: "/1",
  };

  return (
    <main className="min-h-screen">
      <Title title={service.title} backgroundImage={service.image} />
      <div className="my-4 flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">Nombre del servicio</Label>
            <Input
              type="text"
              id="name"
              value={service.title}
            ></Input>
          </div>
          <div>
            <Label htmlFor="price">Precio del servicio</Label>
            <Input type="number" id="price" value={service.price.toString()}></Input>
          </div>
        </div>
        <div className="my-2">
          <Button>Guardar cambios</Button>
        </div>
      </div>
    </main>
  );
}
