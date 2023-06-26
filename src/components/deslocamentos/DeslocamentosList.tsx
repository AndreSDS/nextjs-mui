'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Deslocamento } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { Header } from '@/components/Header'
import { DataList } from '@/components/DataList'
import { createDeslocamento, getDeslocamentos } from '@/resources/deslocamentos'
import { DeslocamentoForm } from '@/components/deslocamentos/DeslocamentoForm'
import { useMutateData } from '@/hooks/useMutateData'
import { useFetchData } from '@/hooks/useFetchData'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'kmInicial', headerName: 'Km Inicial', flex: 1 },
  { field: 'kmFinal', headerName: 'Km Final', flex: 1 },
  {
    field: 'inicioDeslocamento',
    headerName: 'Início do Deslocamento',
    flex: 1,
  },
  { field: 'fimDeslocamento', headerName: 'Fim do Deslocamento', flex: 1 },
  { field: 'motivo', headerName: 'Motivo', flex: 1 },
  {
    field: 'idCondutor',
    headerName: 'Condutor',
    flex: 1,
  },
  {
    field: 'idCliente',
    headerName: 'Cliente',
    flex: 1,
  },
]

export function DeslocamentosList() {
  const [open, setOpen] = useState(false)
  const { data: deslocamentos, isFetching } = useFetchData(
    'deslocamentos',
    getDeslocamentos,
  )

  const { mutate } = useMutateData(
    'condutores',
    {} as Deslocamento,
    createDeslocamento,
  )

  function handleOpenModal() {
    setOpen(!open)
  }

  const onSubmit = async (data: Deslocamento) => {
    const deslocamento = mutate(data)

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
      <Modal open={!open} onClose={handleOpenModal}>
        <DeslocamentoForm onSubmit={onSubmit} />
      </Modal>

      <Header
        title="Deslocamentos"
        subTitle="Lista de deslocamentos"
        handleClick={handleOpenModal}
        hasButton
      />

      <DataList route="deslocamentos" data={deslocamentos} columns={columns} />
    </Box>
  )
}
