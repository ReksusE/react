import './Header.scss'
import { startTransition, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import Logo from '@/components/Logo'
import BurgerButton from '@/components/BurgerButton'
import Icon from '@/components/Icon'
import ProfileModal from '@/components/ProfileModal'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useFavorites } from '@/context/FavoritesContext'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PersonOutline from '@mui/icons-material/PersonOutline'
import Login from '@mui/icons-material/Login'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings'
import EditOutlined from '@mui/icons-material/EditOutlined'
import Logout from '@mui/icons-material/Logout'
import { navItems as menuItems } from '@/app/registry'

const menuItems1 = [
  { label: 'Загородный Дом', href: '/' },
  { label: 'Городская Квартира', href: '/' },
  { label: 'Общественные пространства', href: '/portfolio' },
  { label: 'Облицовка', href: '/philosophy' },
]

const socials = [
  { label: 'Phone', icon: 'phone' },
  { label: 'Instagram', icon: 'instagram' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const isUserPanelOpen = Boolean(anchorEl)
  const closePanel = () => setAnchorEl(null)
  const { favoriteIds } = useFavorites()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()
  const { showToast } = useToast()

  // Закрываем меню при переходе на другую страницу
  useEffect(() => {
    setIsMenuOpen(false)
    setAnchorEl(null)
  }, [pathname])

  const handleLogout = () => {
    // навигация и выход — в одном transition, иначе защищённый маршрут успеет отправить на /auth
    closePanel()
    startTransition(() => {
      navigate('/')
      logout()
    })
    showToast('Вы вышли из аккаунта', 'info')
  }

  // Блокируем скролл страницы, пока открыто мобильное меню
  useEffect(() => {
    document.documentElement.classList.toggle('is-lock', isMenuOpen)

    return () => document.documentElement.classList.remove('is-lock')
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className="header">
      <div className="header__body container">
        <Logo title="Home" />

        <div className={clsx('header__nav', isMenuOpen && 'is-active')}>
          <nav className="header__menu header__menu-top">
            <ul className="header__menu-list">
              {menuItems.map(({ label, href, push }, index) => (
                <li
                  className={clsx(
                    'header__menu-item',
                    push && 'header__menu-item-push'
                  )}
                  key={index}
                >
                  <NavLink
                    className={({ isActive }) =>
                      clsx(
                        'header__menu-link',
                        'header__menu-link-accent',
                        isActive && 'is-active'
                      )
                    }
                    to={href}
                    end
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="header__menu header__menu-bottom">
            <ul className="header__menu-list">
              {menuItems1.map(({ label, href }, index) => (
                <li className="header__menu-item" key={index}>
                  <Link
                    className="header__menu-link header__menu-link-bold"
                    to={href}
                  >
                    {label}
                  </Link>
                  <Icon
                    name="caret-down-circle-outline"
                    className="header__menu-list__icon"
                    hasFill={true}
                    ariaLabel="caret-down-circle-outline"
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="header__side">
          {socials.map(({ label, icon }) => (
            <a className="side-icon" href="/" title={label} key={label}>
              <span className="visually-hidden">{label}</span>
              <Icon name={icon} />
            </a>
          ))}

          <Tooltip title="Личный кабинет">
            <IconButton
              aria-label="Личный кабинет"
              aria-haspopup="menu"
              aria-expanded={isUserPanelOpen}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Badge color="primary" badgeContent={user ? favoriteIds.length : 0}>
                {user ? (
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', color: 'primary.contrastText', fontSize: 14 }}>
                    {user.name.trim().charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <PersonOutline />
                )}
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={isUserPanelOpen}
            onClose={closePanel}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box sx={{ px: 2, py: 1, minWidth: 220 }}>
              <Typography variant="subtitle2">{user ? user.name : 'Гость'}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user ? user.email : 'Войдите в аккаунт'}
              </Typography>
            </Box>
            <Divider />
            {!user && (
              <MenuItem component={Link} to="/auth">
                <ListItemIcon><Login fontSize="small" /></ListItemIcon>
                <ListItemText>Войти</ListItemText>
              </MenuItem>
            )}
            {user && (
              <MenuItem component={Link} to="/favorites">
                <ListItemIcon><FavoriteBorder fontSize="small" /></ListItemIcon>
                <ListItemText>Избранное</ListItemText>
              </MenuItem>
            )}
            {isAdmin && (
              <MenuItem component={Link} to="/admin">
                <ListItemIcon><AdminPanelSettings fontSize="small" /></ListItemIcon>
                <ListItemText>Админ-панель</ListItemText>
              </MenuItem>
            )}
            {user && (
              <MenuItem
                onClick={() => {
                  closePanel()
                  setIsProfileOpen(true)
                }}
              >
                <ListItemIcon><EditOutlined fontSize="small" /></ListItemIcon>
                <ListItemText>Редактировать</ListItemText>
              </MenuItem>
            )}
            {user && <Divider />}
            {user && (
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon sx={{ color: 'inherit' }}><Logout fontSize="small" /></ListItemIcon>
                <ListItemText>Выйти из аккаунта</ListItemText>
              </MenuItem>
            )}
          </Menu>

          <BurgerButton
            className={clsx('visible-mobile', isMenuOpen && 'is-active')}
            extraAttrs={{ onClick: toggleMenu, 'aria-expanded': isMenuOpen }}
          />
        </div>
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  )
}
