import { queryClient, useMutation } from "@/lib/queryClient"
import { MutationFunction } from "@tanstack/react-query";

type Props = {
  id: number;
  key: string;
  dataType: any;
}

export const useDataStored = ({ dataType, key, id }: Props) => {
  const dataArray: typeof dataType[] = queryClient.getQueryData([key]) || [] as typeof dataType[]
  const dataStored = dataArray?.find((c) => c.id === id) ?? ({} as typeof dataType)

  return { dataStored }
}