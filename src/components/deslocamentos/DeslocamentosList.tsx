'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Deslocamento, DeslocamentoCreate, DeslocamentoEdit } from '@/utils/types'
import {
  getStoredItem,
  preFetchData,
  queryClient,
  useFetchData,
  useMutation,
} from '@/lib/queryClient'
import { Modal } from '@/components/Modal'
import { DataListComponent } from '@/components/DataList'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { DeslocamentoForm } from '@/components/deslocamentos/DeslocamentoForm'
import { DeslocamentoDetail } from '@/components/deslocamentos/DeslocamentoDetail'
import {
  deleteDeslocamento,
  encerrarDeslocamento,
  getDeslocamentos,
  iniciarDeslocamento,
} from '@/resources/deslocamentos'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { getVeiculos } from '@/resources/veiculo'
import { Box } from '@mui/material'
import { SnackBarComponent } from '../SnackBarComponent'
import { DeslocamentoEditForm } from './DeslocamentoEditForm'

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
  const [openEditForm, setOpenEditForm] = useState(false)
  const [deslocamentoDetails, setOpenDeslocamentoDetails] = useState(false)
  const [deslocamentoId, setDeslocamentoId] = useState<any>(null)
  const { data: deslocamentos, isFetching } = useFetchData({
    key: 'deslocamentos',
    queryFn: getDeslocamentos,
    dataType: {} as Deslocamento,
  })

  const deslocamento = getStoredItem(
    'deslocamentos',
    deslocamentoId,
  ) as Deslocamento

  const preFetchingData = async () => {
    await Promise.all([
      preFetchData('clientes', getClientes),
      preFetchData('condutores', getCondutores),
      preFetchData('veiculos', getVeiculos),
    ])
  }
  const afterActions = () => {
    queryClient.invalidateQueries(['deslocamentos'])
    setOpenDeslocamentoDetails(false)
    setOpenFormDeslocamento(false)
    setOpenEditForm(false)
  }

  const creating = useMutation(['deslocamentos'], iniciarDeslocamento, {
    onSuccess: () => afterActions(),
  })

  const updating = useMutation(['deslocamentos'], encerrarDeslocamento, {
    onSuccess: () => {
      afterActions()
      setOpenDeslocamentoDetails(false)
    },
  })

  const deleting = useMutation(['deslocamentos'], deleteDeslocamento, {
    onSuccess: () => {
      afterActions()
    },
  })

  const handleCreateDeslocamento = async (deslocamentoCreate: DeslocamentoCreate) => {
    try {
      if (!deslocamentoCreate.inicioDeslocamento) {
        deslocamentoCreate.inicioDeslocamento = new Date().toISOString()
      }

      await creating.mutateAsync(deslocamentoCreate)
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  const handleUpdateDeslocamento = async (
    deslocamentoEdit: DeslocamentoEdit,
  ) => {
    try {
      if (!deslocamento.fimDeslocamento) {
        deslocamento.fimDeslocamento = new Date().toISOString()
      }
      const deslocamentoToEdit: DeslocamentoEdit = {
        id: deslocamento.id,
        ...deslocamentoEdit,
      }

      await updating.mutateAsync(deslocamentoToEdit)
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  const handleDeleteDeslocamento = async () => {
    try {
      await deleting.mutateAsync(deslocamentoId)
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  const openDeslocamentoForm = async () => {
    await preFetchingData()
    setOpenFormDeslocamento(!openFormDeslocamento)
  }

  const closeFormDeslocamento = () => {
    setOpenFormDeslocamento(!openFormDeslocamento)
  }

  const handleCloseDetails = () => {
    setOpenDeslocamentoDetails(false)
  }

  const openDeslocamentoDetails = async (id: number) => {
    setDeslocamentoId(id)

    await preFetchingData()

    setOpenDeslocamentoDetails(true)
  }

  if (isFetching) {
    return <LoadingSpinner />
  }

  const snackMessages = {
    created: 'Deslocalmento iniciado com sucesso!',
    updated: 'Deslocamento encerrado com sucesso!',
    deleted: 'Deslocamento deletado com sucesso!',
    failCreate: 'Erro ao iniciar deslocamento!',
    failUpdate: 'Erro ao encerrar deslocamento!',
    failDelete: 'Erro ao deletar deslocamento!',
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
            ? 'Deslocalmento iniciado com sucesso!'
            : 'Ocorreu um erro ao iniciar o deslocamento!'
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

      <Modal
        open={openFormDeslocamento}
        onClose={() => setOpenFormDeslocamento(false)}
      >
        <DeslocamentoForm onSubmit={handleCreateDeslocamento} />
      </Modal>

      <Modal open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DeslocamentoEditForm id={deslocamentoId} onSubmit={handleUpdateDeslocamento} />
      </Modal>

      <Modal
        open={deslocamentoDetails}
        onClose={() => setOpenDeslocamentoDetails(false)}
      >
        <DeslocamentoDetail
          deslocamento={deslocamento}
          openEditForm={() => setOpenEditForm(true)}
          onDelete={handleDeleteDeslocamento}
          isDeleting={deleting.isLoading}
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
    </Box>
  )
}
