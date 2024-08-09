'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface OptionListProps {
  options: Array<Option>;
}

interface Option {
  title: string;
  description?: string;
  image: string;
  route: string
}

export const OptionList = ({ options }: OptionListProps) => {

  const router = useRouter()

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => {
          return (
            <li key={option.title}>
              <button className="h-full w-full" onClick={() => router.push(`./${option.route}`)}>
                <div className="grid grid-cols-3 shadow-xl">
                  <div className="rounded-l-lg relative">
                    <Image
                      className="rounded-l-lg"
                      src={option.image}
                      alt="option image"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="bg-slate-100 col-span-2 rounded-r-lg p-3">
                    <h2 className="text-2xl font-bold">{option.title}</h2>
                    <p>{option.description}</p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};