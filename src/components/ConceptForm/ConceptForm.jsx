import { useEffect, useState } from 'react'

import './ConceptForm.scss'

export default function ConceptForm({ concept, defaultImage, onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [fuel, setFuel] = useState('')
  const [style, setStyle] = useState('')
  const [glass, setGlass] = useState('')
  const [material, setMaterial] = useState('')
  const [features, setFeatures] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(defaultImage || '')

  useEffect(() => {
    setTitle(concept?.title || '')
    setCategory(concept?.category || '')
    setFuel(concept?.fuel || '')
    setStyle(concept?.style || '')
    setGlass(concept?.glass || '')
    setMaterial(concept?.material || '')
    setFeatures(concept?.features?.join(', ') || '')
    setDescription(concept?.description || '')
    setImage(concept?.image || defaultImage || '')
  }, [concept, defaultImage])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    onSave({
      title: trimmedTitle,
      category: category.trim(),
      fuel: fuel.trim(),
      style: style.trim(),
      glass: glass.trim(),
      material: material.trim(),
      features: features
        .split(',')
        .map((feature) => feature.trim())
        .filter(Boolean),
      description: description.trim(),
      image: image.trim(),
    })
  }

  return (
    <div className="concept-form">
      <div className="concept-form__header">
        <h3 className="concept-form__title">
          {concept ? 'Редактировать концепт' : 'Добавить концепт'}
        </h3>
        <button
          className="concept-form__close"
          type="button"
          onClick={onCancel}
          aria-label="Закрыть форму"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="concept-form__grid">
          <label className="concept-form__field">
            <span>Название</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label className="concept-form__field">
            <span>Категория</span>
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </label>

          <label className="concept-form__field">
            <span>Топливо</span>
            <input
              value={fuel}
              onChange={(event) => setFuel(event.target.value)}
            />
          </label>

          <label className="concept-form__field">
            <span>Стиль</span>
            <input
              value={style}
              onChange={(event) => setStyle(event.target.value)}
            />
          </label>

          <label className="concept-form__field">
            <span>Стекло</span>
            <input
              value={glass}
              onChange={(event) => setGlass(event.target.value)}
            />
          </label>

          <label className="concept-form__field">
            <span>Материал</span>
            <input
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
            />
          </label>

          <label className="concept-form__field concept-form__field--wide">
            <span>Особенности через запятую</span>
            <input
              value={features}
              onChange={(event) => setFeatures(event.target.value)}
              placeholder="экологичное, компактность, стиль"
            />
          </label>

          <label className="concept-form__field concept-form__field--wide">
            <span>Описание</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="3"
            />
          </label>

          <label className="concept-form__field concept-form__field--wide">
            <span>Путь к изображению</span>
            <input
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </label>
        </div>

        <div className="concept-form__actions">
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
          <button type="submit">
            {concept ? 'Сохранить изменения' : 'Добавить концепт'}
          </button>
        </div>
      </form>
    </div>
  )
}
