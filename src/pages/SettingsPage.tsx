import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { useUser } from '@/hooks/useUser'
import { putUser } from '@/lib/client/endpoints/user.endpoint'
import tokenService from '@/services/TokenService'

interface SettingsForm {
  email?: string
  password?: string
  image?: string
  username?: string
  bio?: string
}
const SettingsPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { handleSubmit, register, setValue } = useForm<SettingsForm>({})
  const { mutate, isLoading } = useMutation(putUser, {
    onSuccess: (data) => {
      tokenService.set(data.user.token)
      navigate('/profile')
    },
  })

  useEffect(() => {
    if (user === undefined) return
    setValue('bio', user?.bio)
    setValue('email', user?.email)
    setValue('username', user?.username)
    setValue('image', user?.image)
  }, [setValue, user, user?.bio, user?.email, user?.image, user?.username])

  const submit = async (data: SettingsForm) => {
    mutate({
      user: {
        bio: data.bio,
        email: data.email,
        image: data.image,
        username: data.username,
        password: data.password,
      },
    })
  }

  const logout = () => {
    tokenService.remove()
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={handleSubmit(submit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      readOnly={isLoading}
                      {...register('image')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      readOnly={isLoading}
                      {...register('username')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      readOnly={isLoading}
                      {...register('bio')}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      readOnly={isLoading}
                      {...register('email')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      readOnly={isLoading}
                      {...register('password')}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                className="btn btn-outline-danger"
                onClick={logout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SettingsPage
