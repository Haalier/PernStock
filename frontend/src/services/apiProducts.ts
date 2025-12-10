import axios from 'axios';
import type { Product } from '../models/ProductModel';

const BASE_URL = 'http://localhost:3000/api/v1/products';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const res = await axios.get<ApiResponse<Product[]>>(BASE_URL);
        return res.data.data
    },

    getOne: async (id: string): Promise<Product> => {
        const res = await axios.get<ApiResponse<Product>>(`${BASE_URL}/${id}`);
        return res.data.data;
    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
        const res = await axios.post<ApiResponse<Product>>(BASE_URL, product);
        return res.data.data;
    },

    update: async (id: string, product: Partial<Product>): Promise<Product> => {
        const res = await axios.put<ApiResponse<Product>>(`${BASE_URL}/${id}`, product);
        return res.data.data
    },

    delete: async (id: string): Promise<Product> => {
        const res = await axios.delete<ApiResponse<Product>>(`${BASE_URL}/${id}`);
        return res.data.data
    }
}

