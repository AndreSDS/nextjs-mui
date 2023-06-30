'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Cliente } from '@/utils/types'
import { queryClient, useFetchData, useMutation } from '@/lib/queryClient'
import { createCliente, getClientes } from '@/resources/cliente'
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
  { field: 'logradouro', headerName: 'Endereço', flex: 1.5 },
  { field: 'cidade', headerName: 'Cidade', flex: 1 },
  { field: 'uf', headerName: 'Estado' },
]

export function ClientList() {
  const [openClienteForm, setOpenClienteForm] = useState(false)
  const [openClienteDetails, setOpenClienteDetails] = useState(false)
  const [clienteId, setClienteId] = useState<number>(0)
  const { data: clientes, isFetching } = useFetchData({
    key: 'clientes',
    queryFn: getClientes,
    dataType: {} as Cliente,
  })

  const { mutateAsync, isSuccess, error } = useMutation(
    ['createCliente'],
    createCliente,
    {
      onSuccess: () => afterAction(),
    },
  )

  const afterAction = () => {
    queryClient.invalidateQueries(['clientes'])
    setOpenClienteForm(false)
  }

  const handleCreateCliente = async (data: Cliente) => {
    try {
      await mutateAsync(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const openDetails = (id: number) => {
    setClienteId(id)
    setOpenClienteDetails(true)
  }

  if (isFetching) {
    return <LoadingSpinner />
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
        open={isSuccess}
        message={
          isSuccess
            ? 'Cliente cadastrado com sucesso!'
            : 'Erro ao cadastrar cliente!'
        }
        severity={error ? 'error' : 'success'}
      />

      <Modal open={openClienteForm} onClose={() => setOpenClienteForm(false)}>
        <ClienteForm
          titleForm="Cadastrar novo cliente"
          subTitleForm="Preencha os dados do cliente"
          onSubmit={handleCreateCliente}
        />
      </Modal>

      <Modal
        open={openClienteDetails}
        onClose={() => setOpenClienteDetails(false)}
      >
        <ClienteDetails
          onClose={() => setOpenClienteDetails(false)}
          id={clienteId}
        />
      </Modal>

      <DataListComponent
        headerTitle="Clientes"
        headerSubTitle="Lista de clientes cadastrados"
        handleClickItem={openDetails}
        hasButton
        handleClickHeader={() => setOpenClienteForm(true)}
        data={clientes}
        columns={columns}
      />
    </Box>
  )
}
