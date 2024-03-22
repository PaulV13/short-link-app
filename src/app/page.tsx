'use client'
import { useLinkStore } from '@/store/store'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer'
import FormHome from '@/components/formHome'
import Navbar from '@/components/navbar'
import Link from 'next/link'

export default function Home() {
  const errorMessage = useLinkStore((state) => state.errorMessage)
  const urlShort = useLinkStore((state) => state.urlShort)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/links/${urlShort}`
    )
    toast.success('Copy to clipboard', {
      position: 'bottom-right',
      duration: 2000,
      icon: '📋',
      style: {
        border: '3px solid #60A5FA'
      }
    })
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col  justify-between gap-8 p-4 w-full md:w-1/2 xl:w-1/3 items-center">
        <h1 className="text-4xl font-bold mb-8">Shorten a long URL</h1>
        <h2 className="text-xl font-bold mb-4 text-blue-200">
          Login to create your short link with custom alias and see the
          countries with the number of visits of your links.
        </h2>
        <FormHome />
        <section className="w-full">
          {urlShort ? (
            <section className="flex flex-col gap-2 items-center bg-gray-200 border-4 border-blue-500 rounded text-gray-900 p-4">
              <div className="flex flex-col md:flex-row gap-2">
                <p className="text-md font-bold">Short URL:</p>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/links/${urlShort}`}
                  className="underline"
                  target="_blank"
                >
                  {process.env.NEXT_PUBLIC_BASE_URL}/links/{urlShort}
                </Link>
              </div>
              <div
                className="flex gap-2 cursor-pointer bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded"
                onClick={copyToClipboard}
              >
                <svg
                  className="icon icon-tabler icon-tabler-copy"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                  <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
                <p>Copy to clipboard</p>
              </div>
            </section>
          ) : null}
          {errorMessage ? <p className="text-red-400">{errorMessage}</p> : null}
        </section>
      </main>
      <Toaster />
      <Footer />
    </>
  )
}
