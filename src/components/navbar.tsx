'use client'

import { useEffect, useState } from 'react'
import { MyJwtPayload } from '../lib/types'
import { useLinkStore, useUserStore } from '@/store/store'
import Link from 'next/link'
import jwt from 'jsonwebtoken'

export default function Navbar() {
  const user = useUserStore((state) => state.user)
  const loginUserStore = useUserStore((state) => state.loginUserStore)
  const logoutUserStore = useUserStore((state) => state.logoutUserStore)
  const setErrorMessage = useLinkStore((state) => state.setErrorMessage)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      setToken(token)

      const payload = jwt.decode(token)

      if (payload) {
        const user = payload as MyJwtPayload

        loginUserStore({ sub: Number(user.sub), email: user.email })
      }
    }
    setLoading(false)
  }, [token, loginUserStore])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
    logoutUserStore()
    setErrorMessage(null)
  }

  return (
    <nav className="flex items-center justify-between w-full px-32 py-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold">LOGO</h1>
      {loading ? (
        <div className="flex space-x-4">
          <div className="w-28 h-6 bg-gray-700 animate-pulse rounded"></div>
        </div>
      ) : (
        <ul className="flex space-x-4">
          {token ? (
            <>
              <li>{user?.email}</li>
              <li>
                <Link
                  href="/"
                  className="hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  )
}
