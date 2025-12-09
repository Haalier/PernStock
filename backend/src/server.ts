import { aj } from './lib/arcjet';
import express, { NextFunction, Request, Response } from "express";
import productRoutes from "./routes/product.routes"
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"

const app = express()

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1
        })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too many requests" });
            } else if (decision.reason.isBot()) {
                res.status(403).json({ error: "Bot detected" })
            } else {
                res.status(403).json({ error: "Forbidden" });
            }
            return;
        }

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({ error: "Spoofed bot detected" })
        }
        next();
    } catch (error) {
        console.error("Arcjet error", error)
        next(error)
    }
})

app.use("/api/products", productRoutes);

export default app;