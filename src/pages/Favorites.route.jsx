import Favorites from '@/pages/Favorites'

export default {
  path: 'favorites',
  Component: Favorites,
  layout: 'main',
  nav: { label: 'Избранное', order: 100, push: true },
}
