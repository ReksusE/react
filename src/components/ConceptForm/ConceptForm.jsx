import { useState } from 'react'

const SELECT_FIELDS = [
  ['category', 'Назначение очага'],
  ['fuel', 'Вид топлива'],
  ['style', 'Стиль'],
  ['glass', 'Стекло'],
  ['material', 'Материал'],
]

const EMPTY = {
  title: '',
  category: '',
  fuel: '',
  style: '',
  glass: '',
  material: '',
  image: '',
  features: '',
  description: '',
}

const unique = (items, key) => [
  ...new Set(items.map((item) => item[key]).filter(Boolean)),
]

export default function ConceptForm({ initial, existing, onSubmit, onCancel }) {
  const [values, setValues] = useState(() =>
    initial
      ? { ...EMPTY, ...initial, features: (initial.features || []).join(', ') }
      : EMPTY
  )
  const [error, setError] = useState('')

  const setField = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!values.title.trim()) {
      setError('Укажите название концепта')
      return
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
      features: values.features
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })
  }

  return (
    <form className="concept-form" onSubmit={handleSubmit} noValidate>
      <label className="concept-form__field">
        <span>Название *</span>
        <input
          value={values.title}
          onChange={setField('title')}
          autoFocus
          aria-invalid={Boolean(error)}
        />
        {error && <small className="concept-form__error">{error}</small>}
      </label>

      <div className="concept-form__grid">
        {SELECT_FIELDS.map(([key, label]) => (
          <label className="concept-form__field" key={key}>
            <span>{label}</span>
            <input
              list={`concept-${key}-options`}
              value={values[key]}
              onChange={setField(key)}
            />
            <datalist id={`concept-${key}-options`}>
              {unique(existing, key).map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
        ))}
      </div>

      <label className="concept-form__field">
        <span>Изображение (путь или URL)</span>
        <input
          value={values.image}
          onChange={setField('image')}
          placeholder="/src/assets/images/concepts/concepts-1.png"
        />
      </label>

      <label className="concept-form__field">
        <span>Особенности (через запятую)</span>
        <input value={values.features} onChange={setField('features')} />
      </label>

      <label className="concept-form__field">
        <span>Описание</span>
        <textarea
          rows="4"
          value={values.description}
          onChange={setField('description')}
        />
      </label>

      <div className="concept-form__actions">
        <button type="submit" className="concept-btn concept-btn--primary">
          {initial ? 'Сохранить' : 'Добавить'}
        </button>
        <button type="button" className="concept-btn" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}
