import { api } from "@/lib/api";
import { Deslocamento } from "@/utils/types";

export async function getDeslocamentos(): Promise<Deslocamento[]> {
    const response = await api.get('/Deslocamento')

    if (response.status === 404) {
        return [];
    }

    return response.data;
}

export async function getDeslocamentoById(id: string): Promise<Deslocamento> {
    const response = await api.get(`/Deslocamento/${id}`);

    if (response.status === 404) {
        return {} as Deslocamento;
    }

    return response.data;
}

export async function createDeslocamento(deslocamento: Deslocamento): Promise<Deslocamento> {
    const response = await api.post('/Deslocamento/IniciarDeslocamento', {
        body: JSON.stringify(deslocamento)
    })

    if (response.status === 404) {
        return {} as Deslocamento;
    }

    const { data } = response;

    const condutorCriado: Deslocamento = {
        id: data,
        ...deslocamento,
    }

    return condutorCriado;
}

export async function updateDeslocamento(deslocamento: Deslocamento): Promise<Deslocamento> {
    const response = await api.put(`/Deslocamento/${deslocamento.id}/EncerrarDeslocamento`, {
        body: JSON.stringify(deslocamento)
    })

    if (response.status === 404) {
        return {} as Deslocamento;
    }

    return deslocamento;
}

export async function deleteDeslocamento(id: string): Promise<{
    message: string
}> {
    const response = await api.delete(`/Deslocamento/${id}`)

    if (response.status === 404) {
        return {
            message: 'Condutor não encontrado'
        };
    }

    return {
        message: 'Condutor excluído com sucesso'
    }
}