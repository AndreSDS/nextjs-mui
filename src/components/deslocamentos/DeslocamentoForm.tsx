'use client'

import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Cliente, Condutor, DeslocamentoCreate, Veiculo } from '@/utils/types'
import { formatISODateToUTC } from '@/utils/formatDate'
import { getStoredData } from '@/lib/queryClient'
import { preFetchData } from '@/lib/queryClient'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { Form } from '@/components/Form'
import { DatePickerComponent } from '../DatePicker'

type Props = {
  onSubmit: (data: DeslocamentoCreate) => Promise<void>
}

export function DeslocamentoForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DeslocamentoCreate>()
  const clientesList: Cliente[] = getStoredData('clientes') || []
  const veiculosList: Veiculo[] = getStoredData('veiculos') || []
  const condutoresList: Condutor[] = getStoredData('condutores') || []

  if (!clientesList || !condutoresList) {
    preFetchData('clientes', getClientes)
    preFetchData('condutores', getCondutores)
  }

  const clientes = clientesList?.map((cliente) => ({
    value: cliente.id,
    label: cliente.nome,
  }))

  const veiculos = veiculosList?.map((veiculo) => ({
    value: veiculo.id,
    label: veiculo.marcaModelo,
  }))

  const condutores = condutoresList?.map((condutor) => ({
    value: condutor.id,
    label: condutor.nome,
  }))

  return (
    <Box display="flex" flexDirection="column">
      <Form
        titleForm="Iniciar Deslocamento"
        subTitleForm="Preencha os campos para iniciar um deslocamento"
        textSubmitBuntton="Iniciar"
        isLoading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            {...register('kmInicial', {
              required: true,
            })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            error={!!errors.kmInicial}
            id="kmInicial"
            label="Km Inicial"
          />

          <DatePickerComponent
            isHour
            onChange={(value) =>
              setValue('inicioDeslocamento', formatISODateToUTC(value))
            }
          />
        </Stack>

        <TextField
          {...register('checkList')}
          error={!!errors.checkList}
          fullWidth
          id="checkList"
          label="Check List"
          multiline
          maxRows={4}
        />

        <TextField
          {...register('motivo')}
          error={!!errors.motivo}
          fullWidth
          id="motivo"
          label="Motivo"
          multiline
          maxRows={4}
        />

        <TextField
          {...register('observacao')}
          error={!!errors.observacao}
          fullWidth
          id="observacao"
          label="Observação"
          multiline
          maxRows={4}
        />

        <TextField
          {...register('idCliente')}
          select
          error={!!errors.idCliente}
          fullWidth
          id="nome"
          label="Nome do Cliente"
          defaultValue=""
        >
          {clientes?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          {...register('idVeiculo', {
            required: true,
          })}
          error={!!errors.idVeiculo}
          fullWidth
          id="veiculo"
          label="Modelo do Veículo"
          defaultValue=""
        >
          {veiculos?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          {...register('idCondutor', {
            required: true,
          })}
          error={!!errors.idCondutor}
          fullWidth
          id="nome"
          label="Nome do Condutor"
          defaultValue=""
        >
          {condutores?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Form>
    </Box>
  )
}
