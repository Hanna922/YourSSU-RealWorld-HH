import axios, { AxiosRequestConfig } from 'axios'

class Client {
  baseURL: string

  headers = {
    'Content-Type': 'application/json',
  }

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL
  }

  get<T>(path: string, config?: AxiosRequestConfig) {
    return async () => {
      const response = await axios.get<T>(this.baseURL + path, {
        ...config,
        headers: this.headers,
      })

      return response.data
    }
  }

  post<T, D = any>(path: string, data?: D, config?: AxiosRequestConfig) {
    return async () => {
      const response = await axios.post<T>(this.baseURL + path, data, {
        ...config,
        headers: this.headers,
      })
      return response.data
    }
  }

  put<T, D = any>(path: string, data?: D, config?: AxiosRequestConfig) {
    return async () => {
      const response = await axios.put<T>(this.baseURL + path, data, {
        ...config,
        headers: this.headers,
      })
      return response.data
    }
  }

  delete<T>(path: string, config?: AxiosRequestConfig) {
    return async () => {
      const response = await axios.delete<T>(this.baseURL + path, {
        ...config,
        headers: this.headers,
      })
      return response.data
    }
  }
}

export default new Client({
  baseURL: import.meta.env.VITE_API_SERVER,
})
