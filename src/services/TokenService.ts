class TokenService {
  set(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
  }

  get() {
    return localStorage.getItem('accessToken')
  }
}

const tokenService = new TokenService()

export default tokenService
