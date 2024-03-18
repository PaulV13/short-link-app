'use server'

export const getLinks = async (id: string, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/links/user/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token || ''
        }
      }
    )
    const data = await response.json()

    if (data.message) {
      return {
        data: null,
        error: data.message
      }
    }
    return {
      data,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: "Error: Can't connect to server. Please try again later."
    }
  }
}
