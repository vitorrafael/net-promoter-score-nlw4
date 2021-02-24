import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();

router.post("/users", userController.create);
router.get("/", async (req, res) => {
    console.log("OK")
});

export { router };