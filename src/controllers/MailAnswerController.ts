import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

export default class MailAnswerController {

    async execute(request: Request, response: Response) : Promise<Response> {
        const { value } = request.params;
        const { u: surveyUserId } = request.query;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveyUserRepository.findOne({ id: String(surveyUserId) });

        if (!surveyUser) {
            return response.status(400).json({ error: "Survey User does not exist" });
        }

        surveyUser.value = Number(value);

        await surveyUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}