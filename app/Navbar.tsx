import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full flex justify-between items-center px-10 bg-black text-white h-14'>
      <h1 className='text-xl'>
        Cypher Sheets
      </h1>
      <UserButton />
    </nav>
    
  )
}

export default Navbar