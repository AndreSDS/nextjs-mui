'use client'

import { FC, ReactComponentElement, ReactNode, useState } from 'react'
import {
  Box,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  colors,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { stringToColor } from '@/utils/stringToColor'

type Props = {
  openEditForm: () => void
  onDelete: () => void
  form?: ReactComponentElement<FC> //remover
  nome: string
  numeroDocumento: string
  children: ReactNode
}

export function Profile({
  nome,
  numeroDocumento,
  openEditForm,
  onDelete,
  children,
}: Props) {
  const color = stringToColor(nome)

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack
            sx={{
              marginX: 'auto',
            }}
            direction="row"
            width="70%"
            justifyContent="space-between"
          >
            <IconButton
              onClick={openEditForm}
              aria-label="edit"
              size="large"
              sx={{
                bgcolor: color,
              }}
            >
              <Edit />
            </IconButton>

            <IconButton
              onClick={onDelete}
              aria-label="edit"
              size="large"
              sx={{
                bgcolor: colors.red[700],
              }}
            >
              <Delete />
            </IconButton>
          </Stack>

          <Box
            marginTop="0"
            display="flex"
            gap={1}
            flexDirection="column"
            alignItems="center"
          >
            <Paper
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: color,
                mb: 2,
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              A
            </Paper>

            <Typography
              variant="h2"
              sx={{
                fontSize: 28,
                lineHeight: 1.2,
                fontWeight: 700,
              }}
            >
              {nome}
            </Typography>

            <Typography sx={{ mb: 1.5, mt: 0 }} color="text.secondary">
              {numeroDocumento}
            </Typography>
          </Box>

          <Divider />

          <CardContent>{children}</CardContent>
        </Stack>
      </Paper>
    </>
  )
}
