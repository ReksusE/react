import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/layouts/Header'
import Content from '@/layouts/Content'
import Footer from '@/layouts/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
      <ThemeToggle floating />
    </>
  )
}
