/**
 * Реестр страниц. Чтобы добавить новую страницу, достаточно создать файл
 * `src/pages/<Имя>.route.jsx` с описанием маршрута — App.jsx и меню в шапке
 * менять не нужно (приложение расширяется без правки исходной кодовой базы).
 *
 * Формат default-экспорта route-файла:
 * {
 *   path: 'portfolio',            // путь (или index: true для главной)
 *   Component: LazyOrPlainComponent,
 *   layout: 'main' | 'bare',      // main — с шапкой/подвалом, bare — без них
 *   auth: { role?: 'admin' },     // необязательно: защита маршрута
 *   nav: { label, order, push? }, // необязательно: пункт главного меню
 * }
 */
const modules = import.meta.glob('/src/pages/**/*.route.jsx', { eager: true })

export const routes = Object.values(modules)
  .map((module) => module.default)
  .filter(Boolean)

export const navItems = routes
  .filter((route) => route.nav)
  .map((route) => ({
    label: route.nav.label,
    href: route.index ? '/' : `/${route.path}`,
    order: route.nav.order ?? 100,
    push: Boolean(route.nav.push),
  }))
  .sort((a, b) => a.order - b.order)
