import express from 'express';

const app = express();

const PORT = 3333;

app.get("/", (req, res) => {
    return res.json({ message: "Hello World - NLW04!" });
});

app.post("/", (req, res) => {
    return res.json({ message: "The data was received sucessfully." });
});

app.listen(PORT, () => {
    console.log("Server is running!");
    console.log(`Listening on port ${PORT}.`);
});