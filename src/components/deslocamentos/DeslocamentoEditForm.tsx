import { useForm } from 'react-hook-form'
import { Box, Stack, TextField } from '@mui/material'
import { Alarm, Place } from '@mui/icons-material'
import { getStoredItem } from '@/lib/queryClient'
import { Deslocamento, DeslocamentoEdit } from '@/utils/types'
import { transformToISO } from '@/utils/formatDate'
import { Form } from '@/components/Form'
import { DatePickerComponent } from '@/components/DatePicker'
import { TypographyWithIcon } from '@/components/deslocamentos/TypographyWithIcon'

type Props = {
  id: number
  onSubmit: (data: DeslocamentoEdit) => void
}

export function DeslocamentoEditForm({ id, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DeslocamentoEdit>()

  const deslocamento = getStoredItem('deslocamentos', id) as Deslocamento

  return (
    <Form
      titleForm="Encerrar Deslocamento"
      subTitleForm="Preencha os campos para encerrar um deslocamento"
      textSubmitBuntton="Encerrar"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing={2}>
        <TypographyWithIcon
          text={`km Inicial: ${deslocamento.kmInicial}`}
          icon={<Place />}
        />

        <TypographyWithIcon
          text={`Início: ${deslocamento.inicioDeslocamento}`}
          icon={<Alarm />}
        />
      </Stack>

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
            setValue('fimDeslocamento', transformToISO(value))
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
