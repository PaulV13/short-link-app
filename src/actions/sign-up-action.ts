'use server'

import { FormAuthSchema } from '@/lib/types'
import { z } from 'zod'

type Inputs = z.infer<typeof FormAuthSchema>

export const signUpUser = async (data: Inputs) => {
  const result = FormAuthSchema.safeParse(data)

  if (result.success) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
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

    if (data.email) {
      return {
        email: data.email,
        error: null
      }
    } else {
      return {
        email: null,
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
