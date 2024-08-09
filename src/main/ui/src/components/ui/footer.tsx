import React from 'react'

interface FooterProps {
  text?: string;
}

export const Footer = ({ text } : FooterProps) => {
  return (
    <>
      <footer className="flex flex-col content-center text-center justify-center bg-slate-500 min-h-16 max-h-36 px-12">
        {text}
      </footer>
    </>
  )
}
