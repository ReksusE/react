import './Card.scss'
import { Link } from 'react-router-dom'
import getAsset from '@/utils/getAsset'

export default function ConceptCard({ card }) {
  return (
    <article className="card" data-js-concepts-card>
      <img
        className="card-image"
        src={getAsset(card.image)}
        alt={card.title}
        loading="lazy"
      />
      <button
        className="card-favorite"
        type="button"
        aria-label="В избранное"
        data-fav-id={card.id}
      >
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.1555 0C10.1995 0 8.7424 3.08387 8.7424 3.08387C8.7424 3.08387 7.28533 0 4.32931 0C1.92697 0 -0.0004826 1.63424 9.06402e-08 4.66483C0.000482782 7.69542 4.3589 13.8129 8.7424 16.9613C8.88856 16.9613 9.03135 16.9148 9.1522 16.8278C13.5352 13.6794 16.9991 7.13097 17 4.66483C17.0009 2.19869 15.5578 0 13.1555 0Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div className="card-overlay">
        <Link to={`/project/${card.id}`} className="card-title-link">
          <h3 className="card-title">{card.title}</h3>
        </Link>
        {card.features && card.features.length > 0 && (
          <ul className="card-list">
            {card.features.map((feature, index) => (
              <li key={index} className="card-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.70071 15.586L6.50639 12.293L5.13477 13.707L9.70071 18.414L19.1168 8.70697L17.7452 7.29297L9.70071 15.586Z" fill="white"/>
                </svg> {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}