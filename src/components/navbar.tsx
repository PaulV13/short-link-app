import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-32 py-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold">LOGO</h1>
      <ul className="flex space-x-4">
        <li>
          <Link href="/auth" className="hover:underline">
            Iniciar sesion
          </Link>
        </li>
        <li>
          <Link href="/auth" className="hover:underline">
            Registrarse
          </Link>
        </li>
      </ul>
    </nav>
  )
}
