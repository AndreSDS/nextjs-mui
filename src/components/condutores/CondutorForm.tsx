'use client'

import { useForm } from 'react-hook-form'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Condutor } from '@/utils/types'
import { Form } from '@/components/Form'
import { DatePickerComponent } from '../DatePicker'

const categoryOptions = [
  {
    value: 'a',
    label: 'Categoria A',
  },
  {
    value: 'b',
    label: 'Categoria B',
  },
  {
    value: 'c',
    label: 'Categoria C',
  },
  {
    value: 'd',
    label: 'Categoria D',
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
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Condutor>({
    defaultValues: initialValues,
  })

  const isEditing = !!initialValues?.id

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      titleForm="Cadastro de Condutor"
      subTitleForm="Preencha os campos para cadastrar um condutor"
      textSubmitBuntton="Cadastrar"
      isLoading={isSubmitting}
    >
      {isEditing ? null : (
        <TextField
          {...register('nome', {
            required: true,
          })}
          error={!!errors.nome}
          fullWidth
          id="nome"
          label="Nome"
        />
      )}

      <Stack spacing={2} direction="row">
        <TextField
          select
          {...register('catergoriaHabilitacao',{
            required: !isEditing,
          })}
          error={!!errors.catergoriaHabilitacao}
          sx={{ flex: 0.5 }}
          id="catergoriaHabilitacao"
          label="Categoria"
          defaultValue=""
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {isEditing ? null : (
          <TextField
            {...register('numeroHabilitacao', {
              required: true,
            })}
            error={!!errors.numeroHabilitacao}
            sx={{ flex: 1 }}
            id="numeroHabilitacao"
            label="Número da Habilitação"
          />
        )}
      </Stack>

      <DatePickerComponent
        label="Vencimento da Habilitação"
        onChange={(value) => setValue('vencimentoHabilitacao', value)}
      />
    </Form>
  )
}
