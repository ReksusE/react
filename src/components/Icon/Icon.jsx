import './Icon.scss'
import clsx from 'clsx'

// Все SVG из папки иконок как React-компоненты (см. svgr в vite.config.js)
const modules = import.meta.glob('/src/assets/icons/**/*.svg', {
  eager: true,
  query: '?react',
  import: 'default',
})

// Ключ — имя файла без папки и расширения (как iconId в спрайте minista)
const icons = Object.fromEntries(
  Object.entries(modules).map(([path, component]) => [
    path.split('/').pop().replace('.svg', ''),
    component,
  ])
)

export default function Icon(props) {
  const { className, name, hasFill = false, ariaLabel } = props

  const SvgIcon = icons[name]

  if (!SvgIcon) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Иконка "${name}" не найдена в src/assets/icons/**`)
    }
    return null
  }

  return (
    <span className={clsx('icon', className)} aria-label={ariaLabel}>
      <SvgIcon
        fill={hasFill ? 'currentColor' : 'none'}
        stroke={hasFill ? 'none' : 'currentColor'}
      />
    </span>
  )
}
