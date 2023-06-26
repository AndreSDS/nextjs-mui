'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Cliente } from '@/utils/types'
import { Header } from '@/components/Header'
import { Modal } from '@/components/Modal'
import { ClienteForm } from '@/components/clientes/ClienteForm'
import {
  queryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@/lib/queryClient'
import { DataList } from '../DataList'
import { createCliente, getClientes } from '@/resources/cliente'
import { useMutateData } from '@/hooks/useMutateData'

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
  const [open, setOpen] = useState(false)
  const { data: clientes, isFetching } = useQuery({
    queryKey: ['clientes'],
    queryFn: getClientes,
  })

  const { mutate } = useMutateData('clientes', {} as Cliente, createCliente)

  function handleOpenModal() {
    setOpen(!open)
  }

  const onSubmit = async (data: Cliente) => {
    const cliente = mutate(data)

    handleOpenModal()
  }

  if (isFetching) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <Box width="100%" pl={12} pr={4}>
      <Modal open={open} onClose={handleOpenModal}>
        <ClienteForm onSubmit={onSubmit} />
      </Modal>

      <Header
        title="Clientes"
        subTitle="Lista de clientes cadastrados"
        handleClick={handleOpenModal}
        hasButton
      />

      <DataList data={clientes} columns={columns} />
    </Box>
  )
}
