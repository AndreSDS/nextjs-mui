'use client'

import {
  LightModeOutlined,
  DarkModeOutlined,
  PersonOutlined,
  Search as SearchIcon,
} from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'

type Props = {}

export function Topbar({}: Props) {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      p={2}
    >
      <Box display="flex" borderRadius="4px" bgcolor="white">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />

        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton type="button" sx={{ p: 1 }}>
          {theme.palette.mode === 'dark' ? (
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
