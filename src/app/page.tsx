import Footer from '@/components/footer'
import FormHome from '@/components/formHome'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-between gap-8 p-8 w-1/2 items-center">
        <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
        <FormHome />
      </main>
      <Footer />
    </>
  )
}
