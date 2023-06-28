'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Deslocamento } from '@/utils/types'
import { preFetchData, useFetchData } from '@/lib/queryClient'
import { Modal } from '@/components/Modal'
import { Header } from '@/components/Header'
import { DataList } from '@/components/DataList'
import { DeslocamentoForm } from '@/components/deslocamentos/DeslocamentoForm'
import { DeslocamentoDetail } from '@/components/deslocamentos/DeslocamentoDetail'
import { DeslocamentoEditForm } from '@/components/deslocamentos/DeslocamentoEditForm'
import { getDeslocamentos } from '@/resources/deslocamentos'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { getVeiculos } from '@/resources/veiculo'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.7 },
  { field: 'kmInicial', headerName: 'Km Inicial', flex: 0.7 },
  { field: 'kmFinal', headerName: 'Km Final', flex: 0.7 },
  {
    field: 'inicioDeslocamento',
    headerName: 'Início do Deslocamento',
    flex: 1,
  },
  { field: 'fimDeslocamento', headerName: 'Fim do Deslocamento', flex: 1 },
  { field: 'motivo', headerName: 'Motivo', flex: 1.5 },
]

export function DeslocamentosList() {
  const [openFormDeslocamento, setOpenFormDeslocamento] = useState(false)
  const [deslocamentoDetails, setOpenDeslocamentoDetails] = useState(false)
  const [deslocamentoId, setDeslocamentoId] = useState<number | undefined>(
    undefined,
  )
  const { data: deslocamentos, isFetching } = useFetchData({
    key: 'deslocamentos',
    queryFn: getDeslocamentos,
    dataType: {} as Deslocamento,
  })

  const preFetchingData = async () => {
    await Promise.all([
      preFetchData('clientes', getClientes),
      preFetchData('condutores', getCondutores),
      preFetchData('veiculos', getVeiculos),
    ])
  }

  const openDeslocamentoForm = async () => {
    await preFetchingData()
    setOpenFormDeslocamento(!openFormDeslocamento)
  }

  const closeFormDeslocamento = () => {
    setOpenFormDeslocamento(!openFormDeslocamento)
  }

  const handleDelete = async () => {
    setOpenDeslocamentoDetails(false)
  }

  const handleEdit = async () => {
    setOpenDeslocamentoDetails(false)
  }

  const openDeslocamentoDetails = async (id: number) => {
    await preFetchingData()

    setDeslocamentoId(id)
    setOpenDeslocamentoDetails(true)
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
      <Modal
        open={openFormDeslocamento}
        onClose={() => setOpenFormDeslocamento(false)}
      >
        <DeslocamentoForm handleClose={closeFormDeslocamento} />
      </Modal>

      <Modal
        open={deslocamentoDetails}
        onClose={() => setOpenDeslocamentoDetails(false)}
      >
        <DeslocamentoDetail
          id={deslocamentoId || 0}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </Modal>

      <Header
        title="Deslocamentos"
        subTitle="Lista de deslocamentos"
        handleClick={openDeslocamentoForm}
        hasButton
      />

      <DataList
        handleClick={openDeslocamentoDetails}
        data={deslocamentos}
        columns={columns}
      />
    </Box>
  )
}
