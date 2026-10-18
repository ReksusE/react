import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import getAsset from '@/utils/getAsset'
import { useRatings } from '@/context/RatingsContext'

export default function ConceptCard({
  card,
  isSelected = false,
  isSelectionMode = false,
  isFavorite = false,
  onOpen,
  onToggleSelect,
  onToggleFavorite,
}) {
  const { getSummary } = useRatings()
  const { average, count } = getSummary(card.id)

  // Ctrl/Cmd/Shift+клик или любой клик в режиме выбора — выбор, иначе — открыть окно
  const handleClick = (e) => {
    if (onToggleSelect && (e.ctrlKey || e.metaKey || e.shiftKey || isSelectionMode)) {
      onToggleSelect(card.id)
    } else {
      onOpen(card.id)
    }
  }

  return (
    <Card
      data-js-concepts-card
      variant="outlined"
      sx={{
        position: 'relative',
        height: '100%',
        borderColor: isSelected ? 'primary.main' : 'divider',
        borderWidth: isSelected ? 2 : 1,
      }}
    >
      <CardActionArea onClick={handleClick} aria-label={card.title}>
        {card.image ? (
          <CardMedia
            component="img"
            image={getAsset(card.image)}
            alt={card.title}
            loading="lazy"
            sx={{
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              filter: isSelected ? 'brightness(0.65)' : 'none',
            }}
          />
        ) : (
          <Box sx={{ aspectRatio: '3 / 4', bgcolor: 'background.paper' }} aria-hidden="true" />
        )}

        <CardContent>
          <Typography variant="subtitle1" component="h3" noWrap sx={{ fontWeight: 700 }}>
            {card.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ my: 0.5 }}>
            <Rating value={average} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              {count ? `${average.toFixed(1)} (${count})` : 'нет оценок'}
            </Typography>
          </Stack>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.5}>
            {(card.features ?? []).slice(0, 3).map((feature) => (
              <Chip key={feature} label={feature} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>

      {onToggleSelect && (
        <Tooltip title={isSelected ? 'Снять выбор' : 'Выбрать для сравнения'}>
          <Checkbox
            checked={isSelected}
            onChange={() => onToggleSelect(card.id)}
            slotProps={{ input: { 'aria-label': isSelected ? 'Снять выбор' : 'Выбрать' } }}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'rgba(0, 0, 0, 0.45)',
              borderRadius: 1,
              p: 0.5,
              color: 'common.white',
            }}
          />
        </Tooltip>
      )}

      <Tooltip title={isFavorite ? 'Убрать из избранного' : 'В избранное'}>
        <IconButton
          aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
          aria-pressed={isFavorite}
          data-fav-id={card.id}
          onClick={() => onToggleFavorite(card.id)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(0, 0, 0, 0.45)',
            color: isFavorite ? 'error.main' : 'common.white',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.65)' },
          }}
        >
          {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Card>
  )
}
