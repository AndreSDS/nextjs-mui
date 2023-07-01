'use client'

import { ReactNode } from 'react'

import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@/utils/createEmotionCache'
import { QueryClientProvider, queryClient } from '@/lib/queryClient'

const clientSideEmotionCache = createEmotionCache()

type Props = {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CacheProvider>
  )
}
