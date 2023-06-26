'use client'

import { useDataStored } from '@/hooks/useDataStored'
import { updateDeslocamento } from '@/resources/deslocamentos'
import { Deslocamento } from '@/utils/types'

type Props = {
  id: number
}

export function DeslocamentoDetail({ id }: Props) {
  const [dataStored, mutateDataStored] = useDataStored({
    id,
    key: 'deslocamentos',
    dataType: {} as Deslocamento,
    fnToMutate: updateDeslocamento
  })

  return <div>DeslocamentoDetail</div>
}
