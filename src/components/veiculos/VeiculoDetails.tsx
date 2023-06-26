'use client'

import { useDataStored } from '@/hooks/useDataStored'
import { updateVeiculo } from '@/resources/veiculo'
import { Veiculo } from '@/utils/types'

type Props = {
  id: number
}

export function VeiculoDetail({ id }: Props) {
  const [dataStored, mutateDataStored] = useDataStored({
    id,
    key: 'veiculos',
    dataType: {} as Veiculo,
    fnToUpdate: updateVeiculo
  })

  return <div>DeslocamentoDetail</div>
}
