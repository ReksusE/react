import getAsset from '@/utils/getAsset'

const FIELDS = [
  ['category', 'Назначение'],
  ['fuel', 'Топливо'],
  ['style', 'Стиль'],
  ['glass', 'Стекло'],
  ['material', 'Материал'],
]

export default function ConceptDetails({
  concept,
  isFavorite = false,
  onEdit,
  onDelete,
  onToggleFavorite,
}) {
  return (
    <div className="concept-details">
      {concept.image && (
        <img
          className="concept-details__image"
          src={getAsset(concept.image)}
          alt={concept.title}
        />
      )}

      <div className="concept-details__body">
        <h3 className="concept-details__title">{concept.title}</h3>

        <dl className="concept-details__list">
          {FIELDS.map(([key, label]) =>
            concept[key] ? (
              <div className="concept-details__row" key={key}>
                <dt>{label}</dt>
                <dd>{concept[key]}</dd>
              </div>
            ) : null
          )}
        </dl>

        {concept.features?.length > 0 && (
          <ul className="concept-details__tags">
            {concept.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}

        {concept.description && (
          <p className="concept-details__text">{concept.description}</p>
        )}

        <div className="concept-details__actions">
          <button
            type="button"
            className="concept-btn"
            onClick={() => onToggleFavorite(concept.id)}
          >
            {isFavorite ? 'Убрать из избранного' : 'В избранное'}
          </button>
          {onEdit && (
            <button
              type="button"
              className="concept-btn"
              onClick={() => onEdit(concept)}
            >
              Редактировать
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="concept-btn concept-btn--danger"
              onClick={() => onDelete(concept)}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
