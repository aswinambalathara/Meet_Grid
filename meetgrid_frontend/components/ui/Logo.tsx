import React from 'react'
import Image from 'next/image'


function Logo({className,darkMode}:{className?:string,darkMode?:boolean}) {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
       <Image src="/images/meetgrid_logo.png" alt='logo-image' width={40}  height={40}/>
       <h2 className={`${darkMode? 'text-black' : 'text-white'} font-bold text-2xl`}>MEET GRID</h2>
    </div>
  )
}

export default Logo