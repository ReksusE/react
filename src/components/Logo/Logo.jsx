import './Logo.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export default function Logo(props) {
  const { className, loading = 'lazy' } = props

  const title = 'Home'

  return (
    <Link
      className={clsx('logo', className)}
      to="/"
      title={title}
      aria-label={title}
    >
      <img
        className="logo__image"
        src="/images/logo.svg"
        alt=""
        width={161}
        height={140}
        loading={loading}
      />
    </Link>
  )
}
