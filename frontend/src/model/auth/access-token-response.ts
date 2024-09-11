export interface AccessTokenResponse {
    accessToken: string
}

export interface UserMe {
    id: string
    email: string
    username: string
    isAdmin: boolean
}