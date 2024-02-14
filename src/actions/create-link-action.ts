'use server'

import { LinkType } from '../../types'

export const createShortUrl = async (formData: FormData) => {
  const urlOriginal = formData.get('url')

  const response = await fetch(
    'https://links-short-api.onrender.com/links/create-link-all-users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urlOriginal }),
    }
  )
  const data: LinkType = await response.json()

  return data
}
