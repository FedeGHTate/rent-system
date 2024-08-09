import Image from "next/image";
import React from "react";

const avatarImage =
  "https://wallpapers.com/images/hd/hololive-virtual-youtuber-tokoyami-towa-zllzj6bisgkr7rx2.jpg";

export const Title = () => {
  return (
    <>
      <div className="h-2/5 h-80 relative flex flex-col justify-center items-center">
        <h1 className="text-center absolute z-10 text-2xl font-bold">
          Bienvenido a Shalquiler!
        </h1>
        <Image
          src={avatarImage}
          alt="holo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </>
  );
};
