import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import './assets/css/index.css'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <TawkMessengerReact
      propertyId={import.meta.env.VITE_TAWK_CHAT_ID}
      widgetId="default"
    />
  </>
)
