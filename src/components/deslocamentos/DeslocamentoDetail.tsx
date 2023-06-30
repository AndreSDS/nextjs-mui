'use client'

import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { Alarm, AlarmOn, Place, WhereToVote } from '@mui/icons-material'
import { getStoredItem } from '@/lib/queryClient'
import {
  Cliente,
  Condutor,
  Deslocamento,
  DeslocamentoDetails,
  Veiculo,
} from '@/utils/types'
import { ButtonComponent } from '@/components/ButtonComponent'

type Props = {
  deslocamento: Deslocamento
  openEditForm: () => void
  onDelete: () => void
  isDeleting: boolean
}

export function DeslocamentoDetail({
  deslocamento,
  onDelete,
  openEditForm,
  isDeleting = false,
}: Props) {
  const cliente = getStoredItem('clientes', deslocamento.idCliente) as Cliente
  const condutor = getStoredItem(
    'condutores',
    deslocamento.idCondutor,
  ) as Condutor
  const veiculo = getStoredItem('veiculos', deslocamento.idVeiculo) as Veiculo

  const deslocamentoDetails = {
    ...deslocamento,
    nomeCliente: cliente.nome,
    nomeCondutor: condutor.nome,
    nomeVeiculo: veiculo.marcaModelo,
  } as DeslocamentoDetails

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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100%"
      width="100%"
    >
      <Paper
        sx={{
          padding: '1.5rem',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.25rem',
            lineHeight: 1.2,
            fontWeight: 600,
            mb: 1,
          }}
        >
          Deslocamento
        </Typography>

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
            disabled={isDeleting}
          />

          {kmFinal ? null : (
            <ButtonComponent
              textButton="Encerrar"
              hasIcon="edit"
              onClick={openEditForm}
            />
          )}
        </Stack>
      </Paper>
    </Box>
  )
}
