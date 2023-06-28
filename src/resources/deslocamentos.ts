import { api } from "@/lib/api";
import { formatDateToString } from "@/utils/formatDate";
import { Deslocamento, DeslocamentoCreate, DeslocamentoEdit } from "@/utils/types";

export async function getDeslocamentos(): Promise<Deslocamento[]> {
    const response = await api.get('Deslocamento');

    if (response.status !== 200) {
        return [] as Deslocamento[];
    }

    const { data } = response;

    const deslocamentos = data.map((deslocamento: Deslocamento) => {
        return {
            ...deslocamento,
            inicioDeslocamento: formatDateToString(deslocamento.inicioDeslocamento),
            fimDeslocamento: deslocamento ? formatDateToString(deslocamento.fimDeslocamento) : '',
        }
    })

    return deslocamentos;
}

export async function getDeslocamentoById(id: string): Promise<Deslocamento> {
    const response = await api.get(`Deslocamento/${id}`);

    if (response.status !== 200) {
        return {} as Deslocamento;
    }

    const { data } = response;

    return data;
}

export async function iniciarDeslocamento(deslocamento: DeslocamentoCreate): Promise<number> {
    const response = await api.post('Deslocamento/IniciarDeslocamento', deslocamento);

    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}

export async function encerrarDeslocamento(deslocamento: DeslocamentoEdit): Promise<number> {
    const response = await api.put(`Deslocamento/${deslocamento.id}/EncerrarDeslocamento`, deslocamento);

    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}

export async function deleteDeslocamento(id: number): Promise<number> {
    const response = await api.delete(`Deslocamento/${id}`, { data: { id } });

    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}