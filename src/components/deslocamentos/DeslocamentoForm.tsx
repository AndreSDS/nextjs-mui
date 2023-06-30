'use client'

import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Cliente, Condutor, DeslocamentoCreate, Veiculo } from '@/utils/types'
import { formatISODateToUTC } from '@/utils/formatDate'
import { getStoredData, queryClient, useMutation } from '@/lib/queryClient'
import { preFetchData } from '@/lib/queryClient'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { iniciarDeslocamento } from '@/resources/deslocamentos'
import { Form } from '@/components/Form'
import { DatePickerComponent } from '../DatePicker'
import { SnackBarComponent } from '../SnackBarComponent'

type Props = {
  handleClose: () => void
}

export function DeslocamentoForm({ handleClose }: Props) {
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

  const {
    mutateAsync: creating,
    isSuccess: created,
    error: failCreate,
  } = useMutation(['deslocamentos'], iniciarDeslocamento, {
    onSuccess: () => {
      queryClient.invalidateQueries(['deslocamentos'])
      handleClose()
    },
  })

  const novoDeslocamento = async (deslocamento: DeslocamentoCreate) => {
    try {
      if (!deslocamento.inicioDeslocamento) {
        deslocamento.inicioDeslocamento = new Date().toISOString()
      }

      await creating(deslocamento)
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <SnackBarComponent
        open={created}
        message={
          created
            ? 'Deslocalmento iniciado com sucesso!'
            : 'Ocorreu um erro ao iniciar o deslocamento!'
        }
        severity={failCreate ? 'error' : 'success'}
      />

      <Form
        titleForm="Iniciar Deslocamento"
        subTitleForm="Preencha os campos para iniciar um deslocamento"
        textSubmitBuntton="Iniciar"
        isLoading={isSubmitting}
        onSubmit={handleSubmit(novoDeslocamento)}
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
