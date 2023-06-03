import client from '@/lib/client/Client'

class TokenService {
  set(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
    client.updateToken(accessToken)
  }

  get() {
    return localStorage.getItem('accessToken')
  }

  remove() {
    localStorage.removeItem('accessToken')
  }
}

const tokenService = new TokenService()

export default tokenService
