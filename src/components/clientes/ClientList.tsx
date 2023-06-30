'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Cliente } from '@/utils/types'
import {
  getStoredItem,
  queryClient,
  useFetchData,
  useMutation,
} from '@/lib/queryClient'
import {
  createCliente,
  getClientes,
  updateCliente,
  deleteCliente,
} from '@/resources/cliente'
import { Modal } from '@/components/Modal'
import { DataListComponent } from '@/components/DataList'
import { ClienteForm } from '@/components/clientes/ClienteForm'
import { ClienteDetails } from '@/components/clientes/ClienteDetails'
import { SnackBarComponent } from '@/components/SnackBarComponent'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Box } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'nome', headerName: 'Nome', flex: 1.5 },
  {
    field: 'tipoDocumento',
    headerName: 'Documento',
    headerAlign: 'left',
    align: 'left',
    type: 'number',
    flex: 0.5,
  },
  { field: 'numeroDocumento', headerName: 'Número do Documento', flex: 1 },
  { field: 'cidade', headerName: 'Cidade', flex: 1 },
  { field: 'uf', headerName: 'Estado' },
]

export function ClientList() {
  const [openClienteForm, setOpenClienteForm] = useState(false)
  const [openClienteDetails, setOpenClienteDetails] = useState(false)
  const [clienteId, setClienteId] = useState<any>(null)
  const { data: clientes, isFetching } = useFetchData({
    key: 'clientes',
    queryFn: getClientes,
    dataType: {} as Cliente,
  })

  const cliente: Cliente =
    getStoredItem('clientes', clienteId as number) || ({} as Cliente)

  const afterActions = () => {
    queryClient.invalidateQueries(['clientes'])
    setOpenClienteForm(false)
    setOpenClienteDetails(false)
  }

  const creating = useMutation(['createCliente'], createCliente, {
    onSuccess: () => afterActions(),
  })

  const updating = useMutation(['clientes'], updateCliente, {
    onSuccess: () => {
      setClienteId(null)
      afterActions()
    },
  })

  const deleting = useMutation(['clientes'], deleteCliente, {
    onSuccess: () => {
      setClienteId(null)
      afterActions()
    },
  })

  const handleCreateCliente = async (data: Cliente) => {
    try {
      await creating.mutateAsync(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleUpdateCliente = async (data: Cliente) => {
    try {
      await updating.mutateAsync(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleDeleteCliente = async () => {
    try {
      await deleting.mutateAsync(clienteId)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleOpenClienteForm = () => {
    setOpenClienteForm(true)
  }

  const handleOpenDetails = (id: number) => {
    setClienteId(id)
    setOpenClienteDetails(true)
  }

  if (isFetching) {
    return <LoadingSpinner />
  }

  const snackMessages = {
    created: 'Cliente cadastrado com sucesso!',
    updated: 'Cliente alterado com sucesso!',
    deleted: 'Cliente deletado com sucesso!',
    failCreate: 'Erro ao cadastrar cliente!',
    failUpdate: 'Erro ao alterar cliente!',
    failDelete: 'Erro ao deletar cliente!',
  }

  const ModalContent = () => {
    return (
      <>
        {clienteId ? (
          <ClienteForm
            titleForm="Atualizar dados do cliente"
            subTitleForm="Preencha os dados do cliente"
            initialValues={cliente}
            onSubmit={handleUpdateCliente}
          />
        ) : (
          <ClienteForm
            titleForm="Cadastrar novo cliente"
            subTitleForm="Preencha os dados do cliente"
            onSubmit={handleCreateCliente}
          />
        )}
      </>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
    >
      <SnackBarComponent
        open={creating.isSuccess || creating.isError}
        message={
          creating.isSuccess ? snackMessages.created : snackMessages.failCreate
        }
        severity={creating.isSuccess ? 'success' : 'error'}
      />

      <SnackBarComponent
        open={updating.isSuccess || updating.isError}
        message={
          updating.isSuccess ? snackMessages.updated : snackMessages.failUpdate
        }
        severity={updating.isSuccess ? 'success' : 'error'}
      />

      <SnackBarComponent
        open={deleting.isSuccess || deleting.isError}
        message={
          deleting.isSuccess ? snackMessages.deleted : snackMessages.failDelete
        }
        severity={deleting.isSuccess ? 'success' : 'error'}
      />

      <Modal open={openClienteForm} onClose={() => setOpenClienteForm(false)}>
        <ModalContent />
      </Modal>

      <Modal
        open={openClienteDetails}
        onClose={() => setOpenClienteDetails(false)}
      >
        <ClienteDetails
          openEditForm={handleOpenClienteForm}
          onDelete={handleDeleteCliente}
          cliente={cliente}
        />
      </Modal>

      <DataListComponent
        headerTitle="Clientes"
        headerSubTitle="Lista de clientes cadastrados"
        handleClickItem={handleOpenDetails}
        hasButton
        handleClickHeader={handleOpenClienteForm}
        data={clientes}
        columns={columns}
      />
    </Box>
  )
}
