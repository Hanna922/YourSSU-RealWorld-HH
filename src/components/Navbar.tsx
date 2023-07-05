import { Link, useNavigate } from 'react-router-dom'

import { useUser } from '@/hooks/useUser'

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, isLogin } = useUser()

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
        >
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li
            className="nav-item"
            onClick={() => navigate('/')}
          >
            <Link
              className="nav-link active"
              to="/"
            >
              Home
            </Link>
          </li>
          {isLogin ? (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/create"
              >
                {' '}
                <i className="ion-compose"></i>&nbsp;New Article{' '}
              </Link>
            </li>
          ) : (
            <></>
          )}
          {isLogin ? (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/settings"
              >
                {' '}
                <i className="ion-gear-a"></i>&nbsp;Settings{' '}
              </Link>
            </li>
          ) : (
            <></>
          )}
          {isLogin ? (
            <></>
          ) : (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
              >
                Sign in
              </Link>
            </li>
          )}
          {isLogin ? (
            <></>
          ) : (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/register"
              >
                Sign up
              </Link>
            </li>
          )}
          {isLogin ? (
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/@${user?.username}`}
              >
                {' '}
                <img
                  className="user-pic"
                  src={user?.image}
                />
                {user?.username}
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  )
}
