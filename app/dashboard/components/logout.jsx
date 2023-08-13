"use client"
import React from 'react'
import { signOut } from "next-auth/react"

function logout() {
  return (
    <button onClick={signOut}>logout</button>
  )
}

export default logout
