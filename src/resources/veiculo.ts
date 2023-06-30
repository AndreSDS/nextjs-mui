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

export async function createVeiculo(veiculo: Veiculo): Promise<number> {
   const response = await api.post('/Veiculo', veiculo);

   if (response.status !== 200) {
      return response.status;
   }

   return response.data;
}

export async function updateVeiculo(veiculo: Veiculo): Promise<string> {
   const response = await api.put(`/Veiculo/${veiculo.id}`, veiculo);

   if (response.status !== 200) {
      return response.statusText;
   }

   return response.data;
}

export async function deleteVeiculo(id: number): Promise<number> {
   const response = await api.delete(`/Veiculo/${id}`, { data: {id} });

   if (response.status !== 200) {
      return response.status;
   }

   return response.data;
}