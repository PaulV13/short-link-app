'use server'
import { FormAuthSchema } from '@/lib/types'
import { z } from 'zod'

type Inputs = z.infer<typeof FormAuthSchema>

export const loginUser = async (data: Inputs) => {
  const result = FormAuthSchema.safeParse(data)

  if (result.success) {
    const response = await fetch(
      `https://links-short-api.onrender.com/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: result.data.email,
          password: result.data.password
        })
      }
    )
    const data = await response.json()

    if (data.accessToken) {
      return {
        accessToken: data.accessToken,
        error: null
      }
    } else {
      return {
        accessToken: null,
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
