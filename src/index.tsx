import './styles/index.css'
import "./lib/dynamicImportErrorListener.ts"

import { Toaster } from 'sonner'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import AppRoutes from './routes/app.routes.tsx';
import ErrorBoundary from './components/errorBoundary/errorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster richColors />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
