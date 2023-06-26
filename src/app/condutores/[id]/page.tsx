import { notFound } from 'next/navigation'
import { CondutorProfile } from '@/components/condutores/CondutorProfile'
import { getCondutorById } from '@/resources/condutor'
import { Condutor } from '@/utils/types'

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params: { id } }: Props) {
    const condutor = await getCondutorById(id)

    if (!condutor.id) {
        return {
            title: 'Condutor Not found',
        }
    }

    return {
        title: condutor.nome,
    }
}

export default async function Condutor({ params: { id } }: Props) {
    if (!id) notFound()

    return <CondutorProfile id={id} />
}
