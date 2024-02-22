'use server'

import { z } from 'zod'
import { FormHomeSchema } from '../lib/types'

type Inputs = z.infer<typeof FormHomeSchema>

export const createShortUrlAuth = async (data: Inputs, token: string) => {
  const result = FormHomeSchema.safeParse(data)

  if (result.success) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/links/create-link-users-auth${result.data.code ? `?code=${result.data.code.trim()}` : '/'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token || ''
        },
        body: JSON.stringify({ urlOriginal: result.data.url })
      }
    )
    const data = await response.json()

    if (data.url_short) {
      return {
        data,
        error: null
      }
    } else {
      return {
        data: null,
        error: data.message
      }
    }
  }

  if (result.error) {
    return {
      success: false,
      error: result.error.format()
    }
  }
}
