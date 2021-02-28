import { Router } from "express";
import UserController from "./controllers/UserController";
import SurveyController from "./controllers/SurveyController";
import SendMailController from "./controllers/SendMailController";
import MailAnswerController from "./controllers/MailAnswerController";
import NpsController from "./controllers/NpsController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const mailAnswerController = new MailAnswerController();
const npsController = new NpsController();

router.post("/users", userController.create.bind(userController));

router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", mailAnswerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };