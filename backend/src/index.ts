import { sql } from './config/db';
import app from './server';
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 3000

async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `

        console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initDB", error)
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`)
    })
})
