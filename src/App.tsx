import { Routes, Route, BrowserRouter } from 'react-router-dom'

import ArticlePage from './pages/ArticlePage'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )
}

export default App
