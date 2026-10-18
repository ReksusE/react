import './Favorites.scss'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import ConceptCard from '@/components/ConceptCard'
import ConceptDetails from '@/components/ConceptDetails'
import Modal from '@/components/Modal'
import { useConcepts } from '@/context/ConceptsContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useAuth } from '@/context/AuthContext'

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)

    return true
  } catch {
    return false
  }
}

export default function Favorites() {
  const { items } = useConcepts()
  const { user } = useAuth()
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const [openedId, setOpenedId] = useState(null)

  // ?ids=1,2,3 — подборка, которой с нами поделились
  const sharedIds = searchParams.get('ids')?.split(',').filter(Boolean)
  const isShared = Boolean(sharedIds)
  const ids = isShared ? sharedIds : favoriteIds

  const concepts = useMemo(
    () => ids.map((id) => items.find((item) => item.id === id)).filter(Boolean),
    [ids, items]
  )
  const opened = items.find((item) => item.id === openedId)

  const handleToggle = (id) => {
    if (!toggleFavorite(id)) {
      showToast('Войдите в аккаунт, чтобы добавлять концепты в избранное', 'error')
    }
  }

  const handleShare = async (e) => {
    e.preventDefault()

    if (favoriteIds.length === 0) {
      showToast('Сначала добавьте концепты в подборку', 'error')

      return
    }

    const url = `${window.location.origin}/favorites?ids=${favoriteIds.join(',')}`
    const copied = await copyToClipboard(url)

    showToast(copied ? 'Ссылка на подборку скопирована' : url, copied ? 'success' : 'info')
  }

  return (
    <section className="favorites">
      <div className="favorites__container container">
        <h1 className="favorites__title">
          {isShared ? 'Подборка ArtKante' : 'Моя подборка'}
        </h1>

        <div className="favorites__group">
          <div className="favorites__header">
            <span className="favorites__header-label">
              Проекты · {concepts.length}
            </span>
            {isShared ? (
              user && (
                <button
                  type="button"
                  className="favorites__header-share"
                  onClick={() => {
                    concepts.forEach(({ id }) => !isFavorite(id) && toggleFavorite(id))
                    showToast('Проекты добавлены в ваше избранное', 'success')
                  }}
                >
                  Добавить всё в избранное
                </button>
              )
            ) : (
              <a href="#" className="favorites__header-share" onClick={handleShare}>
                Поделиться этой подборкой
              </a>
            )}
          </div>

          {concepts.length === 0 ? (
            <div className="favorites__empty">
              <p>В подборке пока пусто.</p>
              <Link to="/concepts" className="concept-btn concept-btn--primary">
                Выбрать концепты
              </Link>
            </div>
          ) : (
            <Grid container spacing={3} className="favorites__grid">
              {concepts.map((concept) => (
                <Grid key={concept.id} size={{ xs: 6, md: 4, lg: 3 }}>
                  <ConceptCard
                    card={concept}
                    isFavorite={isFavorite(concept.id)}
                    onOpen={setOpenedId}
                    onToggleFavorite={handleToggle}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>

      <Modal
        isOpen={Boolean(opened)}
        title={opened?.title}
        onClose={() => setOpenedId(null)}
      >
        {opened && (
          <ConceptDetails
            concept={opened}
            isFavorite={isFavorite(opened.id)}
            onToggleFavorite={handleToggle}
          />
        )}
      </Modal>
    </section>
  )
}
