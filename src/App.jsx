import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import RequireAuth from '@/components/RequireAuth'
import Home from '@/pages/Home'
import Concepts from '@/pages/Concepts'
import Favorites from '@/pages/Favorites'
import Authorization from '@/pages/Authorization'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="auth" element={<Authorization />} />
      <Route path="authorization" element={<Navigate to="/auth" replace />} />
      <Route
        path="admin"
        element={
          <RequireAuth role="admin">
            <Admin />
          </RequireAuth>
        }
      />

      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="concepts" element={<Concepts />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
