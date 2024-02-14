'use client'

import { useRef } from 'react'
import Button from './button'

type FormProps = {
  action: string | ((formData: FormData) => void) | undefined
}

export default function Form({ action }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form action={action} className="m-auto max-w-[512px]" ref={formRef}>
      <label htmlFor="url" className="text-lg">
        Ingrese una url larga
      </label>
      <input
        id="url"
        type="text"
        name="url"
        placeholder="Example: https://www.example.com/long-url"
        className="w-full p-2 my-2 text-black rounded"
      />
      <Button />
    </form>
  )
}
