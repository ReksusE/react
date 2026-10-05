import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Concepts from '@/pages/Concepts'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="concepts" element={<Concepts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
