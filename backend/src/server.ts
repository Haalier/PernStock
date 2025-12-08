import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"


const app = express()

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.json({ message: "why I cannot run this fucking shits" })
})

export default app;