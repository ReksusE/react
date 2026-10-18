import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccessTime from '@mui/icons-material/AccessTime'
import Place from '@mui/icons-material/Place'
import Phone from '@mui/icons-material/Phone'
import Breadcrumbs from '@/components/Breadcrumbs'
import usePageTitle from '@/hooks/usePageTitle'
import { useToast } from '@/context/ToastContext'
import { readStorage, writeStorage } from '@/utils/storage'
import { validateEmail, validateName } from '@/utils/validators'
import showroom from '@/data/showroomsData.json'

const MESSAGES_KEY = 'artkante:messages'

const breadcrumbsItems = [
  { title: 'Главная', href: '/' },
  { title: 'Контакты', href: '/contacts' },
]

const ICONS = { 1: AccessTime, 2: Place }
const EMPTY = { name: '', email: '', message: '' }

export default function Contacts() {
  usePageTitle('Контакты')

  const { showToast } = useToast()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const setField = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      message: values.message.trim().length < 10 ? 'Минимум 10 символов' : '',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {return}

    const stored = readStorage(MESSAGES_KEY, [])

    writeStorage(MESSAGES_KEY, [...stored, { ...values, date: new Date().toISOString() }])
    setValues(EMPTY)
    showToast('Сообщение отправлено, мы свяжемся с вами', 'success')
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Breadcrumbs items={breadcrumbsItems} />

      <Typography variant="h1" gutterBottom>
        Контакты
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom>
              Шоурум
            </Typography>
            <List disablePadding>
              {showroom.infoBlocks.map((block) => {
                const Icon = ICONS[block.id] ?? Phone

                return (
                  <ListItem key={block.id} alignItems="flex-start" disableGutters>
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <Icon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={block.title}
                      secondary={block.lines.join(' ')}
                      slotProps={{ primary: { fontWeight: 700 } }}
                    />
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            variant="outlined"
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ p: 3 }}
          >
            <Typography variant="h3" gutterBottom>
              Написать нам
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Имя"
                value={values.name}
                onChange={setField('name')}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
              />
              <TextField
                label="E-mail"
                type="email"
                value={values.email}
                onChange={setField('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
              />
              <TextField
                label="Сообщение"
                value={values.message}
                onChange={setField('message')}
                error={Boolean(errors.message)}
                helperText={errors.message}
                multiline
                minRows={4}
                required
              />
              <Box>
                <Button type="submit" variant="contained" size="large">
                  Отправить
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
