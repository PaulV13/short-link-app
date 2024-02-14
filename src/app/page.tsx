'use client'
import { createShortUrl } from '@/actions/create-link-action'
import { useFormState } from 'react-dom'
import { LinkType } from '../../types'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import Form from '@/components/form'

export default function Home() {
  const [state, formAction] = useFormState(handleSubmit, null)

  async function handleSubmit(_state: null | LinkType, formData: FormData) {
    const link = await createShortUrl(formData)
    return link
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-between gap-8 p-8 w-1/2 items-center">
        <h1 className="text-4xl font-bold mb-8">Acortador de url largas</h1>
        <Form action={formAction} />
        <section className="text-lg text-center">
          {state ? (
            <p>
              Url corta:{' '}
              <Link
                href={`https://links-short-api.onrender.com/links/${state.url_short}`}
                className="underline"
              >
                https://links-short-api.onrender.com/links/${state.url_short}
              </Link>
            </p>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  )
}
