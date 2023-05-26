import { BrowserRouter } from 'react-router-dom'
import { IndexRouter } from './router'
import { BrowserRouter } from 'react-router-dom'

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