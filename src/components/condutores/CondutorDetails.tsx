'use client'

import { Box, Stack, Typography } from '@mui/material'
import { Condutor } from '@/utils/types'
import { Profile } from '@/components/Profile'

type Props = {
  condutor: Condutor
  openEditForm: () => void
  onDelete: () => void
}

export function CondutorDetails({ condutor, openEditForm, onDelete }: Props) {
  const {
    nome,
    numeroHabilitacao,
    catergoriaHabilitacao,
    vencimentoHabilitacao,
  } = condutor

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100%"
      width="400px"
    >
      {!condutor ? null : (
        <Profile
          nome={nome}
          numeroDocumento={`${numeroHabilitacao} - ${catergoriaHabilitacao}`}
          openEditForm={openEditForm}
          onDelete={onDelete}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1.2,
              fontWeight: 600,
              mb: 1,
            }}
          >
            Dados da Habilitação
          </Typography>

          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Número:{' '}
              <Typography variant="body2" component="span">
                {numeroHabilitacao}
              </Typography>
            </Typography>

            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Categoria:{' '}
              <Typography variant="body2" component="span">
                {catergoriaHabilitacao}
              </Typography>
            </Typography>

            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Vencimento:{' '}
              <Typography variant="body2" component="span">
                {vencimentoHabilitacao}
              </Typography>
            </Typography>
          </Stack>
        </Profile>
      )}
    </Box>
  )
}
