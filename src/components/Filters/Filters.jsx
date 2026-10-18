import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import filtersData from '@/data/filters.json'

/** Фильтры каталога (MUI Select). Значение фильтра — название выбранной опции. */
export default function Filters({ values = {}, onFilterChange, onReset }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      {filtersData.map((filter) => {
        const labelId = `filter-${filter.key}-label`

        return (
          <FormControl key={filter.key} size="small" sx={{ minWidth: 200, flex: '1 1 180px' }}>
            <InputLabel id={labelId}>{filter.title}</InputLabel>
            <Select
              labelId={labelId}
              label={filter.title}
              value={values[filter.key] ?? ''}
              onChange={(e) => onFilterChange(filter.key, e.target.value || null)}
            >
              <MenuItem value="">
                <em>Любое</em>
              </MenuItem>
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      })}

      <Button variant="outlined" onClick={onReset}>
        Сбросить
      </Button>
    </Box>
  )
}
