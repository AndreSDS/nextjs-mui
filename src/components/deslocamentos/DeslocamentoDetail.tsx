'use client'

import { useDataStored } from '@/hooks/useDataStored'
import { updateDeslocamento } from '@/resources/deslocamentos'
import { Deslocamento } from '@/utils/types'

type Props = {
  id: number
}

export function DeslocamentoDetail({ id }: Props) {
  const [dataStored, updateDataStored] = useDataStored({
    id,
    key: 'deslocamentos',
    fnToUpdate: updateDeslocamento,
    dataType: {} as Deslocamento,
  })

  return <div>DeslocamentoDetail</div>
}
