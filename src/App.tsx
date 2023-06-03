import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { IndexRouter } from './router'

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <IndexRouter />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
