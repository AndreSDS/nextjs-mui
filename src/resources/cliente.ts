import { api } from "@/lib/api";
import { Cliente } from "@/utils/types";

export async function getClientes(): Promise<Cliente[]> {
    const response = await api.get('/Cliente')

    if (response.status === 404) {
        return [];
    }

    const { data } = response;

    const clientes = data.map((cliente: Cliente) => {
        return {
            ...cliente,
            logradouro: `${cliente.logradouro}, ${cliente.numero} - ${cliente.bairro}`,
        }
    })

    return clientes;
}

export async function getClienteById(id: string): Promise<Cliente> {
    const response = await api.get(`/Cliente/${id}`);

    if (response.status === 404) {
        return {} as Cliente;
    }

    const { data } = response;

    return data;
}

export async function createCliente(cliente: Cliente): Promise<Cliente> {
    const response = await api.post('/Cliente', {
        body: JSON.stringify(cliente)
    })

    if (response.status === 404) {
        return {} as Cliente;
    }

    const { data } = response;

    const clienteCriado: Cliente = {
        id: data,
        ...cliente,
    }

    return clienteCriado;
}

export async function updateCliente(cliente: Cliente): Promise<Cliente> {
    const response = await api.put(`/Cliente/${cliente.id}`, {
        body: JSON.stringify(cliente)
    })

    if (response.status === 404) {
        return {} as Cliente;
    }

    return cliente;
}

export async function deleteCliente(id: string): Promise<{
    message: string
}> {
    const response = await api.delete(`/Cliente/${id}`)

    if (response.status === 404) {
        return {
            message: 'Cliente não encontrado'
        };
    }

    return {
        message: 'Cliente excluído com sucesso'
    }
}