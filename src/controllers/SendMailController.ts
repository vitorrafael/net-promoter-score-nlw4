import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";
import SurveyUserRepository from "../repositories/SurveyUserRepository";
import UserRepository from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

export default class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });
        if (!user) {
            return response.status(400).json({
                error: "User does not exist."
            });
        }

        const survey = await surveyRepository.findOne({ id: survey_id });
        if (!survey) {
            return response.status(400).json({
                error: "Survey does not exist."
            });
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id: survey_id
        });

        surveyUserRepository.save(surveyUser);

        await SendMailService.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }
}