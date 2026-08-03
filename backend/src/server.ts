import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { routes } from "./routes/index.js";

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(routes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor em http://localhost:${PORT}`)
})

export default app;
