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

const avatarImage =
  "https://wallpapers.com/images/hd/hololive-virtual-youtuber-tokoyami-towa-zllzj6bisgkr7rx2.jpg";

export const Navbar = () => {
  return (
    <>
      <header>
        <nav className="flex flex-row justify-between bg-slate-500 min-h-16 max-h-36 px-5">
          <div className="flex flex-col justify-center content-center">
            <Avatar className="size-8">
              <AvatarImage src={avatarImage} />
              <AvatarFallback>Home</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center content-center">
            <Sheet>
              <SheetTrigger>
                <LuMenu className="size-7" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Opciones</SheetTitle>
                  <SheetDescription>
                    <ul>
                      <li>
                      <Button variant="secondary" type="submit">Mi perfil</Button>
                      </li>
                    </ul>
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
