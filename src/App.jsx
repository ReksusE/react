import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import MainLayout from '@/layouts/MainLayout'
import RequireAuth from '@/components/RequireAuth'
import NotFound from '@/pages/NotFound'
import { routes } from '@/app/registry'

const Loader = () => (
  <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
    <CircularProgress aria-label="Загрузка" />
  </Box>
)

const renderRoute = ({ index, path, Component, auth }) => {
  const page = <Component />
  const element = auth ? <RequireAuth role={auth.role}>{page}</RequireAuth> : page

  return <Route key={path ?? 'index'} index={index} path={path} element={element} />
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.filter((route) => route.layout === 'bare').map(renderRoute)}
        <Route path="authorization" element={<Navigate to="/auth" replace />} />

        <Route element={<MainLayout />}>
          {routes.filter((route) => route.layout !== 'bare').map(renderRoute)}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
