import "reflect-metadata";
import express from 'express';

import './database';

const app = express();

app.get("/", (req, res) => {
    return res.json({ message: "Hello World - NLW04!" });
});

app.post("/", (req, res) => {
    return res.json({ message: "The data was received sucessfully." });
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log("Server is running!");
    console.log(`Listening on port ${PORT}.`);
});