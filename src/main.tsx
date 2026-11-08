import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
// EB Garamond stands in for the book's Janson Text, which isn't freely licensed for the web.
import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'
import '@fontsource/eb-garamond/500.css'
import './index.css'
import App from './App.tsx'

// HashRouter so deep links work on GitHub Pages, which has no SPA fallback.
// Switch to BrowserRouter if the site moves to a host that rewrites unknown paths to index.html.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
