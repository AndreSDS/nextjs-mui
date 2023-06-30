import { api } from "@/lib/api";
import { Cliente } from "@/utils/types";

export async function getClientes(): Promise<Cliente[]> {
    const response = await api.get('/Cliente')

    if (response.status !== 200) {
        return [] as Cliente[];
    }

    return response.data
}

export async function getClienteById(id: string): Promise<Cliente> {
    const response = await api.get(`/Cliente/${id}`);

    if (response.status !== 200) {
        return {} as Cliente;
    }

    const { data } = response;

    return data;
}

export async function createCliente(cliente: Cliente): Promise<number> {
    const response = await api.post('/Cliente', cliente)

    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}

export async function updateCliente(cliente: Cliente): Promise<number> {
    const clienteToUpdate = {
        ...cliente,
        numeroDocumento: null,
        tipoDocumento: null
    }

    const response = await api.put(`/Cliente/${cliente.id}`, clienteToUpdate)

    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}

export async function deleteCliente(id: number): Promise<number> {
    const response = await api.delete(`/Cliente/${id}`, { data: { id } })
    
    if (response.status !== 200) {
        return response.status;
    }

    return response.data;
}