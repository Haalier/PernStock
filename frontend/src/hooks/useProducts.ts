import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../services/apiProducts'
import type { Product } from '../models/ProductModel'

const QUERY_KEY = 'products'

export const useProducts = () => {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: productsApi.getAll
    })
}

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => productsApi.getOne(id),
        enabled: !!id
    })
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        }
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => productsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] })
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        }
    })
}