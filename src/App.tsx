import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth'
import { ThemeConfig } from './config/theme-config'
import { NotificationProvider } from './context/Notification.context'
import { URLSProvider } from './context/URLs.context'
import { AppRouter } from './Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
        <ThemeConfig>
          <NotificationProvider>
            <URLSProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </URLSProvider>
          </NotificationProvider>
        </ThemeConfig>
      </AuthProvider>
  )
}

export default App
