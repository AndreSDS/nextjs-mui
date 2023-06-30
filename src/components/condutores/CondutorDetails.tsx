'use client'

import { useState } from 'react'
import { Box, Stack, Typography, colors } from '@mui/material'
import { Condutor } from '@/utils/types'
import { getStoredItem, queryClient, useMutation } from '@/lib/queryClient'
import { deleteCondutor, updateCondutor } from '@/resources/condutor'
import { CondutorForm } from '@/components/condutores/CondutorForm'
import { Profile } from '@/components/Profile'
import { Modal } from '../Modal'
import { SnackBarComponent } from '../SnackBarComponent'

type Props = {
  id: number
  onClose: () => void
}

export function CondutorDetails({ id, onClose }: Props) {
  const [openCondutorForm, setOpenCondutorForm] = useState(false)
  const condutor = getStoredItem('condutores', id) as Condutor

  const {
    nome,
    numeroHabilitacao,
    catergoriaHabilitacao,
    vencimentoHabilitacao,
  } = condutor

  const {
    mutateAsync: updating,
    isSuccess: updated,
    error: failUpdate,
  } = useMutation(['condutor'], updateCondutor, {
    onSuccess: () => afterAction(),
  })

  const {
    mutateAsync: deleting,
    isSuccess: deleted,
    error: failDelete,
  } = useMutation(['condutor'], deleteCondutor, {
    onSuccess: () => afterAction(),
  })

  const afterAction = () => {
    queryClient.invalidateQueries(['condutores'])
    setOpenCondutorForm(false)
  }

  const handleEditCondutor = async (data: Condutor) => {
    try {
      await updating(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleDelete = async () => {
    try {
      await deleting(id)
      onClose()
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const snackMessages = {
    updated: 'Condutor encerrado com sucesso!',
    deleted: 'Condutor deletado com sucesso!',
    failUpdate: 'Erro ao encerrar condutor!',
    failDelete: 'Erro ao deletar condutor!',
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100%"
      width="400px"
    >
      <SnackBarComponent
        open={updated}
        message={updated ? snackMessages.updated : snackMessages.failUpdate}
        severity={failUpdate ? 'error' : 'success'}
      />

      <SnackBarComponent
        open={deleted}
        message={deleted ? snackMessages.deleted : snackMessages.failDelete}
        severity={failDelete ? 'error' : 'success'}
      />

      <Modal open={openCondutorForm} onClose={() => setOpenCondutorForm(false)}>
        <CondutorForm onSubmit={handleEditCondutor} initialValues={condutor} />
      </Modal>

      {!condutor ? null : (
        <Profile
          nome={nome}
          numeroDocumento={numeroHabilitacao}
          openEditForm={() => setOpenCondutorForm(true)}
          onDelete={handleDelete}
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
