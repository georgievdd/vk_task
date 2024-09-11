import { HttpMethodController } from "hooks";
import { useEffect, useState } from "react";



export default function useGet<T>(
    apiMethod: (params?: any) => Promise<T>,
    triggers: any[] = [],
    params?: Record<string, any>,
    catchError?: (err: any) => void): HttpMethodController<T> {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        if (triggers.every(Boolean)) {
            setLoading(true)
            apiMethod(params)
                .then(setData)
                .catch(error => {
                    catchError?.(error)
                    console.log(error)
                })
                .finally(() => setLoading(false))
        }
    }, [...triggers])
    return {
        data,
        isLoading,
        _setData: setData
    }
}