import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App/App'
import './index.scss'
import store from './store'

const container = document.querySelector('.root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
