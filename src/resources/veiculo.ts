import { api } from "@/lib/api";
import { Veiculo } from "@/utils/types";

export async function getVeiculos(): Promise<Veiculo[]> {
    const response = await api.get('/Veiculo');

    if (response.status !== 200) {
        return [] as Veiculo[];
    }

   return response.data;
}

export async function getVeiculoById(id: string): Promise<Veiculo> {
   const response = await api.get(`/Veiculo/${id}`);
   
   if (response.status !== 200) {
         return {} as Veiculo;
   }

   return response.data;
}

export async function createVeiculo(veiculo: Veiculo): Promise<Veiculo> {
  const response = await api.post('/Veiculo', veiculo);

   if (response.status !== 200) {
         return {} as Veiculo;
   }

   return response.data;
}

export async function updateVeiculo(veiculo: Veiculo): Promise<Veiculo> {
      const response = await api.put(`/Veiculo/${veiculo.id}`, veiculo);
   
      if (response.status !== 200) {
         return {} as Veiculo;
      }
   
      return response.data;
}

export async function deleteVeiculo(id: string): Promise<{
   message: string
}> {
   const response = await api.delete(`/Veiculo/${id}`);
   
   if (response.status !== 200) {
         return {
            message: 'Erro ao deletar veículo'
         };
   }

   return {
      message: 'Veículo deletado com sucesso'
   };
}