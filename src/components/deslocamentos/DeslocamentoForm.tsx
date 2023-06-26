'use client'

import { MenuItem, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Cliente, Deslocamento } from '@/utils/types'
import { queryClient } from '@/lib/queryClient'
import { getClientes } from '@/resources/cliente'
import { getCondutores } from '@/resources/condutor'
import { Form } from '@/components/Form'

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
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: initialValues,
  })
  const clientesList = queryClient.getQueryData<Cliente[]>(['clientes'])
  const condutoresList = queryClient.getQueryData<Cliente[]>(['condutores'])

  if (!clientesList || !condutoresList) {
    queryClient.prefetchQuery(['clientes'], getClientes)
    queryClient.prefetchQuery(['condutores'], getCondutores)
  }

  const clientes = clientesList?.map((cliente) => ({
    value: cliente.id,
    label: cliente.nome,
  }))

  const condutores = condutoresList?.map((condutor) => ({
    value: condutor.id,
    label: condutor.nome,
  }))

  return (
    <Form
      titleForm="Cadastro de Deslocamento"
      subTitleForm="Preencha os campos para cadastrar um deslocamento"
      textSubmitBuntton="Cadastrar"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        select
        {...register('idCliente', {
          required: true,
        })}
        error={!!errors.idCliente}
        fullWidth
        id="nome"
        label="Nome do Cliente"
        value=""
      >
        {clientes?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        {...register('idVeiculo', {
          required: true,
        })}
        error={!!errors.idVeiculo}
        fullWidth
        id="placa"
        label="Placa do Veículo"
      />

      <TextField
        select
        {...register('idCondutor', {
          required: true,
        })}
        error={!!errors.idCondutor}
        fullWidth
        id="nome"
        label="Nome do Condutor"
        value=""
        //onChange={(e) => {
        //e.preventDefault()
        //alert("criar resources de veículos")}}
      >
        {condutores?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        {...register('kmInicial', {
          required: true,
        })}
        error={!!errors.kmInicial}
        fullWidth
        id="kmInicial"
        label="Km Inicial"
      />

      <TextField
        {...register('kmFinal', {
          required: true,
        })}
        error={!!errors.kmFinal}
        fullWidth
        id="kmFinal"
        label="Km Final"
      />

      <TextField
        {...register('inicioDeslocamento', {
          required: true,
        })}
        error={!!errors.inicioDeslocamento}
        fullWidth
        id="inicioDeslocamento"
        label="Início do Deslocamento"
      />

      <TextField
        {...register('fimDeslocamento', {
          required: true,
        })}
        error={!!errors.fimDeslocamento}
        fullWidth
        id="fimDeslocamento"
        label="Fim do Deslocamento"
      />

      <TextField
        {...register('checkList', {
          required: true,
        })}
        error={!!errors.checkList}
        fullWidth
        id="checkList"
        label="Check List"
      />

      <TextField
        {...register('motivo', {
          required: true,
        })}
        error={!!errors.motivo}
        fullWidth
        id="motivo"
        label="Motivo"
      />

      <TextField
        {...register('observacao', {
          required: true,
        })}
        error={!!errors.observacao}
        fullWidth
        id="observacao"
        label="Observação"
      />
    </Form>
  )
}
