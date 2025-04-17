"use client"

import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/server/actions/auth'

const GoogleSignOutButton = () => {
  return (
  <Button onClick={() => logout()}>
    Sign Out
  </Button>
  )
}

export default GoogleSignOutButton
