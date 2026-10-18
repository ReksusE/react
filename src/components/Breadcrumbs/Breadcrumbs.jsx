import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

export default function Breadcrumbs({ items = [], className }) {
  return (
    <MuiBreadcrumbs aria-label="Хлебные крошки" className={className} sx={{ my: 2 }}>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <Typography key={item.href} color="text.primary">
            {item.title}
          </Typography>
        ) : (
          <Link
            key={item.href}
            component={RouterLink}
            to={item.href}
            underline="hover"
            color="text.secondary"
          >
            {item.title}
          </Link>
        )
      )}
    </MuiBreadcrumbs>
  )
}
