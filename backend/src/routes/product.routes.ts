import express, { Request, Response } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
const router = express.Router();

router.get('/', getProducts)

router.post('/', createProduct)

router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;