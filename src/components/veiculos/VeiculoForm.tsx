import { useForm } from 'react-hook-form'
import { Veiculo } from '@/utils/types'
import { Form } from '@/components/Form'
import { TextField } from '@mui/material'

type FormInputs = {
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

type Props = { initialValues?: Veiculo; onSubmit: (data: Veiculo) => void }

export function VeiculoForm({ initialValues, onSubmit }: Props) {
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
        {...register('marcaModelo', {
          required: true,
        })}
        error={!!errors.marcaModelo}
        fullWidth
        id="nome"
        label="Nome"
      />

      <TextField
        {...register('placa', {
          required: true,
        })}
        error={!!errors.placa}
        fullWidth
        id="placa"
        label="Placa"
      />

      <TextField
        {...register('anoFabricacao', {
          required: true,
        })}
        error={!!errors.anoFabricacao}
        fullWidth
        id="anoFabricacao"
        label="Ano de Fabricação"
      />

      <TextField
        {...register('kmAtual', {
          required: true,
        })}
        error={!!errors.kmAtual}
        fullWidth
        id="kmAtual"
        label="Km Atual"
      />
    </Form>
  )
}
