'use client'

import { ReactNode } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { Header } from '@/components/Header'
import { Cliente, Condutor, Deslocamento } from '@/utils/types'

type Props = {
  children: ReactNode
  titleForm: string
  subTitleForm: string
  textSubmitBuntton: string
  initialValues?: Condutor | Cliente | Deslocamento
  isLoading?: boolean
  onSubmit: () => void
}

export const Form = ({
  children,
  titleForm,
  subTitleForm,
  textSubmitBuntton,
  isLoading,
  onSubmit,
}: Props) => {
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      height="100%"
      maxHeight="800px"
      padding="1rem 1.5rem"
      onSubmit={onSubmit}
    >
      <Header title={titleForm} subTitle={subTitleForm} />

      <Stack spacing={3}>
        {children}

        <Button
          disabled={isLoading}
          type="submit"
          sx={{
            alignSelf: 'flex-end',
            marginTop: '1.5rem',
          }}
          variant="contained"
          color="primary"
        >
          {textSubmitBuntton}
        </Button>
      </Stack>
    </Box>
  )
}
