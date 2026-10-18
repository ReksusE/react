import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

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

  const setValue = (key, value) => setValues((prev) => ({ ...prev, [key]: value ?? '' }))

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
    <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate sx={{ pt: 1 }}>
      <TextField
        label="Название"
        required
        value={values.title}
        onChange={(e) => {
          setValue('title', e.target.value)
          setError('')
        }}
        error={Boolean(error)}
        helperText={error}
      />

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
        {SELECT_FIELDS.map(([key, label]) => (
          <Autocomplete
            key={key}
            freeSolo
            options={unique(existing, key)}
            inputValue={values[key]}
            onInputChange={(_, value) => setValue(key, value)}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        ))}
      </Box>

      <TextField
        label="Изображение (путь или URL)"
        value={values.image}
        onChange={(e) => setValue('image', e.target.value)}
        placeholder="/src/assets/images/concepts/concepts-1.png"
      />
      <TextField
        label="Особенности (через запятую)"
        value={values.features}
        onChange={(e) => setValue('features', e.target.value)}
      />
      <TextField
        label="Описание"
        multiline
        minRows={4}
        value={values.description}
        onChange={(e) => setValue('description', e.target.value)}
      />

      <Stack direction="row" spacing={1}>
        <Button type="submit" variant="contained">
          {initial ? 'Сохранить' : 'Добавить'}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Отмена
        </Button>
      </Stack>
    </Stack>
  )
}
