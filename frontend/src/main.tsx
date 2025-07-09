import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RootPage } from "./pages/Root";
import { UserProvider } from './context/UserContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RootPage />
    </UserProvider>
  </StrictMode>,
)
