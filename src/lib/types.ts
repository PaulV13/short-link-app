import { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

export type FormType = 'Login' | 'SignUp'

export type LinkType = {
  id: string
  url_original: string
  url_short: string
  visits: number
  userId: string | null
}

export type CountryType = {
  id: number
  name: string
}

export type CountriesType = {
  country: CountryType
  visits: number
}

export type LinkUserType = {
  id: number
  url_original: string
  url_short: string
  visits: number
  countries: CountriesType[]
}

export type UserType = {
  sub: number
  email: string
}

export type AccessToken = {
  accessToken: string
}

export interface MyJwtPayload extends JwtPayload {
  email: string
}

export const FormAuthSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Invalid Email'
  }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Must be 6 or more characters long' })
})

export const FormHomeSchema = z.object({
  url: z.string().min(1, { message: 'Url is required' }).url({
    message: 'Invalid Url'
  }),
  code: z
    .string()
    .min(6, 'Must be 6 or more characters long')
    .refine((c) => !c.includes(' '), 'Invalid code, not include spaces')
    .optional()
    .or(z.literal(''))
})
