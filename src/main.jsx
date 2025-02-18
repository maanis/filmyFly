import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';


createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MantineProvider>
)
