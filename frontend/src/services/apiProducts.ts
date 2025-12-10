import axios from 'axios';
import type { Product } from '../models/ProductModel';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000/api/v1/products';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        try {
            const res = await axios.get<ApiResponse<Product[]>>(BASE_URL);
            return res.data.data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Something went wrong\n${error.message}`);
            }
            throw error;
        }
    },

    getOne: async (id: number): Promise<Product> => {
        try {
            const res = await axios.get<ApiResponse<Product>>(`${BASE_URL}/${id}`);
            return res.data.data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Something went wrong\n${error.message}`);
            }
            throw error;
        }

    },

    create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
        try {
            const res = await axios.post<ApiResponse<Product>>(BASE_URL, product);
            return res.data.data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Something went wrong\n${error.message}`);
            }
            throw error;
        }
    },

    update: async (id: number, product: Partial<Product>): Promise<Product> => {
        try {
            const res = await axios.put<ApiResponse<Product>>(`${BASE_URL}/${id}`, product);
            return res.data.data
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Something went wrong\n${error.message}`);
            }
            throw error;
        }

    },

    delete: async (id: number): Promise<Product> => {
        try {
            const res = await axios.delete<ApiResponse<Product>>(`${BASE_URL}/${id}`);
            return res.data.data
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Something went wrong\n${error.message}`);
            }
            throw error;
        }

    }
}

