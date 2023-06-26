import { useMutation, useQuery, useQueryClient,QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClientProvider,
    queryClient
}