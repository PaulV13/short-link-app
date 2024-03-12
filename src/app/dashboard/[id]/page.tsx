'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getLinks } from '@/actions/get-links-action'
import { LinkUserType } from '@/lib/types'
import { refreshTokenAction } from '@/actions/refresh-token'
import BarChart from '../components/BarChart'
import Link from 'next/link'

export default function Dashboard() {
  const params = useParams()
  const id = params.id as string
  const [links, setLinks] = useState<LinkUserType[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedLink, setSelectedLink] = useState<LinkUserType | null>(null)
  const router = useRouter()
  const [itemSelected, setItemSelected] = useState(0)

  const handleLinkClick = (link: LinkUserType) => {
    setItemSelected(link.id)
    setSelectedLink(link)
  }

  const handleCreateLink = () => {
    router.push('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (token && refreshToken) {
      const fetchData = async () => {
        const response = await getLinks(id, token)

        if (response.error) {
          const { acccessToken } = await refreshTokenAction(refreshToken, token)
          localStorage.setItem('accessToken', acccessToken)
          if (acccessToken) {
            const newResponse = await getLinks(id, acccessToken)
            if (newResponse.error) {
              setError(newResponse.error)
              return
            }

            setLinks(newResponse.data)
            return
          }
        }
        setLinks(response.data)
      }
      fetchData()
    } else {
      router.push('/')
    }
  }, [id, router])

  if (error) return <div>{error}</div>

  if (links && links.length === 0) {
    return (
      <section className="flex flex-col w-screen h-screen justify-center items-center gap-4">
        <p className="text-xl">You have not created any links</p>
        <button
          className="text-black py-1 px-2 bg-blue-200 hover:bg-blue-300 rounded-md"
          onClick={handleCreateLink}
        >
          Create link
        </button>
      </section>
    )
  }

  if (links) {
    return (
      <>
        <div className="container mx-auto flex flex-col gap-12">
          <h1 className="mt-12 text-3xl">Links</h1>
          <section className="w-full grid grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-2">
            <section className="flex flex-col row-start-2 row-end-3 lg:row-start-1 lg:row-end-2 h-[50vh] lg:h-[70vh] gap-2 text-[9px] text-black bg-white rounded-md md:text-base items-center p-4">
              <button
                className="text-[12px] py-1 px-2 bg-blue-200 hover:bg-blue-300 rounded-md self-end"
                onClick={handleCreateLink}
              >
                Create link
              </button>
              {links?.map((link) => (
                <section
                  key={link.id}
                  className={`w-full cursor-pointer ${itemSelected === link.id ? 'bg-blue-200' : 'bg-white'} rounded-md p-2 hover:bg-blue-200 transition-all duration-300 ease-in-out`}
                  onClick={() => handleLinkClick(link)}
                >
                  <div>
                    <p className="text-black font-bold">{link.url_original}</p>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/links/${link.url_short}`}
                      target="blank"
                      className="text-blue-600 text-[12px]"
                    >
                      {process.env.NEXT_PUBLIC_BASE_URL}/links/
                      {link.url_short}
                    </Link>
                  </div>
                  <div className="flex gap-2 justify-end text-gray-400 text-[12px]">
                    <p>{link.visits}</p>
                    <p>{link.visits === 1 ? 'Visit' : 'Visits'}</p>
                  </div>
                  <hr></hr>
                </section>
              ))}
            </section>
            <BarChart link={selectedLink} />
          </section>
        </div>
      </>
    )
  }
}
