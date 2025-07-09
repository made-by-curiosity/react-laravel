import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RootPage } from "./pages/Root";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootPage />
  </StrictMode>,
)
