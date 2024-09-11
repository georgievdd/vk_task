export interface Post {
    title: string
    imgUrl: string
    id: string
    createdAt: string
}

export interface Posts {
    data: Post[]
    limit: number
    page: number
    total: number
}