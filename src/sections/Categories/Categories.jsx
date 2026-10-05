import './Categories.scss'
import CategoryCard from '@/components/CategoriesCard'
import categoriesData from '@/data/categories.json'
import getAsset from '@/utils/getAsset'

export default function Categories() {
  return (
    <section className="categories">
      <div className="categories__container container">
        <div className="categories__list">
          {categoriesData.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              image={getAsset(cat.image)}
              alt={cat.title}
              i18n={cat.i18n}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}