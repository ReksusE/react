import '@/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { AuthProvider } from '@/context/AuthContext'
import { ConceptsProvider } from '@/context/ConceptsContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { RatingsProvider } from '@/context/RatingsContext'
import MuiProvider from '@/theme/MuiProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MuiProvider>
          <ToastProvider>
            <AuthProvider>
              <ConceptsProvider>
                <FavoritesProvider>
                  <RatingsProvider>
                    <App />
                  </RatingsProvider>
                </FavoritesProvider>
              </ConceptsProvider>
            </AuthProvider>
          </ToastProvider>
        </MuiProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
