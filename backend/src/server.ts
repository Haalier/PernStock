import express, { Request, Response } from "express";
import productRoutes from "./routes/product.routes"
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"

const app = express()

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

export default app;