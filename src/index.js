import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'
import './index.scss'
import { store } from './store'
import { Provider } from 'react-redux'


const container = document.querySelector('.root')
const root = createRoot(container)
root.render(
    
    <Provider store={store}>
        <App />
    </Provider>   

)
