import { queryClient, useMutation } from "@/lib/queryClient"

export const useMutateData = (key: string, dataType: any, fnToMutate: (data: any) => Promise<any>) => {
    const {mutate} = useMutation({
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

    return { mutate }
}