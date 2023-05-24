import { BrowserRouter } from 'react-router-dom'
import { IndexRouter } from './router'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
