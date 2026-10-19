import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Modal from '@/components/Modal'
import { useRatings } from '@/context/RatingsContext'

const ROWS = [
  ['category', 'Назначение'],
  ['fuel', 'Топливо'],
  ['style', 'Стиль'],
  ['glass', 'Стекло'],
  ['material', 'Материал'],
]

const MAX_COMPARE = 4

/** Сравнение выбранных концептов в таблице (до 4 штук). */
export default function ConceptCompare({ concepts, isOpen, onClose }) {
  const { getSummary } = useRatings()
  const list = concepts.slice(0, MAX_COMPARE)

  // Подсвечиваем строки, где значения различаются
  const differs = (key) => new Set(list.map((item) => item[key] ?? '—')).size > 1

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Сравнение концептов"
      subtitle={
        concepts.length > MAX_COMPARE
          ? `Показаны первые ${MAX_COMPARE} из ${concepts.length} выбранных`
          : 'Отличающиеся характеристики выделены'
      }
      maxWidth="lg"
    >
      <TableContainer>
        <Table size="small" aria-label="Сравнение концептов">
          <TableHead>
            <TableRow>
              <TableCell />
              {list.map((item) => (
                <TableCell key={item.id}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ROWS.map(([key, label]) => (
              <TableRow key={key} selected={differs(key)}>
                <TableCell component="th" scope="row">
                  {label}
                </TableCell>
                {list.map((item) => (
                  <TableCell key={item.id}>{item[key] || '—'}</TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                Особенности
              </TableCell>
              {list.map((item) => (
                <TableCell key={item.id}>{(item.features ?? []).join(', ') || '—'}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Оценка
              </TableCell>
              {list.map((item) => {
                const { average, count } = getSummary(item.id)

                return (
                  <TableCell key={item.id}>
                    <Rating value={average} precision={0.5} size="small" readOnly />
                    <Typography variant="caption" display="block" color="text.secondary">
                      {count ? `${average.toFixed(1)} (${count})` : 'нет оценок'}
                    </Typography>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  )
}
