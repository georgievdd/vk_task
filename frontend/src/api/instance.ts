import axios from 'axios'
import { BACKEND_URL } from 'config'
import {getAuthHeader, waitFor} from 'helpers'
import authService from 'service/auth_service'

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
    config.headers!.Authorization = getAuthHeader()
    return config
})
axiosInstance.interceptors.response.use(config => config, async error => {
    const originalRequest = error.config
    console.log(originalRequest.config?._isRetry)
    if (error.response.status === 401 && !originalRequest.config?._isRetry) {
        await waitFor(1000)
        await authService.refresh()
        return axiosInstance.request(originalRequest)
    }
    throw error
})

export const get = axiosInstance.get
export const post = axiosInstance.post
export const put = axiosInstance.put