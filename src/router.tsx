import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/CreatePage'
import SettingsPage from './pages/SettingsPage'
import ArticlePage from './pages/ArticlePage'
import RegisterPage from './pages/RegisterPage'

export const IndexRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
      />
      <Route
        path="/profile"
        element={<ProfilePage />}
      />
      <Route
        path="/create"
        element={<CreatePage />}
      />
      <Route
        path="/settings"
        element={<SettingsPage />}
      />
      <Route
        path="/article"
        element={<ArticlePage />}
      />
    </Routes>
  )
}
