export const REFRESH = '/api/v1/auth/refresh'
export const SIGNIN  = '/api/v1/auth/signin'
export const SIGNUP  = '/api/v1/auth/signup'
export const CHECK   = '/api/v1/auth/check'
export const ME      = '/api/v1/auth/me'
export const POSTS   = '/api/v1/cats/'
export const POST = (id: string) => `/api/v1/cats/${id}`
export const FAVORITES = `/api/v1/cats/favorites`

export const LIKE = (id: string) => `/api/v1/cats/like/${id}`