import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const layout = ({children}: { children: ReactNode }) => {
  return (
    <div className=' w-[100dvw] h-[100dvh] flex justify-start flex-col items-center'>
        <Navbar />
        {children}
    </div>
  )
}

export default layout