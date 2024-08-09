import Image from 'next/image'
import React from 'react'


const avatarImage =
  "https://wallpapers.com/images/hd/hololive-virtual-youtuber-tokoyami-towa-zllzj6bisgkr7rx2.jpg";


export const OptionList = () => {
  return (
    <>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li>
            <div className="grid grid-cols-3 shadow-xl">
              <div className="rounded-l-lg relative">
                <Image className="rounded-l-lg" src={avatarImage} alt="option image" fill style={{objectFit: "cover"}}/>
              </div>
              <div className="bg-slate-100 col-span-2 rounded-r-lg p-3">
                <h2 className="text-2xl font-bold">Titulo</h2>
                <p>Lorem ipsum dolor sit amet consectetur asdasdasdasdasd.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="grid grid-cols-3 shadow-xl">
              <div className="rounded-l-lg relative">
                <Image className="rounded-l-lg" src={avatarImage} alt="option image" fill style={{objectFit: "cover"}}/>
              </div>
              <div className="bg-slate-100 col-span-2 rounded-r-lg p-3">
                <h2 className="text-2xl font-bold">Titulo</h2>
                <p>Lorem ipsum dolor sit amet consectetur asdasdasdasdasd.</p>
              </div>
            </div>
          </li>
          <li className="p-1">
            <div className="grid grid-cols-3 shadow-xl">
              <div className="rounded-l-lg relative">
                <Image className="rounded-l-lg" src={avatarImage} alt="option image" fill style={{objectFit: "cover"}}/>
              </div>
              <div className="bg-slate-100 col-span-2 rounded-r-lg p-3">
                <h2 className="text-2xl font-bold">Titulo</h2>
                <p>Lorem ipsum dolor sit amet consectetur asdasdasdasdasd.</p>
              </div>
            </div>
          </li>
        </ul>

    </>
  )
}
