import { useNavigate } from 'react-router-dom'

import { useUser } from '@/hooks/useUser'

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, isLogin } = useUser()

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a
          className="navbar-brand"
          href="index.html"
        >
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li
            className="nav-item"
            onClick={() => navigate('/')}
          >
            <a
              className="nav-link active"
              href=""
            >
              Home
            </a>
          </li>
          {isLogin ? (
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
                onClick={() => navigate('/create')}
              >
                {' '}
                <i className="ion-compose"></i>&nbsp;New Article{' '}
              </a>
            </li>
          ) : (
            <></>
          )}
          {isLogin ? (
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
                onClick={() => navigate('/settings')}
              >
                {' '}
                <i className="ion-gear-a"></i>&nbsp;Settings{' '}
              </a>
            </li>
          ) : (
            <></>
          )}
          {isLogin ? (
            <></>
          ) : (
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
                onClick={() => navigate('/login')}
              >
                Sign in
              </a>
            </li>
          )}
          {isLogin ? (
            <></>
          ) : (
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
                onClick={() => navigate('/register')}
              >
                Sign up
              </a>
            </li>
          )}
          {isLogin ? (
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
                onClick={() => navigate('/profile')}
              >
                {' '}
                <img
                  className="user-pic"
                  src={user?.image}
                />
                {user?.username}
              </a>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  )
}
