import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import WebApp from '@twa-dev/sdk'
import './index.css'
import '../public/tg.js'


WebApp.ready();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <body>
      
    <App />

    <script>
    window.Telegram.WebApp.isExpanded = true;
    window.Telegram.WebApp.expand();
    </script>
    </body>
   
  </React.StrictMode>,
)
