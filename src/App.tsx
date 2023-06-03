import { ReactQueryDevtools } from 'react-query/devtools'
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

      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
      />
    </div>
  )
}

export default App
