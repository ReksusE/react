import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/layouts/Header'
import Content from '@/layouts/Content'
import Footer from '@/layouts/Footer'

export default function MainLayout() {
  const { pathname } = useLocation()

  // Прокрутка вверх при смене страницы
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
    </>
  )
}
