'use client'

import { ReactNode } from 'react'
import { Box, Stack } from '@mui/material'
import { Header } from '@/components/Header'
import { ButtonComponent } from '@/components/ButtonComponent'
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
      display="flex"
      flexDirection="column"
      alignItems="center"
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

        <ButtonComponent
          textButton={textSubmitBuntton}
          disabled={isLoading}
          type="submit"
          variant="contained"
        />
      </Stack>
    </Box>
  )
}
