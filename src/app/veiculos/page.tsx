import { Metadata } from 'next'
import { VeiculosList } from '@/components/veiculos/VeiculosList'

export const metadata: Metadata = {
  title: 'Veiculos',
}

export default async function Veículos() {
  return <VeiculosList />
}
