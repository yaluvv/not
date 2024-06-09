import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import WebApp from '@twa-dev/sdk'
import './index.css'


WebApp.ready();
WebApp.expand()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <App />

<Analytics/>
<SpeedInsights/>
  
  </React.StrictMode>
  
)
