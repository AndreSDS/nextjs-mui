'use client'

import {
  Alarm,
  AlarmOn,
  Delete,
  Edit,
  Place,
  WhereToVote,
} from '@mui/icons-material'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'

type Props = {
  deslocamento: any
  handleDelete: () => void
  handleEdit: () => void
}

export function DeslocamentoDetail({ deslocamento, handleDelete, handleEdit }: Props) {
  const {
    kmInicial,
    kmFinal,
    inicioDeslocamento,
    fimDeslocamento,
    motivo,
    checkList,
    observacao,
    cliente,
    condutor,
    veiculo,
  } = deslocamento

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <Paper
        sx={{
          padding: '1.5rem',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body1">Nome do Cliente: {cliente}</Typography>

          <Divider />

          <Typography variant="body1">Nome do Condutor: {condutor}</Typography>

          <Divider />

          <Typography variant="body1">Veículo: {veiculo}</Typography>

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
                Fim: {fimDeslocamento}
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
            onClick={handleDelete}
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
            Editar
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
