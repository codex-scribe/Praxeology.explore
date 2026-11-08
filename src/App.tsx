import { Route, Routes } from 'react-router'
import NotFound from './NotFound.tsx'
import ChapterPage from './outline/ChapterPage.tsx'
import OutlineHome from './outline/OutlineHome.tsx'
import OutlineLayout from './outline/OutlineLayout.tsx'
import SectionPage from './outline/SectionPage.tsx'
import Prologue from './prologue/Prologue.tsx'

export default function App() {
  return (
    <Routes>
      {/* The main experience. */}
      <Route index element={<Prologue />} />

      {/* The working outline: section-by-section drafts and figures. */}
      <Route path="outline" element={<OutlineLayout />}>
        <Route index element={<OutlineHome />} />
        <Route path="chapter/:slug" element={<ChapterPage />} />
        <Route path="chapter/:slug/:section" element={<SectionPage />} />
      </Route>

      <Route element={<OutlineLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
