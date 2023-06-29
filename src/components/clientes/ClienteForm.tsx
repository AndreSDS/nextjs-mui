'use client'

import { FormGroup, MenuItem, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Cliente } from '@/utils/types'
import { Form } from '@/components/Form'

type Props = {
  titleForm: string
  subTitleForm: string
  initialValues?: Cliente
  onSubmit: (data: Cliente) => void
}

const docOptions = [
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

export function ClienteForm({
  titleForm,
  subTitleForm,
  initialValues,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Cliente>({
    defaultValues: initialValues,
  })

  const isEditing = !!initialValues?.id

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      titleForm={titleForm}
      subTitleForm={subTitleForm}
      textSubmitBuntton={isEditing ? 'Atualizar' : 'Cadastrar'}
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

      {!isEditing ? (
        <FormGroup>
          <Stack spacing={2} direction="row">
            <TextField
              {...register('tipoDocumento', {
                required: true,
              })}
              select
              error={!!errors.tipoDocumento}
              sx={{ flex: 0.5 }}
              id="tipoDocumento"
              label="Documento"
              defaultValue={initialValues?.tipoDocumento}
            >
              {docOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              {...register('numeroDocumento', {
                required: true,
              })}
              error={!!errors.numeroDocumento}
              sx={{ flex: 1 }}
              id="numeroDocumento"
              label="Número do Documento"
            />
          </Stack>
        </FormGroup>
      ) : null}

      <FormGroup>
        <Stack spacing={2} direction="row">
          <TextField
            {...register('logradouro', { required: true })}
            error={!!errors.logradouro}
            sx={{ flex: 1 }}
            id="logradouro"
            label="Rua"
          />

          <TextField
            {...register('numero', { required: true })}
            error={!!errors.numero}
            sx={{
              width: '110px',
            }}
            id="numero"
            label="Número"
          />
        </Stack>
      </FormGroup>

      <TextField
        {...register('bairro', { required: true })}
        error={!!errors.bairro}
        fullWidth
        required
        id="bairro"
        label="Bairro"
      />

      <FormGroup>
        <Stack spacing={2} direction="row">
          <TextField
            {...register('cidade', { required: true })}
            error={!!errors.cidade}
            sx={{ flex: 1 }}
            id="cidade"
            label="Cidade"
          />

          <TextField
            {...register('uf', { required: true })}
            error={!!errors.uf}
            sx={{
              width: '110px',
            }}
            id="uf"
            label="UF"
          />
        </Stack>
      </FormGroup>
    </Form>
  )
}
