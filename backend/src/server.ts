import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { routes } from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import BasicAuth from "express-basic-auth";

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
const baseUrl = process.env.API_URL || `http://localhost:${PORT}`;
  
const serverDescription = process.env.NODE_ENV === 'production' ? 'Servidor de Produção' : 'Servidor Local';

swaggerDocument.servers = [
  {
    url: baseUrl,
    description: serverDescription,
  },
];

const docsUser = process.env.DOCS_USER || "";
const docsPassword = process.env.DOCS_PASSWORD || "";

app.use(
  "/docs",
  BasicAuth({
    challenge: true,
    users: { [docsUser]: docsPassword },
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: ${baseUrl}`);
  console.log(`📚 Documentação Swagger disponível em: ${baseUrl}/docs`);
});
export default app;