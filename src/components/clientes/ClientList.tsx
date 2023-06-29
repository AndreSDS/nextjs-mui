'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Cliente } from '@/utils/types'
import { queryClient, useFetchData } from '@/lib/queryClient'
import { createCliente, getClientes } from '@/resources/cliente'
import { Modal } from '@/components/Modal'
import { Header } from '@/components/Header'
import { DataList } from '@/components/DataList'
import { ClienteForm } from '@/components/clientes/ClienteForm'
import { ClienteProfile } from '@/components/clientes/ClienteProfile'

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
  const [openClienteProfile, setOpenClienteProfile] = useState(false)
  const [clienteId, setClienteId] = useState<number>(0)
  const { data: clientes, isFetching } = useFetchData({
    key: 'clientes',
    queryFn: getClientes,
    dataType: {} as Cliente,
  })

  const afterAction = () => {
    queryClient.invalidateQueries(['clientes'])
    setOpenClienteForm(false)
  }

  const handleCreateCliente = async (data: Cliente) => {
    try {
      await createCliente(data)
      afterAction()
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const openProfile = (id: number) => {
    setClienteId(id)
    setOpenClienteProfile(true)
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
      <Modal open={openClienteForm} onClose={() => setOpenClienteForm(false)}>
        <ClienteForm
          titleForm="Cadastrar novo cliente"
          subTitleForm="Preencha os dados do cliente"
          onSubmit={handleCreateCliente}
        />
      </Modal>

      <Modal
        open={openClienteProfile}
        onClose={() => setOpenClienteProfile(false)}
      >
        <ClienteProfile onClose={() => setOpenClienteProfile(false)} id={clienteId} />
      </Modal>

      <Header
        title="Clientes"
        subTitle="Lista de clientes cadastrados"
        handleClick={() => setOpenClienteForm(true)}
        hasButton
      />

      <DataList handleClick={openProfile} data={clientes} columns={columns} />
    </Box>
  )
}
