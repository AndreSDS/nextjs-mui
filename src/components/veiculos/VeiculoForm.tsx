import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Veiculo } from '@/utils/types'
import { Form } from '@/components/Form'

type Props = {
  titleForm: string
  subTitleForm: string
  textSubmitBuntton: string
  initialValues?: Veiculo
  onSubmit: (data: Veiculo) => void
}

export function VeiculoForm({
  titleForm,
  subTitleForm,
  textSubmitBuntton,
  initialValues,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Veiculo>({
    defaultValues: initialValues,
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      titleForm={titleForm}
      subTitleForm={subTitleForm}
      textSubmitBuntton={textSubmitBuntton}
      isLoading={isSubmitting}
    >
      <TextField
        {...register('marcaModelo')}
        fullWidth
        id="nome"
        label="Marca/Modelo do Veículo"
      />

      {initialValues?.id ? null : (
        <TextField
          {...register('placa', {
            required: true,
          })}
          error={!!errors.placa}
          fullWidth
          id="placa"
          label="Placa"
        />
      )}

      <TextField
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        {...register('anoFabricacao', {
          required: !!initialValues?.id,
        })}
        error={!!errors.anoFabricacao}
        fullWidth
        id="anoFabricacao"
        label="Ano de Fabricação"
      />

      <TextField
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        {...register('kmAtual', {
          required: !!initialValues?.id,
        })}
        error={!!errors.kmAtual}
        fullWidth
        id="kmAtual"
        label="Km Atual"
      />
    </Form>
  )
}
