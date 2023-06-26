import { notFound } from 'next/navigation'
import { DeslocamentoDetail } from '@/components/deslocamentos/DeslocamentoDetail'
import { getDeslocamentoById } from '@/resources/deslocamento'
import { Deslocamento } from '@/utils/types'

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params: { id } }: Props) {
    const deslocamento = await getDeslocamentoById(id)

    if (!deslocamento.id) {
        return {
            title: 'Deslocamento Not found',
        }
    }

    return {
        title: deslocamento.nome,
    }
}

export default async function Deslocamento({ params: { id } }: Props) {
    if (!id) notFound()

    return <DeslocamentoDetail id={id} />
}
