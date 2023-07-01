'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useCustomTheme } from '@/hooks/useCustomTheme'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  const { customTheme } = useCustomTheme()

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
