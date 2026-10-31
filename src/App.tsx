import { Route, Routes } from 'react-router'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import ChapterPage from './pages/ChapterPage.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chapter/:slug" element={<ChapterPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
