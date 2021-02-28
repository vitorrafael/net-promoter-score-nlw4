import app from "./app";
import log from "./logger";

const PORT = 3333;
app.listen(PORT, () => {
    log.info("Server is running!");
    log.info(`Listening on port ${PORT}.`);
});