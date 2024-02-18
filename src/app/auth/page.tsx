'use client'

import { useState } from 'react'
import { FormType } from '@/lib/types'
import FormAuth from './components/formAuth'

export default function Auth() {
  const [toggle, setToggle] = useState<FormType>('Login')

  const handleToggle = (toggle: FormType) => {
    setToggle(toggle)
  }

  return (
    <section className="mt-32">
      <label className="w-full shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-gray-300 p-1">
        <input id="toggle" type="checkbox" className="sr-only" />
        <span
          onClick={() => handleToggle('Login')}
          className={`flex items-center justify-center w-full space-x-[6px] rounded py-2 px-[18px] text-sm font-medium text-black ${
            toggle === 'Login' ? 'bg-[#2e4891] text-white' : ''
          }`}
        >
          Login
        </span>
        <span
          onClick={() => handleToggle('SignUp')}
          className={`flex items-center justify-center w-full space-x-[6px] rounded py-2 px-[18px] text-sm font-medium text-black ${
            toggle === 'SignUp' ? 'bg-[#2e4891] text-white' : ''
          }`}
        >
          Sign Up
        </span>
      </label>
      <FormAuth toggle={toggle} />
    </section>
  )
}
