import express, { Request, Response } from "express";
import { PORT } from './secrets';
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";

const app = express();
// Middleware to parse incoming JSON requests
app.use(express.json());  // This line is crucial to parse JSON body

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query']
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
