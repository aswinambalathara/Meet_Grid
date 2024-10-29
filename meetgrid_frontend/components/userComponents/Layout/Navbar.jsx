import React from 'react'

function Navbar() {
  return (
    <header className='user-nav-container w-full h-28 flex items-center justify-center'>
        <nav className='bg-nav-brown w-[1400px] h-16 rounded-full flex items-center justify-between px-5'>
            <h2 className='text-white font-bold text-2xl ms-4'>MEET GRID</h2>
            <ul className='nav-left flex text-white gap-6 items-center'>
              <li className='bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer transition-all duration-300'>
                Explore Events
              </li>
              <li className='bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer'>
                Host Event
              </li>
              <li className='bg-[#1B1919] px-4 py-2 rounded-full hover:bg-transparent hover:ring-slate-100 hover:ring-1 cursor-pointer'>
                Login/Signup
              </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar