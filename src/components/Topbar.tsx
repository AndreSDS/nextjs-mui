'use client'

import { useCustomTheme } from '@/hooks/useCustomTheme'
import {
  LightModeOutlined,
  DarkModeOutlined,
  PersonOutlined,
} from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

export function Topbar() {
  const { customTheme: theme, toggleTheme } = useCustomTheme()

  const handleThemeChange = () => {
    if (theme.palette.mode === 'dark') {
      toggleTheme('light')
    }

    if (theme.palette.mode === 'light') {
      toggleTheme('dark')
    }
  }

  const isDarkMode = theme.palette.mode === 'dark'

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      p={2}
    >
      <Box display="flex">
        <IconButton onClick={handleThemeChange} type="button" sx={{ p: 1 }}>
          {isDarkMode ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>

        <IconButton type="button" sx={{ p: 1 }}>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  )
}
