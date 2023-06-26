'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { queryClient, useMutation, useQuery } from '@/lib/queryClient'
import { Modal } from '@/components/Modal'
import { Header } from '@/components/Header'
import { DataList } from '@/components/DataList'
import { VeiculoForm } from '@/components/veiculos/VeiculoForm'
import { Veiculo } from '@/utils/types'
import { createVeiculo, getVeiculos } from '@/resources/veiculo'
import { useFetchData } from '@/hooks/useFetchData'
import { useDataStored } from '@/hooks/useDataStored'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'placa',
    headerName: 'Placa',
    flex: 1,
  },
  {
    field: 'marcaModelo',
    headerName: 'Marca/Modelo',
    flex: 1,
  },
  {
    field: 'anoFabricacao',
    headerName: 'Ano de Fabricação',
    flex: 1,
  },
  {
    field: 'kmAtual',
    headerName: 'Km Atual',
    flex: 1,
  },
]

export function VeiculosList() {
  const [open, setOpen] = useState(false)
  const { data: veiculos, isFetching } = useFetchData(
    'veiculos',
    getVeiculos
  )
  const { mutateDataStored } = useDataStored('veiculo', {} as Veiculo, createVeiculo)

  function handleOpenModal() {
    setOpen(!open)
  }

  const onSubmit = async (data: Veiculo) => {
    const cliente = mutateDataStored(data)

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
        <VeiculoForm onSubmit={onSubmit} />
      </Modal>

      <Header
        title="Veículos"
        subTitle="Lista de veículos cadastrados"
        handleClick={handleOpenModal}
        hasButton
      />

      <DataList route="veiculos" data={veiculos} columns={columns} />
    </Box>
  )
}
