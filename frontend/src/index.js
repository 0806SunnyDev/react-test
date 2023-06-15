import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement) // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
