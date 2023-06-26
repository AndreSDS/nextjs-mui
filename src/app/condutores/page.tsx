import { Metadata } from 'next'
import { CondutoresList } from '@/components/condutores/CondutoresList'

export const metadata: Metadata = {
  title: 'Condutores',
}

export default async function Condutores() {

  return <CondutoresList />
}
