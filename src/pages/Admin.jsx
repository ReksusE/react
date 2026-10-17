import Admin from '@/sections/Admin'
import usePageTitle from '@/hooks/usePageTitle'

export default function AdminPage() {
  usePageTitle('Admin')

  return <Admin />
}
