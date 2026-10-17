import Auth from '@/sections/Auth'
import usePageTitle from '@/hooks/usePageTitle'

export default function AuthorizationPage() {
  usePageTitle('Вход / Регистрация')

  return <Auth />
}
