'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Deslocamento } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { Header } from '@/components/Header'
import { DataList } from '@/components/DataList'
import {
  iniciarDeslocamento,
  getDeslocamentos,
  deleteDeslocamento,
  encerrarDeslocamento,
} from '@/resources/deslocamentos'
import { DeslocamentoForm } from '@/components/deslocamentos/DeslocamentoForm'
import {
  getStoredItem,
  preFetchData,
  queryClient,
  useFetchData,
} from '@/lib/queryClient'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { getVeiculos } from '@/resources/veiculo'
import { DeslocamentoDetail } from './DeslocamentoDetail'

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
  const [openForm, setOpenForm] = useState(false)
  const [openDeslocamento, setOpenDeslocamento] = useState(false)
  const [deslocamentoDetail, setDeslocamentoDetail] = useState<any>(null)
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

  const novoDeslocamento = async (data: Deslocamento) => {
    const novoDeslocamento = await iniciarDeslocamento(data)

    if (novoDeslocamento.id) {
      queryClient.setQueryData(['deslocamentos'], (oldData: any) => {
        const newData = oldData.filter((d: any) => d.id !== novoDeslocamento.id)
        return [...newData, novoDeslocamento]
      })

      setOpenForm(!openForm)
    }
  }

  const updateDeslocamento = async (deslocamento: Deslocamento) => {
    const editedId = await encerrarDeslocamento(deslocamento)

    if (editedId) {
      queryClient.setQueryData(['deslocamentos'], (oldData: any) => {
        return oldData.map((d: Deslocamento) => {
          if (d.id === editedId) {
            return {
              ...d,
              fimDeslocamento: new Date().toISOString(),
            }
          }

          return d
        })
      })

      setDeslocamentoDetail(null)
      setOpenDeslocamento(false)
    }
  }

  const onSubmit = async (data: Deslocamento) => {
    if (deslocamentoDetail) {
      await updateDeslocamento(data)
    } else {
      await novoDeslocamento(data)
    }
  }

  const openDeslocamentoForm = async () => {
    await preFetchingData()

    setOpenForm(!openForm)
  }

  const openDeslocamentoDetails = async (id: number) => {
    await preFetchingData()

    const deslocamento: Deslocamento = deslocamentos?.find((d) => d.id === id)
    const cliente = getStoredItem('clientes', deslocamento?.idCliente)
    const condutor = getStoredItem('condutores', deslocamento?.idCondutor)
    const veiculo = getStoredItem('veiculos', deslocamento?.idVeiculo)

    const deslocamentoDetail = {
      ...deslocamento,
      cliente: cliente?.nome,
      condutor: condutor?.nome,
      veiculo: veiculo?.placa,
    }

    setDeslocamentoDetail(deslocamentoDetail)
    setOpenDeslocamento(true)
  }

  const handleDelete = async () => {
    const { id } = deslocamentoDetail
    const deletedId = await deleteDeslocamento(id)

    if (deletedId) {
      await queryClient.setQueryData(['deslocamentos'], (old: any) => {
        return old.filter((d: any) => d.id !== deletedId)
      })

      setDeslocamentoDetail(null)
      setOpenDeslocamento(false)
    }
  }

  const openEditForm = async () => {
    setOpenForm(true)
    setOpenDeslocamento(false)
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
      <Modal open={openForm} onClose={() => setOpenForm(false)}>
        <DeslocamentoForm onSubmit={onSubmit} initialValues={deslocamentoDetail} />
      </Modal>

      <Modal open={openDeslocamento} onClose={() => setOpenDeslocamento(false)}>
        <DeslocamentoDetail
          handleDelete={handleDelete}
          handleEdit={openEditForm}
          deslocamento={deslocamentoDetail}
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
