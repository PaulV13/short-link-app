'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createShortUrl } from '@/actions/create-link-action'
import { FormHomeSchema } from '@/lib/types'
import { createShortUrlAuth } from '@/actions/create-link-auth-action'
import { useLinkStore, useUserStore } from '@/store/store'
import Button from './button'
import jwt from 'jsonwebtoken'
import { refreshTokenAction } from '@/actions/refresh-token'

type Inputs = z.infer<typeof FormHomeSchema>

const isTokenExpired = (token: string | null) => {
  if (token === null) return true

  const payload = jwt.decode(token)

  if (typeof payload === 'string' || payload === null) return false

  const { exp } = payload
  if (exp === undefined) return false

  return Date.now() >= exp * 1000
}

export default function FormHome() {
  const user = useUserStore((state) => state.user)

  const setErrorMessage = useLinkStore((state) => state.setErrorMessage)
  const setUrlShort = useLinkStore((state) => state.setUrlShort)

  const [pending, setPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormHomeSchema)
  })

  useEffect(() => {
    if (user === null) {
      reset()
      setUrlShort(null)
    }
  }, [user, reset, setUrlShort])

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setPending(true)

    let token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (isTokenExpired(token)) {
      if (refreshToken) {
        const { acccessToken } = await refreshTokenAction(refreshToken)
        localStorage.setItem('accessToken', acccessToken)
        token = acccessToken
      }
    }

    const result = token
      ? await createShortUrlAuth(data, token)
      : await createShortUrl(data)

    if (result?.data === null) {
      setErrorMessage(result?.error)
    } else {
      reset()
      setUrlShort(result?.data.url_short)
      setErrorMessage('')
    }
    setPending(false)
  }

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="flex flex-col gap-4 w-full max-w-2xl"
    >
      <input
        id="url"
        type="text"
        {...register('url')}
        placeholder="Enter long url here"
        className="w-full p-2 my-2 text-black rounded focus:outline-none focus:outline-2 focus:outline-blue-500"
      />
      {errors.url?.message ? (
        <p className="text-sm text-red-400">{errors.url.message}</p>
      ) : null}
      <input
        id="code"
        type="text"
        {...register('code')}
        placeholder="Optional: Enter alias"
        className="w-full p-2 my-2 text-black rounded focus:outline-none focus:outline-2 focus:outline-blue-500"
        disabled={user === null}
      />
      {errors.code?.message ? (
        <p className="text-sm text-red-400">{errors.code.message}</p>
      ) : null}

      <Button pending={pending} />
    </form>
  )
}
