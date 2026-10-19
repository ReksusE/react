import { useState, useMemo, useCallback } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import Search from '@mui/icons-material/Search'
import Breadcrumbs from '@/components/Breadcrumbs'
import Filters from '@/components/Filters/Filters'
import ConceptCard from '@/components/ConceptCard'
import ConceptDetails from '@/components/ConceptDetails'
import ConceptForm from '@/components/ConceptForm'
import ConceptCompare from '@/components/ConceptCompare'
import Modal from '@/components/Modal'
import { ACTIONS } from '@/context/conceptsReducer'
import { useConcepts } from '@/context/ConceptsContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useRatings } from '@/context/RatingsContext'
import { useToast } from '@/context/ToastContext'

const PAGE_SIZE = 8

const SORTS = {
  default: 'По умолчанию',
  titleAsc: 'Название: А → Я',
  titleDesc: 'Название: Я → А',
  rating: 'По оценке',
}

const breadcrumbsItems = [
  { title: 'Главная', href: '/', i18n: 'nav-home' },
  { title: 'Концепты', href: '/concepts', i18n: 'nav-concepts' },
]

export default function Concepts() {
  const { items, selectedIds, dispatch } = useConcepts()
  const { isFavorite, toggleFavorite: toggleFav } = useFavorites()
  const { showToast } = useToast()
  const { getSummary } = useRatings()
  const [activeFilters, setActiveFilters] = useState({})
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [scope, setScope] = useState('all')
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  // modal: null | { mode: 'view' | 'edit' | 'create', id?: string }
  const [modal, setModal] = useState(null)

  const closeModal = useCallback(() => setModal(null), [])

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }))
    setPage(1)
  }

  const handleReset = () => {
    setActiveFilters({})
    setQuery('')
    setScope('all')
    setPage(1)
  }

  const filteredConcepts = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = items.filter(
      (concept) =>
        (scope === 'all' || isFavorite(concept.id)) &&
        (!q ||
          [concept.title, concept.description, ...(concept.features ?? [])].some((text) =>
            (text ?? '').toLowerCase().includes(q)
          )) &&
        Object.entries(activeFilters).every(
          ([key, value]) =>
            value === null || value === undefined || concept[key] === value
        )
    )

    const sorters = {
      titleAsc: (a, b) => a.title.localeCompare(b.title, 'ru'),
      titleDesc: (a, b) => b.title.localeCompare(a.title, 'ru'),
      rating: (a, b) => getSummary(b.id).average - getSummary(a.id).average,
    }

    return sorters[sort] ? [...result].sort(sorters[sort]) : result
  }, [items, activeFilters, query, scope, sort, isFavorite, getSummary])

  const pageCount = Math.max(1, Math.ceil(filteredConcepts.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visibleConcepts = filteredConcepts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const activeConcept = modal?.id
    ? items.find((item) => item.id === modal.id)
    : null

  const toggleSelect = useCallback(
    (id) => dispatch({ type: ACTIONS.TOGGLE_SELECT, id }),
    [dispatch]
  )

  const toggleFavorite = useCallback(
    (id) => {
      if (!toggleFav(id)) {
        showToast(
          'Войдите в аккаунт, чтобы добавлять концепты в избранное',
          'error'
        )
      }
    },
    [toggleFav, showToast]
  )

  const allVisibleSelected =
    filteredConcepts.length > 0 &&
    filteredConcepts.every((c) => selectedIds.includes(c.id))

  const toggleSelectAll = () =>
    dispatch(
      allVisibleSelected
        ? { type: ACTIONS.CLEAR_SELECTION }
        : { type: ACTIONS.SELECT_MANY, ids: filteredConcepts.map((c) => c.id) }
    )

  const handleDelete = (concept) => {
    if (!window.confirm(`Удалить концепт «${concept.title}»?`)) {return}

    dispatch({ type: ACTIONS.REMOVE, id: concept.id })
    showToast('Концепт удалён', 'success')
    closeModal()
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {return}
    if (!window.confirm(`Удалить выбранные концепты (${selectedIds.length})?`)) {
      return
    }

    dispatch({ type: ACTIONS.REMOVE_SELECTED })
    showToast('Выбранные концепты удалены', 'success')
  }

  const handleSubmit = (values) => {
    if (modal?.mode === 'create') {
      dispatch({ type: ACTIONS.ADD, payload: values })
      showToast('Концепт добавлен', 'success')
      closeModal()

      return
    }

    dispatch({ type: ACTIONS.UPDATE, payload: { ...values, id: modal.id } })
    showToast('Изменения сохранены', 'success')
    setModal({ mode: 'view', id: modal.id })
  }

  const modalTitle = {
    create: 'Новый концепт',
    edit: 'Редактирование концепта',
    view: activeConcept?.title,
  }[modal?.mode]

  const selectedConcepts = items.filter((item) => selectedIds.includes(item.id))

  return (
    <Box component="section" sx={{ pb: 6 }} data-js-concepts>
      <Container maxWidth="xl">
        <Breadcrumbs items={breadcrumbsItems} />

        <Stack spacing={3}>
          <Filters
            values={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <Autocomplete
              freeSolo
              sx={{ flex: 1 }}
              options={items.map((item) => item.title)}
              inputValue={query}
              onInputChange={(_, value) => {
                setQuery(value)
                setPage(1)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Поиск по названию, описанию, особенностям"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="concept-sort-label">Сортировка</InputLabel>
              <Select
                labelId="concept-sort-label"
                label="Сортировка"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {Object.entries(SORTS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ToggleButtonGroup
              exclusive
              size="small"
              value={scope}
              onChange={(_, value) => value && (setScope(value), setPage(1))}
              aria-label="Какие концепты показывать"
            >
              <ToggleButton value="all">Все</ToggleButton>
              <ToggleButton value="favorites">Избранные</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack
            direction="row"
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
            spacing={1}
            role="toolbar"
            aria-label="Действия"
          >
            <Button variant="contained" onClick={() => setModal({ mode: 'create' })}>
              + Добавить концепт
            </Button>
            <Button
              variant="outlined"
              onClick={toggleSelectAll}
              disabled={filteredConcepts.length === 0}
            >
              {allVisibleSelected ? 'Снять выбор' : 'Выбрать все'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsCompareOpen(true)}
              disabled={selectedIds.length < 2}
            >
              Сравнить ({selectedIds.length})
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
            >
              Удалить выбранные ({selectedIds.length})
            </Button>
            <Typography variant="body2" color="text.secondary" aria-live="polite">
              Всего: {items.length} · Показано: {filteredConcepts.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ctrl/⌘ + клик — выбрать несколько карточек
            </Typography>
          </Stack>

          {filteredConcepts.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
              Концепты не найдены
            </Typography>
          ) : (
            <Grid container spacing={3} data-js-concepts-grid>
              {visibleConcepts.map((concept) => (
                <Grid key={concept.id} size={{ xs: 6, md: 4, lg: 3 }}>
                  <ConceptCard
                    card={concept}
                    isSelected={selectedIds.includes(concept.id)}
                    isSelectionMode={selectedIds.length > 0}
                    isFavorite={isFavorite(concept.id)}
                    onOpen={(id) => setModal({ mode: 'view', id })}
                    onToggleSelect={toggleSelect}
                    onToggleFavorite={toggleFavorite}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={(_, value) => setPage(value)}
              color="primary"
              sx={{ alignSelf: 'center' }}
            />
          )}
        </Stack>
      </Container>

      <ConceptCompare
        concepts={selectedConcepts}
        isOpen={isCompareOpen && selectedConcepts.length >= 2}
        onClose={() => setIsCompareOpen(false)}
      />

      <Modal
        isOpen={
          Boolean(modal) && (modal.mode === 'create' || Boolean(activeConcept))
        }
        title={modalTitle}
        onClose={closeModal}
      >
        {modal?.mode === 'view' && activeConcept && (
          <ConceptDetails
            concept={activeConcept}
            isFavorite={isFavorite(activeConcept.id)}
            onEdit={(c) => setModal({ mode: 'edit', id: c.id })}
            onDelete={handleDelete}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {modal?.mode === 'edit' && activeConcept && (
          <ConceptForm
            initial={activeConcept}
            existing={items}
            onSubmit={handleSubmit}
            onCancel={() => setModal({ mode: 'view', id: modal.id })}
          />
        )}
        {modal?.mode === 'create' && (
          <ConceptForm
            existing={items}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </Box>
  )
}
