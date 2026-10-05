import { Link } from 'react-router-dom'
import usePageTitle from '@/hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Not found')

  return (
    <>
      <h1>Page not found</h1>
      <Link className="button" to="/">
        Home
      </Link>
    </>
  )
}
