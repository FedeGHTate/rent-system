'use client'
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { LuMenu } from "react-icons/lu";
import { rentSystemPaths } from "@/utils/path";
import { rentSystemImages } from "@/utils/imagesPaths";

export const Navbar = () => {

  const router = useRouter()

  return (
    <>
      <header>
        <nav className="flex flex-row justify-between bg-slate-500 min-h-16 max-h-36 px-5">
          <button className="flex flex-col justify-center content-center" onClick={() => router.push('/')}>
            <Avatar className="size-8">
              <AvatarImage src={rentSystemImages.background} />
              <AvatarFallback>HI</AvatarFallback>
            </Avatar>
          </button>
          <div className="flex flex-col justify-center content-center">
            <Sheet>
              <SheetTrigger>
                <LuMenu className="size-7" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Opciones</SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col gap-2">
                      <Button variant="secondary" onClick={() => router.push(rentSystemPaths.rents.base)}>Alquileres</Button>
                      <Button variant="secondary" onClick={() => router.push(rentSystemPaths.tenants.base)}>Inquilinos</Button>
                      <Button variant="secondary" onClick={() => router.push(rentSystemPaths.services.base)}>Servicios</Button>
                      <Button variant="secondary" onClick={() => router.push(rentSystemPaths.bills.base)}>Facturas</Button>
                    </div>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className="mt-8">
                  <Button type="submit">Cerrar sesion</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
};
