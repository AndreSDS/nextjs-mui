'use client'

import { Box, Stack, Typography } from '@mui/material'
import { Cliente } from '@/utils/types'
import { Profile } from '@/components/Profile'

type Props = {
  cliente: Cliente
  openEditForm: () => void
  onDelete: () => void
}

export function ClienteDetails({ cliente, openEditForm, onDelete }: Props) {
  const {
    nome,
    tipoDocumento,
    numeroDocumento,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
  } = cliente

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100%"
      width="400px"
    >
      {!cliente ? null : (
        <Profile
          nome={nome}
          numeroDocumento={`${tipoDocumento} - ${numeroDocumento}`}
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
            Endereço
          </Typography>

          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Rua:{' '}
              <Typography variant="body2" component="span">
                {logradouro}
              </Typography>
            </Typography>

            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Número:{' '}
              <Typography variant="body2" component="span">
                {numero}
              </Typography>
            </Typography>

            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Bairro:{' '}
              <Typography variant="body2" component="span">
                {bairro}
              </Typography>
            </Typography>

            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Cidade:{' '}
              <Typography variant="body2" component="span">
                {cidade}
              </Typography>
            </Typography>

            <Typography variant="h4" fontWeight={600} fontSize="1rem">
              Estado:{' '}
              <Typography variant="body2" component="span">
                {uf}
              </Typography>
            </Typography>
          </Stack>
        </Profile>
      )}
    </Box>
  )
}
