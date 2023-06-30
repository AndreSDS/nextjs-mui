'use client'

import { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Condutor } from '@/utils/types'
import { queryClient, useFetchData, useMutation } from '@/lib/queryClient'
import { createCondutor, getCondutores } from '@/resources/condutor'
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
  const [openFormCondutor, setOpenFormCondutor] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)
  const [condutorId, setCondutorId] = useState<number>(0)
  const { data: condutores, isFetching } = useFetchData({
    key: 'condutores',
    queryFn: getCondutores,
    dataType: {} as Condutor,
  })

  const {
    mutateAsync: creating,
    isSuccess: created,
    error: failCreate,
  } = useMutation(['condutores'], createCondutor, {
    onSuccess: () => afterAction(),
  })

  const afterAction = () => {
    queryClient.invalidateQueries(['condutores'])
    setOpenFormCondutor(false)
  }

  function handleOpenModal() {
    setOpenFormCondutor(!openFormCondutor)
  }

  const handleCreateCondutor = async (data: Condutor) => {
    try {
      await creating(data)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const openCondutorDetails = (id: number) => {
    setCondutorId(id)
    setOpenDetails(true)
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
        open={created}
        message={
          created
            ? 'Condutor cadastrado com sucesso!'
            : 'Ocorreu um erro ao cadastrar o condutor!'
        }
        severity={failCreate ? 'error' : 'success'}
      />

      <Modal open={openFormCondutor} onClose={handleOpenModal}>
        <CondutorForm onSubmit={handleCreateCondutor} />
      </Modal>

      <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
        <CondutorDetails
          id={condutorId}
          onClose={() => setOpenDetails(false)}
        />
      </Modal>

      <DataListComponent
        headerTitle="Condutores"
        headerSubTitle="Lista de condutores cadastrados"
        hasButton
        handleClickHeader={handleOpenModal}
        handleClickItem={openCondutorDetails}
        data={condutores}
        columns={columns}
      />
    </Box>
  )
}
