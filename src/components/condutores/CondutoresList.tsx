'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Condutor } from '@/utils/types'
import {
  getStoredItem,
  queryClient,
  useFetchData,
  useMutation,
} from '@/lib/queryClient'
import {
  createCondutor,
  deleteCondutor,
  getCondutores,
  updateCondutor,
} from '@/resources/condutor'
import { SnackBarComponent } from '@/components/SnackBarComponent'
import { Modal } from '@/components/Modal'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { DataListComponent } from '@/components/DataList'
import { CondutorForm } from '@/components/condutores/CondutorForm'
import { CondutorDetails } from '@/components/condutores/CondutorDetails'
import { Box } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'nome', headerName: 'Nome', flex: 1.5 },
  { field: 'numeroHabilitacao', headerName: 'Número da Habilitação', flex: 1 },
  {
    field: 'categoriaHabilitacao',
    headerName: 'Categoria da Habilitação',
    flex: 1,
  },
  {
    field: 'vencimentoHabilitacao',
    headerName: 'Vencimento da Habilitação',
    flex: 1,
  },
]

export function CondutoresList() {
  const [openCondutorForm, setOpenCondutorForm] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)
  const [condutorId, setCondutorId] = useState<any>(null)
  const { data: condutores, isFetching } = useFetchData({
    key: 'condutores',
    queryFn: getCondutores,
    dataType: {} as Condutor,
  })

  const condutor: Condutor =
    getStoredItem('condutores', condutorId as number) || ({} as Condutor)

  const afterActions = () => {
    queryClient.invalidateQueries(['condutores'])
    setOpenCondutorForm(false)
    setOpenDetails(false)
  }

  const creating = useMutation(['condutores'], createCondutor, {
    onSuccess: () => afterActions(),
  })

  const updating = useMutation(['condutores'], updateCondutor, {
    onSuccess: () => {
      setCondutorId(null)
      afterActions()
    },
  })

  const deleting = useMutation(['condutores'], deleteCondutor, {
    onSuccess: () => {
      setCondutorId(null)
      afterActions()
    },
  })

  const handleCreateCondutor = async (data: Condutor) => {
    try {
      await creating.mutateAsync(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleUpdateCondutor = async (data: Condutor) => {
    try {
      await updating.mutateAsync(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleDeleteCondutor = async () => {
    try {
      await deleting.mutateAsync(condutorId)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const handleOpenCondutorForm = () => {
    setOpenCondutorForm(true)
  }

  const handleOpenDetails = (id: number) => {
    setCondutorId(id)
    setOpenDetails(true)
  }

  if (isFetching) {
    return <LoadingSpinner />
  }

  const snackMessages = {
    created: 'Condutor cadastrado com sucesso!',
    updated: 'Condutor alterado com sucesso!',
    deleted: 'Condutor deletado com sucesso!',
    failCreate: 'Erro ao cadastrar condutor!',
    failUpdate: 'Erro ao alterar condutor!',
    failDelete: 'Erro ao deletar condutor!',
  }

  const ModalContent = () => {
    return (
      <>
        {condutorId ? (
          <CondutorForm
            titleForm="Atualizar dados do condutor"
            subTitleForm="Preencha os dados do condutor"
            initialValues={condutor}
            onSubmit={handleUpdateCondutor}
          />
        ) : (
          <CondutorForm
            titleForm="Cadastrar novo condutor"
            subTitleForm="Preencha os dados do condutor"
            onSubmit={handleDeleteCondutor}
          />
        )}
      </>
    )
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
          creating.isSuccess ? snackMessages.created : snackMessages.failCreate
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

      <Modal open={openCondutorForm} onClose={() => setOpenCondutorForm(false)}>
        <ModalContent />
      </Modal>

      <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
        <CondutorDetails
          openEditForm={handleOpenCondutorForm}
          onDelete={handleDeleteCondutor}
          condutor={condutor}
        />
      </Modal>

      <DataListComponent
        headerTitle="Condutores"
        headerSubTitle="Lista de condutores cadastrados"
        hasButton
        handleClickHeader={handleOpenCondutorForm}
        handleClickItem={handleOpenDetails}
        data={condutores}
        columns={columns}
      />
    </Box>
  )
}
