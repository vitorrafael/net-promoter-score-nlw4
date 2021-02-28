import "reflect-metadata";
import express from 'express';
import createConnection from "./database";

const app = express();

createConnection().then(async () => {
    app.use(express.json());
    
    const { router } = await import("./routes");
    app.use(router);
});

export default app;