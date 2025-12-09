import { Request, Response } from 'express';
import { sql } from '../config/db';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `

        res.status(200).json({
            success: true,
            data: products
        })

    } catch (error) {
        console.error("Error getProducts", error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching products"
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const newProduct = await sql`
        INSERT INTO products (name,price,image,updated_at) VALUES (${name},${price},${image},NOW()) RETURNING *
        `

        res.status(201).json({
            success: true,
            data: newProduct[0]
        })
    } catch (error) {
        console.error("Error createProduct", error)
        res.status(500).json({
            success: false,
            message: "Server error while creating product"
        })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await sql`
        SELECT * FROM products WHERE id=${id}
        `

        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: product[0]
        })
    } catch (error) {
        console.error("Error createProduct", error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching product"
        })
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updatedProduct = await sql`
        UPDATE products SET name=${name}, price=${price}, image=${image}, updated_at=NOW() WHERE id=${id} RETURNING *
        `

        if (updatedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: updatedProduct[0]
        })
    } catch (error) {
        console.error("Error createProduct", error)
        res.status(500).json({
            success: false,
            message: "Server error while updating product"
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedProduct = await sql`
        DELETE FROM products WHERE id=${id} RETURNING *
        `

        if (deletedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: deletedProduct[0]
        })
    } catch (error) {
        console.error("Error createProduct", error)
        res.status(500).json({
            success: false,
            message: "Server error while deleting product"
        })
    }
}