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
import { TypographyWithIcon } from '@/components/deslocamentos/TypographyWithIcon'

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
      width="400px"
    >
      <Paper
        sx={{
          padding: '1.5rem',
          width: '100%',
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
            <TypographyWithIcon
              text={`Km Inicial: ${kmInicial}`}
              icon={<Place />}
            />

            <TypographyWithIcon
              text={`Km Final: ${kmFinal}`}
              icon={<WhereToVote />}
            />
          </Stack>

          <Divider />

          <Stack direction="row" spacing={2}>
            <TypographyWithIcon
              text={`Início: ${inicioDeslocamento}`}
              icon={<Alarm />}
            />

            <TypographyWithIcon
              text={`Fim: ${fimDeslocamento}`}
              icon={<AlarmOn />}
            />
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
