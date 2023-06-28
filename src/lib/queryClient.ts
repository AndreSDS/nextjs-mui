import { useMutation, useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

type Props = {
    key: string,
    dataType: any,
    id?: number
    queryFn?: (data: any) => any,
}

const useFetchData = ({ key, queryFn, dataType }: Props) => {
    const { data, isFetching } = useQuery<typeof dataType[]>({
        queryKey: [key],
        queryFn,
        staleTime: 1000 * 60 * 60 * 24 // 1 day
    })

    return {
        data,
        isFetching
    }
}

const preFetchData = async (key: string, queryFn: any) => {
    await queryClient.prefetchQuery([key], queryFn)
}

const getStoredData = (key: string) => {
    const dataStored: any[] = queryClient.getQueryData([key]) as any[]

    if (!dataStored) return undefined

    return dataStored
}

const getStoredItem = (key: string, id: number) => {
    const data = getStoredData(key) as any[]

    if (!data) return undefined

    const item = data.find((d: any) => d.id === id)

    return item
}

export {
    useFetchData,
    preFetchData,
    getStoredData,
    getStoredItem,
    useMutation,
    QueryClientProvider,
    queryClient
}