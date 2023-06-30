'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { queryClient, useFetchData, useMutation } from '@/lib/queryClient'
import { createVeiculo, getVeiculos } from '@/resources/veiculo'
import { Veiculo } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { DataListComponent } from '@/components/DataList'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { VeiculoForm } from '@/components/veiculos/VeiculoForm'
import { VeiculoDetails } from '@/components/veiculos/VeiculoDetails'
import { Box } from '@mui/material'
import { SnackBarComponent } from '../SnackBarComponent'

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
  const [openVeiculoForm, setOpenVeiculoForm] = useState(false)
  const [openVeiculoDetails, setOpenVeiculoDetails] = useState(false)
  const [veiculoId, setVeiculoId] = useState<number | undefined>(undefined)
  const { data: veiculos, isFetching } = useFetchData({
    key: 'veiculos',
    queryFn: getVeiculos,
    dataType: {} as Veiculo,
  })

  const creating = useMutation(['veiculos'], createVeiculo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['veiculos'])
      setOpenVeiculoForm(false)
    },
  })

  const handleCreateVeiculo = async (data: Veiculo) => {
    try {
      if (!data.marcaModelo) data.marcaModelo = ''
      if (!data.placa) data.placa = ''

      await creating.mutateAsync(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const openDetails = (id: number) => {
    setVeiculoId(id)
    setOpenVeiculoDetails(!openVeiculoDetails)
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
        open={creating.isSuccess || creating.isError}
        message={
          creating.isSuccess
            ? 'Veículo cadastrado com sucesso!'
            : 'Error ao cadastrar veículo!'
        }
        severity={creating.isSuccess ? 'success' : 'error'}
      />

      <Modal open={openVeiculoForm} onClose={() => setOpenVeiculoForm(false)}>
        <VeiculoForm
          titleForm="Cadastrar Veículo"
          subTitleForm="Preencha os campos para cadastrar um condutor"
          textSubmitBuntton="Cadastrar"
          onSubmit={handleCreateVeiculo}
        />
      </Modal>

      <Modal
        open={openVeiculoDetails}
        onClose={() => setOpenVeiculoDetails(false)}
      >
        <VeiculoDetails
          handleClose={() => setOpenVeiculoDetails(false)}
          id={veiculoId || 0}
        />
      </Modal>

      <DataListComponent
        headerTitle="Veículos"
        headerSubTitle="Lista de veículos cadastrados"
        hasButton
        handleClickHeader={() => setOpenVeiculoForm(true)}
        handleClickItem={openDetails}
        data={veiculos}
        columns={columns}
      />
    </Box>
  )
}
