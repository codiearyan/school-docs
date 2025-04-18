import React from 'react'
import { auth } from '@/server/auth';


const DashboardLayout = async ({
    children, landing
}:{
    children: React.ReactNode,
    landing: React.ReactNode,
}) => {
    const session = await auth();

    if(!session?.user){
        return landing
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

  {children}
  </main>
  )
}

export default DashboardLayout
