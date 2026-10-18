import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Breadcrumbs from '@/components/Breadcrumbs'
import usePageTitle from '@/hooks/usePageTitle'
import steps from '@/data/realizationSteps.json'

const breadcrumbsItems = [
  { title: 'Главная', href: '/' },
  { title: 'О нас', href: '/about' },
]

const FACTS = ['10+ лет опыта', 'Проектирование и монтаж', 'Печи, камины, облицовка']

const FAQ = [
  {
    q: 'Сколько времени занимает проект?',
    a: 'От концепта до запуска очага обычно проходит от 2 до 4 месяцев — зависит от сложности и выбранных материалов.',
  },
  {
    q: 'Можно ли заказать камин для квартиры?',
    a: 'Да. Для городских квартир мы подбираем биокамины и электрокамины, которые не требуют дымохода.',
  },
  {
    q: 'Предоставляете ли вы гарантию?',
    a: 'Мы даём гарантию на монтаж и используемые материалы, условия фиксируются в договоре.',
  },
]

export default function About() {
  usePageTitle('О нас')

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Breadcrumbs items={breadcrumbsItems} />

      <Stack spacing={5}>
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h1" gutterBottom>
            О студии ArtKante
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 720 }}>
            Мы разрабатываем и реализуем проекты каминов и печей: от идеи и визуализации до
            монтажа под ключ. Приходите с вашей идеей очага — команда вникнет в проект и
            воплотит всё задуманное.
          </Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
            {FACTS.map((fact) => (
              <Chip key={fact} label={fact} color="primary" variant="outlined" />
            ))}
          </Stack>
        </Paper>

        <Box component="section">
          <Typography variant="h2" gutterBottom>
            Этапы работы
          </Typography>
          <Stepper orientation="vertical" activeStep={-1}>
            {steps.map((step) => (
              <Step key={step.id} active expanded>
                <StepLabel>{step.title}</StepLabel>
                <StepContent>
                  <Typography color="text.secondary">{step.text}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box component="section">
          <Typography variant="h2" gutterBottom>
            Частые вопросы
          </Typography>
          {FAQ.map((item) => (
            <Accordion key={item.q} disableGutters>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight={700}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Stack>
    </Container>
  )
}
