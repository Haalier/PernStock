import express, { Request, Response } from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller';
const router = express.Router();

router.get('/', getAllProducts)

router.post('/', createProduct)

router.get('/:id', (req: Request, res: Response) => {
    // GET PRODUCT BY ID
    res.send("test")
})

export default router;