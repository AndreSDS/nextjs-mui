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
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Modal } from '@/components/Modal'
import { stringToColor } from '@/utils/stringToColor'

type Props = {
  form: ReactComponentElement<FC>
  nome: string
  numeroDocumento: string
  children: ReactNode
}

export function Profile({ nome, numeroDocumento, form, children }: Props) {
  const [open, setOpen] = useState(false)
  const color = stringToColor(nome)

  return (
    <>
      <Modal open={open} onClose={() => setOpen(!open)}>
        {form}
      </Modal>

      <Paper
        sx={{
          flex: 1,
          maxWidth: 400,
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Stack spacing={2}>
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="edit"
            size="large"
            sx={{
              position: 'absolute',
              zIndex: 1,
              ml: 2,
              bgcolor: color,
            }}
          >
            <Edit />
          </IconButton>

          <Box
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
