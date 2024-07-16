import { useState } from "react"
export const useFetching = (cb) => { 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const fetching = async(...args) => { 
        try {
            setIsLoading(true)
            await cb(...args)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}