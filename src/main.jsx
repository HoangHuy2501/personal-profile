import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,HashRouter } from 'react-router-dom'
import { LanguageProvider } from "./hook/useLanguage.jsx";
import { ThemeProvider } from './hook/useLightDark.jsx';
import AntdThemeWrapper from "./hook/AntdThemeWrapper.jsx";
import './index.css'
import "antd/dist/reset.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <AntdThemeWrapper>
      <HashRouter>
        <App />
      </HashRouter>
      </AntdThemeWrapper>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
)
