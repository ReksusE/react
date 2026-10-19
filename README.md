# 🧱 Friendly Frontend Starter

Стартер для современных фронтенд-проектов на базе [Minista](https://minista.qranoko.jp/) с поддержкой JSX (без React), SCSS, линтинга и автоформатирования.

## 🚀 Быстрый старт

Создайте проект с помощью `npm create`:

```bash
npm create friendly-frontend@latest
```

Для TypeScript-версии добавьте флаг `--ts`:

```bash
npm create friendly-frontend@latest -- --ts
```

## 📦 Что внутри

Стартер включает:

- [Minista](https://minista.qranoko.jp/) с поддержкой JSX без React
- Сборка через [Vite](https://vite.dev/)
- Стили:
  - [SCSS](https://sass-lang.com/)
  - [PostCSS](https://postcss.org/) + плагины: [`preset-env`](https://www.npmjs.com/package/postcss-preset-env), [`pxtorem`](https://www.npmjs.com/package/postcss-pxtorem)
  - CSS Normalize: [`@a1rth/css-normalize`](https://www.npmjs.com/package/@a1rth/css-normalize)
  - Утилитарные миксины и функции в `src/styles/helpers`
- Полезные зависимости:
  - [`clsx`](https://www.npmjs.com/package/clsx) — удобное объединение CSS-классов
  - [`imask`](https://www.npmjs.com/package/imask) — маски для полей ввода
- Линтинг и форматирование:
  - [`ESLint`](https://eslint.org/), [`Stylelint`](https://stylelint.io/), [`Prettier`](https://prettier.io/)
  - Общая конфигурация: [`friendly-frontend-lint-config`](https://www.npmjs.com/package/friendly-frontend-lint-config)
- Удобства:
  - Алиасы через `jsconfig.json` (`@/ → src/`)
  - Готовая структура `src/` с компонентами, секциями, утилитами и layout’ами

## 🚀 Скрипты

```bash
npm run start         # Запуск в dev-режиме
npm run build         # Сборка
npm run preview       # Локальный просмотр сборки

npm run lint:js       # Проверка JS-кода
npm run lint:js:fix   # Автоисправление JS-кода
npm run lint:css      # Проверка CSS-кода
npm run lint:css:fix  # Автоисправление CSS-кода
npm run format        # Проверка форматирования
npm run format:fix    # Форматирование
npm run lint          # Полная проверка кода и форматирования без исправлений
npm run lint:fix      # Полная проверка с автоисправлением и форматированием
```

## ⚙️ Структура проекта

```csharp
├── public/               # Статичные файлы, не обрабатываемые сборщиком
├── src/
│   ├── assets/           # Изображения, иконки, фавиконки и шрифты
│   │   ├── favicons/     # Фавиконки для сайта
│   │   ├── fonts/        # Подключаемые шрифты (woff2 и пр.)
│   │   ├── icons/        # SVG-иконки (для спрайта)
│   │   └── images/       # Остальные изображения
│   │
│   ├── components/       # Мелкие переиспользуемые компоненты (Button, Input и т.п.)
│   ├── constants/        # Константы, enum’ы, конфиги, словари и пр.
│   ├── layouts/          # Структурные компоненты страницы (Header, Content, Section, Footer)
│   ├── modules/          # JavaScript-модули (например: OverlayMenu, InputMaskCollection)
│   ├── pages/            # Файлы страниц (Minista сам роутит всё отсюда)
│   ├── sections/         # Переиспользуемые секции страниц (Hero, About, Features и пр.)
│   ├── styles/           # Общие стили проекта (переменные, миксины, сбросы)
│   ├── utils/            # Утилитарные функции (например: pxToRem, debounce)
│   ├── global.jsx        # Общий layout для всех страниц (Minista Feature)
│   └── main.js           # Точка входа JavaScript-логики, запускающейся в браузере
│
├── .gitignore             # Список файлов и папок, игнорируемых Git
├── .prettierignore        # Список файлов и папок, игнорируемых Prettier
├── eslint.config.js       # Конфигурация ESLint (проверка JS/JSX-кода)
├── jsconfig.json          # Настройки путей и автодополнения для JS (используется IDE и сборщиком)
├── minista.config.js      # Конфигурация Minista
├── package.json           # Зависимости проекта, скрипты, метаинформация
├── package-lock.json      # Зафиксированные версии всех установленных пакетов
├── postcss.config.js      # Конфигурация PostCSS (preset-env, pxtorem и пр.)
├── prettier.config.js     # Настройки автоформатирования кода (Prettier)
├── README.md              # Документация по проекту (вы сейчас её читаете)
└── stylelint.config.js    # Конфигурация Stylelint (проверка CSS/SCSS)
```

## 🧠 Что особенно удобно

- JSX без React — почти как HTML, но мощнее: можно вставлять JS и выносить куски разметки в отдельные файлы
- [Vite](https://vite.dev/) под капотом — [Minista](https://minista.qranoko.jp/) использует [Vite](https://vite.dev/) как сборщик, так что всё быстро, современно и с поддержкой HMR
- Компонент `Icon` с автонастройкой цвета. Поверх встроенного `<Icon>` реализован `src/components/Icon.jsx`, который: прокидывает `fill`, `stroke` и использует `currentColor`, чтобы цвет SVG-иконки подстраивался под цвет текста и корректно работал как с fill, так и со stroke-иконками.
- Мощные Sass-хелперы — в `src/styles/helpers/` лежат:
  - функции (`fluid`, `fluid-to-laptop`)
  - миксины для медиа-запросов (`mobile`, `mobile-above`, `hover` и т. п.)
  - переменные и константы
  - Утилитарные CSS-классы — для типовых задач:
    - `.container`
    - `.visually-hidden`
    - `.visible-tablet`, `.hidden-tablet`
    - `.visible-mobile`, `.hidden-mobile`

## 📚 Документация Minista

Если вы не знакомы с Minista — обязательно загляните в официальную документацию:

> 🔗 https://minista.qranoko.jp/docs/

Рекомендуем к прочтению:

- 📄 Конфигурация Minista — `minista.config.js`
  - https://minista.qranoko.jp/docs/config-file
- 🧱 Глобальный layout — `src/global.jsx`
  - https://minista.qranoko.jp/docs/global
- 🧾 Метаданные страниц — переменная `metadata` в `src/pages/**.jsx`
  - https://minista.qranoko.jp/docs/metadata
- 🧠 Компонент `<Head>` — для добавления `<meta>`, `<title>` и прочего
  - https://minista.qranoko.jp/docs/head
- 🖼 Компонент `<Image>` — для оптимизированной загрузки изображений
  - https://minista.qranoko.jp/docs/image
- 🧩 Компонент `<Icon>` — SVG-спрайт и иконки
  - https://minista.qranoko.jp/docs/svg-sprite-icon
    > ☝️ В нашем шаблоне поверх встроенного `<Icon>` реализован компонент-обёртка `src/components/Icon.jsx`.
    > Он автоматически прокидывает нужные атрибуты (`fill`, `stroke`) и использует `currentColor` —
    > чтобы удобно управлять цветом иконки через CSS, независимо от оригинальной реализации SVG.

## 📝 Советы

Для TypeScript-версии используйте `npm create friendly-frontend@latest -- --ts`

## ❓ FAQ

### Почему используется JSX без React?

Благодаря Minista. Это позволяет использовать знакомый синтаксис, но без нагрузки от React — идеально для статичных и маркетинговых сайтов.

### Это можно развернуть на Netlify/Vercel?

Да. Это обычная статика — после `npm run build` можно деплоить куда угодно.

## Обратная связь

Если нашли баг или хотите предложить улучшение — открывайте issue или присылайте pull request.

GitHub: https://github.com/aleksanderlamkov/friendly-frontend-starter

## Лицензия

MIT

---

**Автор:** [Александр Ламков](https://www.youtube.com/@AleksanderLamkov)

## 🧩 Лабораторная работа № 6: MUI

- Библиотека компонентов: **Material UI** (тема в `src/theme`, тёмная/светлая, палитра совпадает с CSS-переменными).
- Используется 40+ различных компонентов MUI (Autocomplete, Table, Tabs, Stepper, Accordion, Rating, Pagination, Dialog, Snackbar и др.).
- Новые страницы: `/about`, `/contacts`, `/ratings`.
- Новые функции: поиск с автодополнением, сортировка и пагинация, оценки концептов (Rating), сравнение выбранных концептов, переключатель «Все / Избранные».
- **Расширяемость:** маршруты и пункты меню собираются из файлов `src/pages/*.route.jsx` (см. `src/app/registry.js`). Чтобы добавить страницу, достаточно создать компонент и route-файл — `App.jsx` и шапку менять не нужно.
