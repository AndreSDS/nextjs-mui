'use client'

import { useForm } from 'react-hook-form'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Condutor } from '@/utils/types'
import { Form } from '@/components/Form'
import { DatePickerComponent } from '../DatePicker'
import { transformToISO } from '@/utils/formatDate'

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
  titleForm: string
  subTitleForm: string
  initialValues?: Condutor
  onSubmit: (data: Condutor) => void
}

export function CondutorForm({
  titleForm,
  subTitleForm,
  initialValues,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Condutor>({
    defaultValues: initialValues,
  })

  const isEditing = !!initialValues?.id

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      titleForm={titleForm}
      subTitleForm={subTitleForm}
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
          {...register('categoriaHabilitacao', {
            required: !isEditing,
          })}
          error={!!errors.categoriaHabilitacao}
          sx={{ flex: 0.5 }}
          id="categoriaHabilitacao"
          label="Categoria"
        />

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
        onChange={(value) => setValue('vencimentoHabilitacao', transformToISO(value))}
      />
    </Form>
  )
}
