import { Metadata } from 'next'
import { VeiculosList } from '@/components/veiculos/VeiculosList'

export const metadata: Metadata = {
  title: 'Veiculos',
  description: 'Lista de veiculos',
}

export default async function Veículos() {
  return <VeiculosList />
}
