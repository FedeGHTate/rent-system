import Image from "next/image";
import React from "react";


interface TitleProps {
  title: string;
  backgroundImage: string;
}

export const Title = ({ title, backgroundImage } : TitleProps) => {
  return (
    <>
      <div className="h-2/5 h-80 relative flex flex-col justify-center items-center">
        <h1 className="text-center absolute z-10 text-2xl font-bold">
          {title}
        </h1>
        <Image className="blur-sm my-1"
          src={backgroundImage}
          alt="holo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </>
  );
};
