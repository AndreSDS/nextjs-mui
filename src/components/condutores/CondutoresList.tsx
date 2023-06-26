'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@/lib/queryClient'
import { Condutor } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { Header } from '@/components/Header'
import { DataList } from '@/components/DataList'
import { createCondutor, getCondutores } from '@/resources/condutor'
import { CondutorForm } from '@/components/condutores/CondutorForm'
import { useMutateData } from '@/hooks/useMutateData'

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
  const [open, setOpen] = useState(false)
  const { data: condutores, isFetching } = useQuery({
    queryKey: ['condutores'],
    queryFn: getCondutores,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  const { mutate } = useMutateData('condutores', {} as Condutor, createCondutor)

  function handleOpenModal() {
    setOpen(!open)
  }

  const onSubmit = async (data: Condutor) => {
    const condutor = mutate(data)

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
        <CondutorForm onSubmit={onSubmit} />
      </Modal>

      <Header
        title="Condutores"
        subTitle="Lista de condutores cadastrados"
        handleClick={handleOpenModal}
        hasButton
      />

      <DataList route="condutores" data={condutores} columns={columns} />
    </Box>
  )
}
