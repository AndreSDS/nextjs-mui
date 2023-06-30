'use client'

import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Cliente } from '@/utils/types'
import { Profile } from '@/components/Profile'
import { ClienteForm } from '@/components/clientes/ClienteForm'
import { getStoredItem, queryClient, useMutation } from '@/lib/queryClient'
import { deleteCliente, updateCliente } from '@/resources/cliente'
import { Modal } from '../Modal'
import { SnackBarComponent } from '../SnackBarComponent'

type Props = {
  id: number
  onClose: () => void
}

export function ClienteDetails({ id, onClose }: Props) {
  const [openClienteForm, setOpenClienteForm] = useState(false)
  const cliente = getStoredItem('clientes', id) as Cliente

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

  const afterAction = () => {
    queryClient.invalidateQueries(['clientes'])
    setOpenClienteForm(false)
  }

  const {
    mutateAsync: updating,
    isSuccess: updated,
    error: failUpdate,
  } = useMutation(['clientes'], updateCliente, {
    onSuccess: () => afterAction(),
  })

  const {
    mutateAsync: deleting,
    isSuccess: deleted,
    error: failDelete,
  } = useMutation(['clientes'], deleteCliente, {
    onSuccess: () => afterAction(),
  })

  const handleUpdate = async (data: Cliente) => {
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
    updated: 'Cliente encerrado com sucesso!',
    deleted: 'Cliente deletado com sucesso!',
    failUpdate: 'Erro ao encerrar cliente!',
    failDelete: 'Erro ao deletar cliente!',
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

      <Modal open={openClienteForm} onClose={() => setOpenClienteForm(false)}>
        <ClienteForm
          titleForm="Atualizar dados do cliente"
          subTitleForm="Preencha os dados do cliente"
          onSubmit={handleUpdate}
          initialValues={cliente}
        />
      </Modal>

      {!cliente ? null : (
        <Profile
          nome={nome}
          numeroDocumento={`${tipoDocumento} - ${numeroDocumento}`}
          openEditForm={() => setOpenClienteForm(true)}
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
