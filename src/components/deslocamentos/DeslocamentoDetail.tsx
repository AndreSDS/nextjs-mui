'use client'

import { useState } from 'react'
import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { Alarm, AlarmOn, Place, WhereToVote } from '@mui/icons-material'
import { getStoredItem, queryClient, useMutation } from '@/lib/queryClient'
import {
  deleteDeslocamento,
  encerrarDeslocamento,
} from '@/resources/deslocamentos'
import {
  Cliente,
  Condutor,
  DeslocamentoDetails,
  DeslocamentoEdit,
  Veiculo,
} from '@/utils/types'
import { Modal } from '@/components/Modal'
import { DeslocamentoEditForm } from '@/components/deslocamentos/DeslocamentoEditForm'
import { ButtonComponent } from '@/components/ButtonComponent'
import { SnackBarComponent } from '@/components/SnackBarComponent'

type Props = {
  id: number
  handleClose: () => void
}

export function DeslocamentoDetail({ id, handleClose }: Props) {
  const [openEditForm, setOpenEditForm] = useState(false)
  const deslocamentoDetails = getStoredItem(
    'deslocamentos',
    id,
  ) as DeslocamentoDetails
  const cliente = getStoredItem('clientes', id) as Cliente
  const condutor = getStoredItem('condutores', id) as Condutor
  const veiculo = getStoredItem('veiculos', id) as Veiculo

  deslocamentoDetails.nomeCliente = cliente.nome
  deslocamentoDetails.nomeCondutor = condutor.nome
  deslocamentoDetails.nomeVeiculo = veiculo.marcaModelo

  const {
    kmInicial,
    kmFinal,
    inicioDeslocamento,
    fimDeslocamento,
    motivo,
    checkList,
    observacao,
    nomeCliente,
    nomeCondutor,
    nomeVeiculo,
  } = deslocamentoDetails

  const afterAction = () => {
    queryClient.invalidateQueries(['deslocamentos'])
    setOpenEditForm(false)
  }

  const {
    mutateAsync: updating,
    isSuccess: updated,
    error: failUpdate,
  } = useMutation(['deslocamentos'], encerrarDeslocamento, {
    onSuccess: () => {
      afterAction()
    },
  })

  const {
    mutateAsync: deleting,
    isSuccess: deleted,
    error: failDelete,
  } = useMutation(['deslocamentos'], deleteDeslocamento, {
    onSuccess: () => {
      afterAction()
      handleClose()
    },
  })

  const onDelete = async () => {
    try {
      await deleting(id)
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  const handleCncerrarDeslocamento = async (deslocamento: DeslocamentoEdit) => {
    try {
      if (!deslocamento.fimDeslocamento) {
        deslocamento.fimDeslocamento = new Date().toISOString()
      }
      const deslocamentoEdit: DeslocamentoEdit = {
        id,
        ...deslocamento,
      }

      await updating(deslocamentoEdit)
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  const snackMessages = {
    updated: 'Deslocamento encerrado com sucesso!',
    deleted: 'Deslocamento deletado com sucesso!',
    failUpdate: 'Erro ao encerrar deslocamento!',
    failDelete: 'Erro ao deletar deslocamento!',
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
        <DeslocamentoEditForm onSubmit={handleCncerrarDeslocamento} />
      </Modal>

      <Paper
        sx={{
          padding: '1.5rem',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body1">
            Nome do Cliente: {nomeCliente}
          </Typography>

          <Divider />

          <Typography variant="body1">
            Nome do Condutor: {nomeCondutor}
          </Typography>

          <Divider />

          <Typography variant="body1">Veículo: {nomeVeiculo}</Typography>

          <Divider />

          <Stack direction="row" spacing={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Place
                sx={{
                  marginRight: '0.5rem',
                }}
              />
              <Typography variant="body1">Km Inicial: {kmInicial}</Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <WhereToVote
                sx={{
                  marginRight: '0.5rem',
                }}
              />
              <Typography variant="body1">Km Final: {kmFinal}</Typography>
            </Box>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Alarm
                sx={{
                  marginRight: '0.5rem',
                }}
              />
              <Typography variant="body1">
                Início: {inicioDeslocamento}
              </Typography>
            </Box>

            <Typography variant="body1">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <AlarmOn
                  sx={{
                    marginRight: '0.5rem',
                  }}
                />
                Fim: {fimDeslocamento || 'em andamento'}
              </Box>
            </Typography>
          </Stack>

          <Divider />

          <Typography variant="body1">Motivo: {motivo}</Typography>

          <Divider />

          <Typography variant="body1">Check List: {checkList}</Typography>

          <Divider />

          <Typography variant="body1">Observação: {observacao}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={3}>
          <ButtonComponent
            textButton="Deletar"
            hasIcon="delete"
            onClick={onDelete}
            disabled={false}
          />

          <ButtonComponent
            textButton="Encerrar"
            hasIcon="edit"
            onClick={() => setOpenEditForm(true)}
            disabled={false}
          />
        </Stack>
      </Paper>
    </Box>
  )
}
