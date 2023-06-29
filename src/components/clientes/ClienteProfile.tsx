'use client'

import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Cliente } from '@/utils/types'
import { Profile } from '@/components/Profile'
import { ClienteForm } from '@/components/clientes/ClienteForm'
import { getStoredItem, queryClient } from '@/lib/queryClient'
import { deleteCliente, updateCliente } from '@/resources/cliente'
import { Modal } from '../Modal'

type Props = {
  id: number
  onClose: () => void
}

export function ClienteProfile({ id, onClose }: Props) {
  const [openClienteForm, setOpenClienteForm] = useState(false)
  const cliente = getStoredItem('clientes', id)

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

  const handleUpdate = async (data: Cliente) => {
    try {
      await updateCliente(data)
      afterAction()
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCliente(id)
      afterAction()
      onClose()
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      height="100%"
      width="400px"
    >
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
