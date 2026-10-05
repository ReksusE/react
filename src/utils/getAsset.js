/**
 * Все картинки из src/assets — Vite отдаёт им корректные URL и в dev, и в build.
 */
const assets = import.meta.glob(
  '/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, query: '?url', import: 'default' }
)

/**
 * Возвращает URL ассета. Принимает пути в любом виде:
 * 'images/hero/bg.jpg', 'src/assets/images/hero/bg.jpg', '/src/assets/images/hero/bg.jpg'
 */
const getAsset = (path) => {
  if (!path) {return ''}

  const clean = path.replace(/^\/?(src\/assets\/)?/, '')
  const url = assets[`/src/assets/${clean}`]

  if (!url && import.meta.env.DEV) {
    console.warn(`[getAsset] Файл не найден: src/assets/${clean}`)
  }

  return url ?? path
}

export default getAsset
