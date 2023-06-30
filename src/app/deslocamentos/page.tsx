import { Metadata } from 'next'
import { DeslocamentosList } from '@/components/deslocamentos/DeslocamentosList'

export const metadata: Metadata = {
  title: 'Deslocamentos',
  description: 'Lista de deslocamentos',
}

export default async function Deslocampentos() {
  return <DeslocamentosList />
}
