'use client'

import { useFormStatus } from 'react-dom'

export default function Button() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-44 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-600 text-white rounded mt-8"
    >
      Acortar url
    </button>
  )
}
