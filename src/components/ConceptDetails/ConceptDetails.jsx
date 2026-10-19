import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import getAsset from '@/utils/getAsset'
import { useRatings } from '@/context/RatingsContext'
import { useToast } from '@/context/ToastContext'

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
  const { getSummary, getUserRating, rate } = useRatings()
  const { showToast } = useToast()
  const { average, count } = getSummary(concept.id)

  const handleRate = (_, value) => {
    if (!rate(concept.id, value)) {
      showToast('Войдите в аккаунт, чтобы оценивать концепты', 'error')
    }
  }

  return (
    <Box
      className="concept-details"
      sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}
    >
      {concept.image && (
        <Box
          component="img"
          src={getAsset(concept.image)}
          alt={concept.title}
          sx={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', borderRadius: 1 }}
        />
      )}

      <Stack spacing={2}>
        <Typography variant="h3" component="h3" sx={{ textTransform: 'uppercase' }}>
          {concept.title}
        </Typography>

        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating
              name={`rating-${concept.id}`}
              value={getUserRating(concept.id)}
              onChange={handleRate}
            />
            <Typography variant="body2" color="text.secondary">
              {count ? `Средняя: ${average.toFixed(1)} (${count})` : 'Оценок пока нет'}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Ваша оценка
          </Typography>
        </Stack>

        <Stack divider={<Divider flexItem />} spacing={1} component="dl" sx={{ m: 0 }}>
          {FIELDS.map(([key, label]) =>
            concept[key] ? (
              <Stack direction="row" justifyContent="space-between" key={key}>
                <Typography component="dt" color="text.secondary">
                  {label}
                </Typography>
                <Typography component="dd" sx={{ m: 0, textAlign: 'right' }}>
                  {concept[key]}
                </Typography>
              </Stack>
            ) : null
          )}
        </Stack>

        {concept.features?.length > 0 && (
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
            {concept.features.map((feature) => (
              <Chip key={feature} label={feature} color="primary" />
            ))}
          </Stack>
        )}

        {concept.description && <Typography>{concept.description}</Typography>}

        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
          <Button variant="outlined" onClick={() => onToggleFavorite(concept.id)}>
            {isFavorite ? 'Убрать из избранного' : 'В избранное'}
          </Button>
          {onEdit && (
            <Button variant="outlined" onClick={() => onEdit(concept)}>
              Редактировать
            </Button>
          )}
          {onDelete && (
            <Button variant="outlined" color="error" onClick={() => onDelete(concept)}>
              Удалить
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
