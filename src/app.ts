import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";

import createConnection from "./database";
import AppError from "./errors/AppError";
import log from "./logger";

const app = express();

createConnection().then(async () => {
    app.use(express.json());

    const { router } = await import("./routes");
    app.use(router);

    app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
        log.error(`An error ocurred: ${err.message}`)
        log.trace(err.stack);

        return response.status(500).json({
            message: "Internal Server Error"
        });
    });
});

export default app;