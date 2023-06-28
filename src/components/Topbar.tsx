'use client'

import {
  LightModeOutlined,
  DarkModeOutlined,
  PersonOutlined,
} from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

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
