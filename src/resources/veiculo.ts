import { api } from "@/lib/api";
import { Cliente, Veiculo } from "@/utils/types";

export async function getVeiculos(): Promise<Veiculo[]> {
    const response = await api.get('/Veiculo')

    if (response.status === 404) {
        return [];
    }

    return response.data;
}

export async function getVeiculoById(id: string): Promise<Veiculo> {
    const response = await api.get(`/Veiculo/${id}`);

    if (response.status === 404) {
        return {} as Veiculo;
    }

    return response.data;
}

export async function createVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    const response = await api.post('/Veiculo', {
        body: JSON.stringify(veiculo)
    })

    if (response.status === 404) {
        return {} as Veiculo;
    }

    const { data } = response;

    const veiculoCriado: Veiculo = {
        id: data,
        ...veiculo,
    }

    return veiculoCriado;
}

export async function updateVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    const response = await api.put(`/Veiculo/${veiculo.id}`, {
        body: JSON.stringify(veiculo)
    })

    if (response.status === 404) {
        return {} as Veiculo;
    }

    return veiculo;
}

export async function deleteVeiculo(id: string): Promise<{
    message: string
}> {
    const response = await api.delete(`/Veiculo/${id}`)

    if (response.status === 404) {
        return {
            message: 'Veiculo não encontrado'
        };
    }

    return {
        message: 'Veiculo excluído com sucesso'
    }
}