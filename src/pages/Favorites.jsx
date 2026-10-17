import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import Favorites from '@/sections/Favorites'
import Showroom from '@/sections/Showroom'
import usePageTitle from '@/hooks/usePageTitle'
import { useAuth } from '@/context/AuthContext'

export default function FavoritesPage() {
  usePageTitle('Favorites')

  const { user } = useAuth()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Своя подборка — только для вошедших; по ссылке ?ids=… доступ открыт
  if (!user && !searchParams.get('ids')) {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  return (
    <>
      <Favorites />
      <Showroom />
    </>
  )
}
