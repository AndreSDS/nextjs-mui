'use client'

import { ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@/utils/theme'
import { createEmotionCache } from '@/utils/createEmotionCache'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

const clientSideEmotionCache = createEmotionCache()

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
