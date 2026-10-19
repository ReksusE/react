import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@/components/Breadcrumbs'
import usePageTitle from '@/hooks/usePageTitle'
import { useConcepts } from '@/context/ConceptsContext'
import { useRatings } from '@/context/RatingsContext'

const breadcrumbsItems = [
  { title: 'Главная', href: '/' },
  { title: 'Рейтинг', href: '/ratings' },
]

const ALL = 'Все'

export default function Ratings() {
  usePageTitle('Рейтинг')

  const { items } = useConcepts()
  const { getSummary } = useRatings()
  const [category, setCategory] = useState(ALL)

  const categories = useMemo(
    () => [ALL, ...new Set(items.map((item) => item.category).filter(Boolean))],
    [items]
  )

  const rows = useMemo(
    () =>
      items
        .filter((item) => category === ALL || item.category === category)
        .map((item) => ({ ...item, ...getSummary(item.id) }))
        .sort((a, b) => b.average - a.average || b.count - a.count),
    [items, category, getSummary]
  )

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Breadcrumbs items={breadcrumbsItems} />

      <Typography variant="h1" gutterBottom>
        Рейтинг концептов
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Средние оценки посетителей. Оценить концепт можно в его карточке.
      </Typography>

      <Tabs
        value={category}
        onChange={(_, value) => setCategory(value)}
        variant="scrollable"
        sx={{ mb: 2 }}
      >
        {categories.map((name) => (
          <Tab key={name} value={name} label={name} />
        ))}
      </Tabs>

      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="Рейтинг концептов">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Концепт</TableCell>
              <TableCell>Топливо</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Оценка</TableCell>
              <TableCell align="right">Голосов</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link component={RouterLink} to="/concepts" underline="hover">
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {row.fuel && <Chip size="small" label={row.fuel} variant="outlined" />}
                </TableCell>
                <TableCell>
                  <Rating value={row.average} precision={0.1} readOnly size="small" />
                  <LinearProgress
                    variant="determinate"
                    value={(row.average / 5) * 100}
                    aria-label="Средняя оценка"
                    sx={{ mt: 0.5 }}
                  />
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
