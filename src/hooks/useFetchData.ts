import { useQuery } from "@/lib/queryClient"

export const useFetchData = (key: string, fnToFetch: any) => {
    const { data, isFetching } = useQuery<any>({
        queryKey: [key],
        queryFn: fnToFetch,
        staleTime: 1000 * 60 * 60 * 24 // 1 day
    })

    return {
        data,
        isFetching
    }
}