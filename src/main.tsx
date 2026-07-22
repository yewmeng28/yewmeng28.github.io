import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ThemeContextProvider} from "./context/ThemeContext.tsx";
import App from "./App.tsx";
import "@fontsource/inter";
import "@fontsource/kameron";
import "@fontsource/geomini";
import "@fontsource/merriweather";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
)
