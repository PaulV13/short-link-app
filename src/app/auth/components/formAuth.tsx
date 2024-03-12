'use client'
import { loginUser } from '@/actions/login-action'
import { signUpUser } from '@/actions/sign-up-action'
import { FormAuthSchema, FormType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import ButtonAuth from './buttonAuth'

type Inputs = z.infer<typeof FormAuthSchema>

export default function FormAuth({ toggle }: { toggle: FormType }) {
  const [pending, setPending] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormAuthSchema)
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (toggle === 'SignUp') {
      setPending(true)
      const result = await signUpUser(data)

      if (result?.email) {
        reset()
        setErrorMessage('')
        const result = await loginUser(data)
        if (result?.accessToken) {
          localStorage.setItem('accessToken', result?.accessToken)
          localStorage.setItem('refreshToken', result?.refreshToken)
          router.push('/')
        }
      }
      if (result?.error) {
        setErrorMessage(result?.error)
      }
      setPending(false)
    } else {
      setPending(true)
      const result = await loginUser(data)

      if (result?.accessToken) {
        reset()
        setErrorMessage('')
        localStorage.setItem('accessToken', result?.accessToken)
        localStorage.setItem('refreshToken', result?.refreshToken)
        router.push('/')
      }
      if (result?.error) {
        setErrorMessage(result?.error)
      }
      setPending(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="mt-8">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              className="w-full p-2 my-2 text-black rounded"
              placeholder="user@gmail.com"
              {...register('email')}
              autoComplete="off"
            />
            {errors.email?.message ? (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              className="w-full p-2 my-2 text-black rounded"
              placeholder="********"
              {...register('password')}
              autoComplete="off"
            />
            {errors.password?.message ? (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          {toggle === 'SignUp' ? (
            <ButtonAuth pending={pending} title="Sign Up" />
          ) : (
            <ButtonAuth pending={pending} title="Login" />
          )}
        </div>
      </form>
      {errorMessage ? (
        <p className="text-sm text-red-400 mt-4">{errorMessage}</p>
      ) : null}
    </>
  )
}
