import { useForm } from 'react-hook-form'
import { Form } from '../Form'
import { DeslocamentoEdit } from '@/utils/types'
import { Stack, TextField } from '@mui/material'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { formatISODateToUTC } from '@/utils/formatDate'

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
                  setValue('fimDeslocamento', formatISODateToUTC(value))
                }}
                defaultValue={dayjs()}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
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
