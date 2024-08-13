import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";

const avatarImage = "/images/tenant.jpg";

export default function RentId() {

  return (
    <main className="min-h-screen">
      <Title title="Nuevo inquilino" backgroundImage={avatarImage} />
      <div className="my-4 flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">Nombre del inquilino</Label>
            <Input
              type="text"
              id="name"
              placeholder="Miguelito"
            ></Input>
          </div>

          <div>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              type="text"
              id="lastname"
              placeholder="Aguirre"
            ></Input>
          </div>

          <div>
            <Label htmlFor="dni">Dni</Label>
            <Input type="number" id="dni" placeholder="999999"></Input>
          </div>

          <div>
            <Label htmlFor="contactNumber">Numero de contacto</Label>
            <Input type="number" id="contactNumber" placeholder="15999999"></Input>
          </div>
        </div>
        <div className="my-2">
          <Button>Agregar Inquilino</Button>
        </div>
      </div>
    </main>
  );
}
