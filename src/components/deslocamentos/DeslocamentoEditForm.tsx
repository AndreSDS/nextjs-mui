import { useForm } from 'react-hook-form'
import { Stack, TextField } from '@mui/material'
import { DeslocamentoEdit } from '@/utils/types'
import { formatISODateToUTC } from '@/utils/formatDate'
import { Form } from '@/components/Form'
import { DatePickerComponent } from '@/components/DatePicker'

type Props = {
  onSubmit: (data: DeslocamentoEdit) => void
}

export function DeslocamentoEditForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<DeslocamentoEdit>()

  return (
    <Form
      titleForm="Encerrar Deslocamento"
      subTitleForm="Preencha os campos para encerrar um deslocamento"
      textSubmitBuntton="Encerrar"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          {...register('kmFinal', {
            required: true,
          })}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          error={!!errors.kmFinal}
          id="kmFinal"
          label="Km Final"
        />

        <DatePickerComponent
          isHour
          onChange={(value) =>
            setValue('fimDeslocamento', formatISODateToUTC(value))
          }
        />
      </Stack>

      <TextField
        {...register('observacao')}
        error={!!errors.observacao}
        fullWidth
        id="observacao"
        label="Observação"
        multiline
        maxRows={4}
      />
    </Form>
  )
}
