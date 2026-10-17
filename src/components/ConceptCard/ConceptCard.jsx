import './Card.scss'
import clsx from 'clsx'
import getAsset from '@/utils/getAsset'

export default function ConceptCard({
  card,
  isSelected = false,
  isSelectionMode = false,
  isFavorite = false,
  onOpen,
  onToggleSelect,
  onToggleFavorite,
}) {
  const stop = (handler) => (e) => {
    e.stopPropagation()
    handler(card.id)
  }

  // Ctrl/Cmd/Shift+клик или любой клик в режиме выбора — выбор, иначе — открыть окно
  const handleClick = (e) => {
    if (onToggleSelect && (e.ctrlKey || e.metaKey || e.shiftKey || isSelectionMode)) {
      onToggleSelect(card.id)
    } else {
      onOpen(card.id)
    }
  }

  const handleKeyDown = (e) => {
    if (e.target !== e.currentTarget) {return}
    if (e.key === 'Enter') {
      e.preventDefault()
      onOpen(card.id)
    }
    if (e.key === ' ' && onToggleSelect) {
      e.preventDefault()
      onToggleSelect(card.id)
    }
  }

  return (
    <article
      className={clsx('card', isSelected && 'is-selected')}
      data-js-concepts-card
      tabIndex={0}
      aria-label={card.title}
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {card.image ? (
        <img
          className="card-image"
          src={getAsset(card.image)}
          alt={card.title}
          loading="lazy"
        />
      ) : (
        <div className="card-image card-image--empty" aria-hidden="true" />
      )}

      {onToggleSelect && (
        <button
          className={clsx('card-select', isSelected && 'is-active')}
          type="button"
          aria-label={isSelected ? 'Снять выбор' : 'Выбрать'}
          aria-pressed={isSelected}
          onClick={stop(onToggleSelect)}
        >
          {isSelected ? '✓' : ''}
        </button>
      )}

      <button
        className={clsx('card-favorite', isFavorite && 'is-active')}
        type="button"
        aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
        aria-pressed={isFavorite}
        data-fav-id={card.id}
        onClick={stop(onToggleFavorite)}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1555 0C10.1995 0 8.7424 3.08387 8.7424 3.08387C8.7424 3.08387 7.28533 0 4.32931 0C1.92697 0 -0.0004826 1.63424 9.06402e-08 4.66483C0.000482782 7.69542 4.3589 13.8129 8.7424 16.9613C8.88856 16.9613 9.03135 16.9148 9.1522 16.8278C13.5352 13.6794 16.9991 7.13097 17 4.66483C17.0009 2.19869 15.5578 0 13.1555 0Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className="card-overlay">
        <h3 className="card-title">{card.title}</h3>
        {card.features && card.features.length > 0 && (
          <ul className="card-list">
            {card.features.map((feature, index) => (
              <li key={index} className="card-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.70071 15.586L6.50639 12.293L5.13477 13.707L9.70071 18.414L19.1168 8.70697L17.7452 7.29297L9.70071 15.586Z"
                    fill="white"
                  />
                </svg>{' '}
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
