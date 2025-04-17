"use client"

import React from 'react'
import { Button } from '../ui/button'
import { login } from '@/server/actions/auth'

const GoogleSignInButton = () => {
  return (
    <Button
    className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
  onClick={() => login()}
  >
Login with Google
  </Button>
  )
}

export default GoogleSignInButton
