'use client'

import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Cliente, Condutor, Deslocamento, Veiculo } from '@/utils/types'
import { getStoredData, queryClient } from '@/lib/queryClient'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { Form } from '@/components/Form'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'

type FormInputs = {
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

type Props = {
  initialValues?: Deslocamento
  onSubmit: (data: Deslocamento) => void
}

const categoryOptions = [
  {
    value: 'CPF',
    label: 'CPF',
  },
  {
    value: 'RG',
    label: 'RG',
  },
  {
    value: 'CNH',
    label: 'CNH',
  },
  {
    value: 'Outro',
    label: 'Outro',
  },
]

export function DeslocamentoForm({ initialValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: initialValues,
  })
  const clientesList: Cliente[] = getStoredData('clientes') || []
  const veiculosList: Veiculo[] = getStoredData('veiculos') || []
  const condutoresList: Condutor[] = getStoredData('condutores') || []

  if (!clientesList || !condutoresList) {
    queryClient.prefetchQuery(['clientes'], getClientes)
    queryClient.prefetchQuery(['condutores'], getCondutores)
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

  const now = new Date()

  return (
    <Form
      titleForm="Cadastro de Deslocamento"
      subTitleForm="Preencha os campos para cadastrar um deslocamento"
      textSubmitBuntton="Cadastrar"
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            sx={{
              '& .mui-style-1xhypcz-MuiStack-root': {
                paddingTop: '0px',
              },
            }}
            components={['MobileTimePicker']}
          >
            <DemoItem>
              <MobileTimePicker
                onChange={() => {
                  setValue('inicioDeslocamento', dayjs().toString())
                }}
                defaultValue={dayjs()}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Stack>

      <TextField
        {...register('checkList', {
          required: true,
        })}
        error={!!errors.checkList}
        fullWidth
        id="checkList"
        label="Check List"
        multiline
        maxRows={4}
      />

      <TextField
        {...register('motivo', {
          required: true,
        })}
        error={!!errors.motivo}
        fullWidth
        id="motivo"
        label="Motivo"
        multiline
        maxRows={4}
      />

      <TextField
        {...register('observacao', {
          required: true,
        })}
        error={!!errors.observacao}
        fullWidth
        id="observacao"
        label="Observação"
        multiline
        maxRows={4}
      />

      <TextField
        {...register('idCliente', {
          required: true,
        })}
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
  )
}
