'use client'

import { MenuItem, Stack, TextField } from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { Cliente, Condutor, DeslocamentoCreate, Veiculo } from '@/utils/types'
import { formatISODateToUTC } from '@/utils/formatDate'
import { getStoredData, queryClient } from '@/lib/queryClient'
import { preFetchData, useFetchData } from '@/lib/queryClient'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { iniciarDeslocamento } from '@/resources/deslocamentos'
import { Form } from '@/components/Form'

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

  const novoDeslocamento = async (deslocamento: DeslocamentoCreate) => {
    try {
      if (!deslocamento.inicioDeslocamento) {
        deslocamento.inicioDeslocamento = new Date().toISOString()
      }

      await iniciarDeslocamento(deslocamento)
      queryClient.invalidateQueries(['deslocamentos'])
      handleClose()
    } catch (error) {
      const { response } = error as any
      console.log(response.data, response.status)
    }
  }

  return (
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
                onChange={(value: any) => {
                  setValue('inicioDeslocamento', formatISODateToUTC(value))
                }}
                defaultValue={dayjs()}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
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
  )
}
