import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import createConnection from "./database";
import AppError from "./errors/AppError";

const app = express();

createConnection().then(async () => {
    app.use(express.json());

    const { router } = await import("./routes");
    app.use(router);

    app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            });
        }

        return response.status(500).json({
            message: "Internal Server Error"
        });
    });
});

export default app;