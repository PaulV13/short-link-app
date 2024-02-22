import { UserType } from '@/lib/types'
import { create } from 'zustand'

interface UserStore {
  user: UserType | null
  loginUserStore: (user: UserType) => void
  logoutUserStore: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loginUserStore: (user: UserType) => set({ user }),
  logoutUserStore: () => set({ user: null })
}))

interface LinkStore {
  urlShort: string | null
  setUrlShort: (linkShort: string | null) => void
  errorMessage: string | null
  setErrorMessage: (errorMessage: string | null) => void
}

export const useLinkStore = create<LinkStore>((set) => ({
  urlShort: null,
  setUrlShort: (linkShort: string | null) => set({ urlShort: linkShort }),
  errorMessage: null,
  setErrorMessage: (errorMessage: string | null) => set({ errorMessage })
}))
