import { queryClient, useMutation } from "@/lib/queryClient"
import { MutationFunction } from "@tanstack/react-query";

type Props = {
  id?: number;
  key: string;
  dataType: any;
  fnToMutate: (data: any) => Promise<any>
}

export const useDataStored = ({ dataType, key, id, fnToMutate }: Props) => {
  let dataStored = {} as typeof dataType;

  if(id) {
    const dataArray: typeof dataType[] = queryClient.getQueryData([key]) || [] as typeof dataType[]
    dataStored = dataArray?.find((c) => c.id === id)
  }

  const {mutate: mutateDataStored} = useMutation({
    mutationFn: fnToMutate,
    onSuccess: (data: typeof dataType) => {
        queryClient.setQueryData<typeof dataType[]>([key], (old) => {
            if (!old) return []
            const index = old.findIndex((c) => c.id === data.id)
            old[index] = data
            return old
        })
    },
})

  return { dataStored, mutateDataStored }
}