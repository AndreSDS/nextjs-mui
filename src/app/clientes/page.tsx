import { Metadata } from 'next'
import { ClientList } from '@/components/clientes/ClientList'

export const metadata: Metadata = {
  title: 'Clientes',
  description: 'Lista de clientes'
}

export default async function Clientes() {
  return <ClientList />
}
