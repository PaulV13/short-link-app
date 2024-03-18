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
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      const payload = jwt.decode(token)

      if (payload) {
        const user = payload as MyJwtPayload

        loginUserStore({ sub: Number(user.sub), email: user.email })
      }
    }
    setLoading(false)
  }, [loginUserStore])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    logoutUserStore()
    setErrorMessage(null)
  }

  if (!user)
    return (
      <nav className="flex items-center justify-between container mx-auto p-4">
        <h1 className="text-3xl font-bold">VIDURL</h1>
        {loading ? (
          <div className="flex space-x-4">
            <div className="w-28 h-6 bg-gray-700 animate-pulse rounded"></div>
          </div>
        ) : (
          <ul className="flex gap-2">
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
          </ul>
        )}
      </nav>
    )

  return (
    <div className="bg-gray-950 text-white w-full">
      <nav className="flex items-center justify-between container mx-auto p-4">
        <h1 className="text-3xl font-bold">VIDURL</h1>
        {loading ? (
          <div className="flex space-x-4">
            <div className="w-28 h-6 bg-gray-700 animate-pulse rounded"></div>
          </div>
        ) : (
          <ul className="hidden md:flex space-x-4">
            <li>{user?.email}</li>
            <li>
              <Link
                href={`/dashboard/${user?.sub}`}
                className="hover:underline"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        <div className="flex md:hidden " onClick={() => setMenuOpen(!menuOpen)}>
          <div>{user?.email}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 9l6 6l6 -6" />
          </svg>
        </div>
        {menuOpen ? (
          <div className="absolute top-0 start-0 w-screen h-dvh bg-black flex flex-col justify-center items-center gap-12">
            <div
              className="absolute top-4 right-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              X
            </div>
            <ul className="flex flex-col gap-4">
              {user ? (
                <>
                  <li>
                    <Link
                      href={`/dashboard/${user?.sub}`}
                      className="hover:underline"
                    >
                      Dashboard
                    </Link>
                  </li>
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
          </div>
        ) : null}
      </nav>
    </div>
  )
}
