import { notFound } from 'next/navigation'
import { CondutorProfile } from '@/components/condutores/CondutorProfile'
import { useDataStored } from '@/hooks/useDataStored'
import { Condutor } from '@/utils/types'

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params: { id } }: Props) {
    const { dataStored: condutor } = useDataStored({ key: 'condutores', id: Number(id), dataType: {} as Condutor })

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
