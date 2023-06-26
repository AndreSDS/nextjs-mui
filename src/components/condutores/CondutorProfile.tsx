'use client'

import { Box, Stack, Typography, colors } from '@mui/material'
import { Condutor } from '@/utils/types'
import { CondutorForm } from '@/components/condutores/CondutorForm'
import { updateCondutor } from '@/resources/condutor'
import { Profile } from '../Profile'
import { useDataStored } from '@/hooks/useDataStored'
import { useMutateData } from '@/hooks/useMutateData'

type Props = {
  id: string
}

export function CondutorProfile({ id }: Props) {
  const { dataStored: condutor } = useDataStored({
    id: Number(id),
    key: 'condutores',
    dataType: {} as Condutor,
  })

  const { mutate } = useMutateData('condutores', {} as Condutor, updateCondutor)

  const {
    nome,
    numeroHabilitacao,
    catergoriaHabilitacao,
    vencimentoHabilitacao,
  } = condutor

  const onSubmit = async (data: Condutor) => {
    const condutor = mutate(data)
  }

  return (
    <Box height="100%" width="100%" pl={12} pt={12} bgcolor={colors.grey[400]}>
      <Profile
        nome={nome}
        numeroDocumento={numeroHabilitacao}
        form={<CondutorForm onSubmit={onSubmit} initialValues={condutor} />}
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
    </Box>
  )
}
