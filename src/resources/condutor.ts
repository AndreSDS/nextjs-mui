import { api } from "@/lib/api";
import { formatDate, transformToISO } from "@/utils/formatDate";
import { Condutor } from "@/utils/types";

export async function getCondutores(): Promise<Condutor[]> {
    const response = await api.get('/Condutor')

    if (response.status !== 200) {
        return [];
    }

    const condutores = response.data.map((condutor: Condutor) => {
        return {
            ...condutor,
            vencimentoHabilitacao: formatDate(condutor.vencimentoHabilitacao),
        }
    })

    return condutores;
}

export async function getCondutorById(id: string): Promise<Condutor> {
    const response = await api.get(`/Condutor/${id}`)

    if (response.status !== 200) {
        return {} as Condutor;
    }

    const { data } = response

    return data;
}

export async function createCondutor(condutor: Condutor): Promise<number> {
    if(!condutor.vencimentoHabilitacao) {
        condutor.vencimentoHabilitacao = transformToISO(new Date())
    }

    const response = await api.post('/Condutor', condutor)

    if (response.status !== 200) {
        return response.status;
    }

    return response.data
}

export async function updateCondutor(condutor: Condutor): Promise<number> {
    const condutorToUpdate = {
        id: condutor.id,
        categoriaHabilitacao: condutor.categoriaHabilitacao,
        vencimentoHabilitacao: condutor.vencimentoHabilitacao,
    }

    const response = await api.put(`/Condutor/${condutor.id}`, condutorToUpdate)
    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}

export async function deleteCondutor(id: number): Promise<number> {
    const response = await api.delete(`/Condutor/${id}`, {
        data: { id }
    })

    if (response.status !== 200) {
        return response.status;
    }

    return response.data
}