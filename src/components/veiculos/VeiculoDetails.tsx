'use client'

import { useDataStored } from '@/hooks/useDataStored'
import { updateVeiculo } from '@/resources/veiculo'
import { Veiculo } from '@/utils/types'

type Props = {
  id: number
}

export function VeiculoDetail({ id }: Props) {
  const [dataStored, updateDataStored] = useDataStored({
    id,
    key: 'veiculos',
    fnToUpdate: updateVeiculo,
    dataType: {} as Veiculo,
  })

  return <div>DeslocamentoDetail</div>
}
