'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Deslocamento } from '@/utils/types'
import { preFetchData, useFetchData } from '@/lib/queryClient'
import { Modal } from '@/components/Modal'
import { DataListComponent } from '@/components/DataList'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { DeslocamentoForm } from '@/components/deslocamentos/DeslocamentoForm'
import { DeslocamentoDetail } from '@/components/deslocamentos/DeslocamentoDetail'
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

  const handleCloseDetails = async () => {
    setOpenDeslocamentoDetails(false)
  }

  const openDeslocamentoDetails = async (id: number) => {
    await preFetchingData()

    setDeslocamentoId(id)
    setOpenDeslocamentoDetails(true)
  }

  if (isFetching) {
    return <LoadingSpinner />
  }

  return (
    <>
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
          handleClose={handleCloseDetails}
        />
      </Modal>

      <DataListComponent
        headerTitle="Deslocamentos"
        headerSubTitle="Lista de deslocamentos"
        hasButton
        handleClickHeader={openDeslocamentoForm}
        handleClickItem={openDeslocamentoDetails}
        data={deslocamentos}
        columns={columns}
      />
    </>
  )
}
