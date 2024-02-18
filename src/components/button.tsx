'use client'

export default function Button({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="w-44 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-600 text-white rounded mt-8"
      disabled={pending}
    >
      {pending ? 'Shortening...' : 'Shorten url'}
    </button>
  )
}
