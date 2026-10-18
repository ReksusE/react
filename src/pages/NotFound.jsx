import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import usePageTitle from '@/hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Страница не найдена')

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h1">404</Typography>
        <Typography color="text.secondary">Такой страницы не существует</Typography>
        <Button component={RouterLink} to="/" variant="contained">
          На главную
        </Button>
      </Stack>
    </Container>
  )
}
