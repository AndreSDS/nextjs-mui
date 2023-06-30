import { Metadata } from 'next'
import { CondutoresList } from '@/components/condutores/CondutoresList'

export const metadata: Metadata = {
  title: 'Condutores',
  description: 'Lista de condutores',
}

export default async function Condutores() {

  return <CondutoresList />
}
