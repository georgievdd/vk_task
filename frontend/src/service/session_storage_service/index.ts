
class SessionStorageServiceImpl {
    get<T>(key: string) {
        const value = sessionStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
        return null
    }
    set(object: Record<string, any>) {
        Object.keys(object).forEach(key => {
            localStorage.setItem(key, object[key])
        })
    }

}

export default new SessionStorageServiceImpl()