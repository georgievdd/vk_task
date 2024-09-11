
class LocalStorageServiceImpl {
    get<T>(key: string) {
        const value = localStorage.getItem(key)
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
    remove(key: string) {
        localStorage.removeItem(key)
    }
}

export default new LocalStorageServiceImpl()