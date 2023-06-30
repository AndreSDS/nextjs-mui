'use client'

import { useState } from 'react'
import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { getStoredItem, queryClient, useMutation } from '@/lib/queryClient'
import { deleteVeiculo, updateVeiculo } from '@/resources/veiculo'
import { Veiculo } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { VeiculoForm } from '@/components/veiculos/VeiculoForm'
import { ButtonComponent } from '@/components/ButtonComponent'
import { SnackBarComponent } from '../SnackBarComponent'

type Props = {
  id: number
  handleClose: () => void
}

export function VeiculoDetails({ id, handleClose }: Props) {
  const [openEditForm, setOpenEditForm] = useState(false)
  const veiculo = getStoredItem('veiculos', id) as Veiculo

  const { id: veiculoId, placa, marcaModelo, anoFabricacao, kmAtual } = veiculo

  const {
    mutateAsync: updating,
    isSuccess: updated,
    isError: failUpdate,
  } = useMutation(['veiculos'], updateVeiculo, {
    onSuccess: () => afterAction(),
  })

  const {
    mutateAsync: deleting,
    isSuccess: deleted,
    isError: failDelete,
  } = useMutation(['veiculos'], deleteVeiculo, {
    onSuccess: () => {
      afterAction()
      handleClose()
    },
  })

  const onEdit = () => {
    setOpenEditForm(true)
  }

  const afterAction = () => {
    queryClient.invalidateQueries(['veiculos'])
    setOpenEditForm(false)
  }

  const alterarVeiculo = async (veiculo: Veiculo) => {
    const veiculoToUpdate = {
      id: veiculoId,
      ...veiculo,
    }
    try {
      await updating(veiculoToUpdate)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const deletarVeiculo = async () => {
    try {
      await deleting(id)
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const snackMessages = {
    updated: 'Veículo encerrado com sucesso!',
    deleted: 'Veículo deletado com sucesso!',
    failUpdate: 'Erro ao encerrar veículo!',
    failDelete: 'Erro ao deletar veículo!',
  }

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <SnackBarComponent
        open={updated}
        message={updated ? snackMessages.updated : snackMessages.failUpdate}
        severity={failUpdate ? 'error' : 'success'}
      />

      <SnackBarComponent
        open={deleted}
        message={deleted ? snackMessages.deleted : snackMessages.failDelete}
        severity={failDelete ? 'error' : 'success'}
      />

      <Modal open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <VeiculoForm
          titleForm="Alterar Veículo"
          subTitleForm="Preencha os campos para alterar"
          textSubmitBuntton="Salvar"
          initialValues={veiculo}
          onSubmit={alterarVeiculo}
        />
      </Modal>

      <Paper
        sx={{
          padding: '1.5rem',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">{marcaModelo}</Typography>

          <Divider />

          <Typography variant="body1">Placa: {placa}</Typography>

          <Divider />

          <Typography variant="body1">
            Ano de Fabricação: {anoFabricacao}
          </Typography>

          <Divider />

          <Typography variant="body1">Km Atual: {kmAtual}</Typography>
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end" spacing={3}>
          <ButtonComponent
            textButton="Deletar"
            hasIcon="delete"
            onClick={deletarVeiculo}
            disabled={false}
          />

          <ButtonComponent
            textButton="Editar"
            hasIcon="edit"
            onClick={onEdit}
            disabled={false}
          />
        </Stack>
      </Paper>
    </Box>
  )
}
