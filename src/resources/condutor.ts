import { api } from "@/lib/api";
import { Condutor } from "@/utils/types";

export async function getCondutores(): Promise<Condutor[]> {
    const response = await api.get('/Condutor')

    if (response.status === 404) {
        return [];
    }

    return response.data;
}

export async function getCondutorById(id: string): Promise<Condutor> {
    const response = await api.get(`/Condutor/${id}`);

    if (response.status === 404) {
        return {} as Condutor;
    }

    return response.data;
}

export async function createCondutor(condutor: Condutor): Promise<Condutor> {
    const response = await api.post('/Condutor', {
        body: JSON.stringify(condutor)
    })

    if (response.status === 404) {
        return {} as Condutor;
    }

    const { data } = response;

    const condutorCriado: Condutor = {
        id: data,
        ...condutor,
    }

    return condutorCriado;
}

export async function updateCondutor(condutor: Condutor): Promise<Condutor> {
    const response = await api.put(`/Condutor/${condutor.id}`, {
        body: JSON.stringify(condutor)
    })

    if (response.status === 404) {
        return {} as Condutor;
    }

    return condutor;
}

export async function deleteCondutor(id: string): Promise<{
    message: string
}> {
    const response = await api.delete(`/Condutor/${id}`)

    if (response.status === 404) {
        return {
            message: 'Condutor não encontrado'
        };
    }

    return {
        message: 'Condutor excluído com sucesso'
    }
}