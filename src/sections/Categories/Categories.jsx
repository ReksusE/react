import './Categories.scss'
import CategoryCard from '@/components/CategoriesCard'

const categoriesData = [
  {
    id: 1,
    title: 'Загородный дом',
    image: '/src/assets/images/categories/categories-1.png',
    i18n: 'cat-country',
  },
  {
    id: 2,
    title: 'Городская квартира',
    image: '/src/assets/images/categories/categories-2.png',
    i18n: 'cat-city',
  },
  {
    id: 3,
    title: 'Общественные пространства',
    image: '/src/assets/images/categories/categories-3.png',
    i18n: 'cat-public',
  },
  {
    id: 4,
    title: 'Облицовка',
    image: '/src/assets/images/categories/categories-4.png',
    i18n: 'cat-facing',
  },
]

export default function Categories() {
  return (
    <>
      <section className="categories">
        <div className="categories__container container">
          <div className="categories__list">
            {categoriesData.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                image={cat.image}
                alt={cat.title}
                i18n={cat.i18n}
                delay={index + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
