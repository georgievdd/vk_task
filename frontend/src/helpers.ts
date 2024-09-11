import { useRef as reactUseRef } from "react"
export const getAccessToken = () => localStorage.getItem('accessToken')

export const getAuthHeader = () => `Bearer ${getAccessToken()}`

export const unpack = <T>(value: Axios.AxiosXHR<T>) =>  value.data

export const waitFor = (delay: number) =>
    new Promise(resolve => setTimeout(resolve, delay))

// dates
export function getDatePreview(dateRaw: Date | string): string {
    const date = typeof dateRaw === 'string' ? new Date(dateRaw) : dateRaw
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }
    const formattedDate = new Intl.DateTimeFormat('en-En', options).format(date)
    return formattedDate.replace(',', ' в')
}

// react
export type CorrectRef<T> = React.MutableRefObject<T | null>

export function useRef<T>() {
    return reactUseRef<T>() as React.MutableRefObject<T | null>
}

export const generateId = (prefix?: string) =>
    `${prefix}prefix${Math.random().toString().slice(2)}`

export const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, delay)
    }
}