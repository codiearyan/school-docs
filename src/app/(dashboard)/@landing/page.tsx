import GoogleSignInButton from '@/components/auth/signin-button'
import React from 'react'

const LandingPage =  () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
School Docs - for managing school documents + Google Workspace
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      <GoogleSignInButton />   
      </div>
    </div>
  </main>
  )
}

export default LandingPage
