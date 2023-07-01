'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Box,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
} from '@mui/material'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  AccountBox,
  GarageRounded,
  RecentActors,
  ShareLocation,
} from '@mui/icons-material'
import { Topbar } from './Topbar'

type Props = {}

const menuNavItems = [
  {
    name: 'Clientes',
    icon: <AccountBox />,
    href: '/clientes',
  },
  {
    name: 'Condutores',
    icon: <RecentActors />,
    href: '/condutores',
  },
  {
    name: 'Deslocamentos',
    icon: <ShareLocation />,
    href: '/deslocamentos',
  },
  {
    name: 'Veículos',
    icon: <GarageRounded />,
    href: '/veiculos',
  },
]

type ItemProps = {
  title: string | null
  icon: any
  to: string
  open?: boolean
  onClick?: () => void
}

const MenuItemComponent = ({
  title,
  icon,
  to,
  open = false,
  onClick,
}: ItemProps) => {
  const pathname = usePathname()
  const selected = pathname === to

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  )
}

export function Sidebar({}: Props) {
  const route = useRouter()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleMenuItemClick = (routeName: string) => {
    route.push(routeName)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
          <Topbar />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          padding={theme.spacing(0, 1)}
          sx={{ ...theme.mixins.toolbar }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        <Avatar />

        <List>
          {menuNavItems.map((item) => (
            <MenuItemComponent
              key={item.name}
              title={item.name}
              icon={item.icon}
              to={item.href}
              open={open}
              onClick={() => handleMenuItemClick(item.href)}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
