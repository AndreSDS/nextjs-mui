'use client'

import { useForm } from 'react-hook-form'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Condutor } from '@/utils/types'
import { Form } from '@/components/Form'

type FormInputs = {
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: String
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

type Props = {
  initialValues?: Condutor
  onSubmit: (data: Condutor) => void
}

export function CondutorForm({ initialValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: initialValues,
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      titleForm="Cadastro de Condutor"
      subTitleForm="Preencha os campos para cadastrar um condutor"
      textSubmitBuntton="Cadastrar"
      isLoading={isSubmitting}
    >
      <TextField
        {...register('nome', {
          required: true,
        })}
        error={!!errors.nome}
        fullWidth
        id="nome"
        label="Nome"
      />

      <Stack spacing={2} direction="row">
        <TextField
          select
          {...register('catergoriaHabilitacao', {
            required: true,
          })}
          error={!!errors.catergoriaHabilitacao}
          sx={{ flex: 0.5 }}
          id="tipoDocumento"
          label="Documento"
          defaultValue={categoryOptions[3].value}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...register('numeroHabilitacao', {
            required: true,
          })}
          error={!!errors.numeroHabilitacao}
          sx={{ flex: 1 }}
          id="numeroHabilitacao"
          label="Número da Habilitação"
        />
      </Stack>

      <TextField
        {...register('vencimentoHabilitacao', {
          required: true,
        })}
        error={!!errors.vencimentoHabilitacao}
        fullWidth
        id="vencimentoHabilitacao"
        label="Vencimento da Habilitação"
      />
    </Form>
  )
}
