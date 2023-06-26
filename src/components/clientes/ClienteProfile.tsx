'use client'

import { Box, Stack, Typography, colors } from '@mui/material'
import { Cliente } from '@/utils/types'
import { ClienteForm } from './ClienteForm'
import { queryClient, useMutation } from '@/lib/queryClient'
import { updateCliente } from '@/resources/cliente'
import { Profile } from '@/components/Profile'
import { useDataStored } from '@/hooks/useDataStored'
import { useMutateData } from '@/hooks/useMutateData'

type Props = {
  id: string
}

export function ClienteProfile({ id }: Props) {
  const { dataStored: cliente } = useDataStored({
    id: Number(id),
    key: 'clientes',
    dataType: {} as Cliente,
  })

  const { mutate } = useMutateData('clientes', {} as Cliente, updateCliente)

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

  const onSubmit = async (data: Cliente) => {
    const cliente = mutate(data)
  }

  return (
    <Box height="100%" width="100%" pl={12} pt={12} bgcolor={colors.grey[400]}>
      <Profile
        nome={nome}
        numeroDocumento={`${tipoDocumento} - ${numeroDocumento}`}
        form={<ClienteForm onSubmit={onSubmit} initialValues={cliente} />}
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
    </Box>
  )
}
