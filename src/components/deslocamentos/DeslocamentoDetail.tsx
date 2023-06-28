'use client'

import { useState } from 'react'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import {
  Alarm,
  AlarmOn,
  Delete,
  Edit,
  Place,
  WhereToVote,
} from '@mui/icons-material'
import { getStoredItem, queryClient } from '@/lib/queryClient'
import { deleteDeslocamento } from '@/resources/deslocamentos'
import { DeslocamentoDetails, DeslocamentoEdit } from '@/utils/types'
import { Modal } from '@/components/Modal'
import { DeslocamentoEditForm } from '@/components/deslocamentos/DeslocamentoEditForm'

type Props = {
  id: number
  handleDelete: () => void
  handleEdit: () => void
}

export function DeslocamentoDetail({ id, handleDelete, handleEdit }: Props) {
  const [openEditForm, setOpenEditForm] = useState(false)
  const deslocamentoDetails: DeslocamentoDetails = getStoredItem(
    'deslocamentos',
    id,
  )
  const cliente = getStoredItem('clientes', id)
  const condutor = getStoredItem('condutores', id)
  const veiculo = getStoredItem('veiculos', id)

  deslocamentoDetails.nomeCliente = cliente.nome
  deslocamentoDetails.nomeCondutor = condutor.nome
  deslocamentoDetails.nomeVeiculo = veiculo.nome

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

  const onDelete = async () => {
    try {
      await deleteDeslocamento(id)
      queryClient.invalidateQueries(['deslocamentos'])
      handleDelete()
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  const encerrarDeslocamento = async (deslocamento: DeslocamentoEdit) => {
    try {
      if (!deslocamento.fimDeslocamento) {
        deslocamento.fimDeslocamento = new Date().toISOString()
      }
      const deslocamentoEdit: DeslocamentoEdit = {
        id,
        ...deslocamento,
      }

      await encerrarDeslocamento(deslocamentoEdit)

      queryClient.invalidateQueries(['deslocamentos'])

      setOpenEditForm(false)
      handleEdit()
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
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
        <DeslocamentoEditForm onSubmit={encerrarDeslocamento} />
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
          <Button
            onClick={onDelete}
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
            onClick={handleEdit}
            disabled={false}
            variant="contained"
            color="info"
            startIcon={<Edit />}
            sx={{
              alignSelf: 'flex-end',
              marginTop: '1.5rem',
            }}
          >
            Encerrar
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
