export const refreshTokenAction = async (refreshtoken: string) => {
  const token = localStorage.getItem('accessToken')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token || ''
      },
      body: JSON.stringify({ refreshToken: refreshtoken })
    }
  )
  const data = await response.json()

  if (data.accessToken) {
    return {
      acccessToken: data.accessToken
    }
  } else {
    return {
      data: null,
      error: data.message
    }
  }
}
