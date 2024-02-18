import React from 'react'

export default function ButtonAuth({
  pending,
  title
}: {
  pending: boolean
  title: string
}) {
  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:text-gray-600"
      disabled={pending}
    >
      {pending ? `${title}...` : `${title}`}
    </button>
  )
}
