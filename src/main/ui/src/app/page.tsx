import { OptionList } from "@/components/ui/optionList";
import { Title } from "@/components/ui/title";

const avatarImage = "/images/towa.jpg";

const optionList = [
  {
    title: "Alquileres",
    description: "Visualización de alquileres",
    image: avatarImage,
    route: "/rents"
  },
  {
    title: "Inquilinos",
    description: "Visualización de inquilinos",
    image: avatarImage,
    route: "/tenants"
  },
  {
    title: "Servicio",
    description: "Visualización de servicios",
    image: avatarImage,
    route: "/services"
  },
  {
    title: "Facturas",
    description: "Visualización de todas las facturas",
    image: avatarImage,
    route: "/bills"
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Title title="Bienvenido a Sharlquiler" backgroundImage={avatarImage} />
      <div className="my-2">
        <OptionList options={optionList} />
      </div>
    </main>
  );
}
