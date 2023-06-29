'use client'

import { useState } from 'react'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { getStoredItem, queryClient } from '@/lib/queryClient'
import { deleteVeiculo, updateVeiculo } from '@/resources/veiculo'
import { Veiculo } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { VeiculoForm } from '@/components/veiculos/VeiculoForm'

type Props = {
  id: number
  handleClose: () => void
}

export function VeiculoDetails({ id, handleClose }: Props) {
  const [openEditForm, setOpenEditForm] = useState(false)
  const veiculo: Veiculo = getStoredItem('veiculos', id)

  const { id: veiculoId, placa, marcaModelo, anoFabricacao, kmAtual } = veiculo

  const onEdit = () => {
    setOpenEditForm(true)
  }

  const afterAction = () => {
    queryClient.invalidateQueries(['veiculos'])
    setOpenEditForm(false)
    handleClose()
  }

  const alterarVeiculo = async (veiculo: Veiculo) => {
    const veiculoToUpdate = {
      id: veiculoId,
      ...veiculo,
    }
    try {
      await updateVeiculo(veiculoToUpdate)
      afterAction()
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  const deletarVeiculo = async () => {
    try {
      await deleteVeiculo(id)
      afterAction()
    } catch (error) {
      const { response } = error as any
      console.log(response)
    }
  }

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      height="100%"
      width="100%"
    >
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
          <Button
            onClick={deletarVeiculo}
            disabled={false}
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            sx={{
              alignSelf: 'flex-end',
              marginTop: '1.5rem',
            }}
          >
            Deletar
          </Button>

          <Button
            onClick={onEdit}
            disabled={false}
            variant="contained"
            color="info"
            startIcon={<Edit />}
            sx={{
              alignSelf: 'flex-end',
              marginTop: '1.5rem',
            }}
          >
            Editar
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
