import app from "./app";

const PORT = 3333;
app.listen(PORT, () => {
    console.log("Server is running!");
    console.log(`Listening on port ${PORT}.`);
});