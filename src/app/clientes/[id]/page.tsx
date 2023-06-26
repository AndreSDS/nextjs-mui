import { notFound } from 'next/navigation'
import { Cliente } from '@/utils/types'
import { ClienteProfile } from '@/components/clientes/ClienteProfile'
import { getClienteById } from '@/resources/cliente'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params: { id } }: Props) {
  const cliente = await getClienteById(id)

  if (!cliente.id) {
    return {
      title: 'Cliente Not found',
    }
  }

  return {
    title: cliente.nome,
  }
}

export default async function Cliente({ params: { id } }: Props) {
  if (!id) notFound()

  return <ClienteProfile id={id} />
}
