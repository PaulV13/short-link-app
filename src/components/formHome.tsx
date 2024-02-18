'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createShortUrl } from '@/actions/create-link-action'
import { FormHomeSchema } from '@/lib/types'
import Link from 'next/link'
import Button from './button'
import { createShortUrlAuth } from '@/actions/create-link-auth-action'

type Inputs = z.infer<typeof FormHomeSchema>

export default function FormHome() {
  const [urlShort, setUrlShort] = useState(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormHomeSchema)
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setPending(true)

    const token = localStorage.getItem('accessToken')

    const result = token
      ? await createShortUrlAuth(data, token)
      : await createShortUrl(data)

    if (result?.data.url_short) {
      reset()
      setUrlShort(result.data.url_short)
      setErrorMessage('')
    }

    if (result?.error) {
      setErrorMessage(result?.error)
    }
    setPending(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(processForm)}
        className="m-auto max-w-[512px]"
      >
        <label htmlFor="url" className="text-lg">
          Shorten a long URL
        </label>
        <input
          id="url"
          type="text"
          {...register('url')}
          placeholder="Example: https://www.example.com/long-url"
          className="w-full p-2 my-2 text-black rounded"
        />
        {errors.url?.message ? (
          <p className="text-sm text-red-400">{errors.url.message}</p>
        ) : null}
        <Button pending={pending} />
      </form>
      <section className="text-lg text-center">
        {urlShort ? (
          <p>
            Short url:{' '}
            <Link
              href={`https://links-short-api.onrender.com/links/${urlShort}`}
              className="underline"
            >
              https://links-short-api.onrender.com/links/{urlShort}
            </Link>
          </p>
        ) : null}
        {errorMessage ? <p className="text-red-400">{errorMessage}</p> : null}
      </section>
    </>
  )
}
