import { useCallback, useState } from "react"
import { RequestConfig, request } from "../utils/http"

// 自定义Hook
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
  
    const sendRequest = useCallback(async <T>(config: RequestConfig): Promise<T | null> => {
      setLoading(true)
      setError(null)
      
      try {
        return await request<T>(config)
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        return null
      } finally {
        setLoading(false)
      }
    }, [])
  
    return { loading, error, sendRequest }
  }