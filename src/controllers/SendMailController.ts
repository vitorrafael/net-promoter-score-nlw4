import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";
import SurveyUserRepository from "../repositories/SurveyUserRepository";
import UserRepository from "../repositories/UserRepository";

export default class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;


        if (!(await SendMailController.userExistsByEmail(email))) {
            return response.status(400).json({
                error: "User does not exist."
            })
        }

        if(!(await SendMailController.surveyExistsById(survey_id))) {
            return response.status(400).json({
                error: "Survey does not exist."
            })
        }


        const userRepository = getCustomRepository(UserRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user =  await userRepository.findOne({ email });

        const surveyUser = surveyUserRepository.create({
            user_id: user && user.id,
            survey_id: survey_id
        });

        surveyUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }

    static async userExistsByEmail(email: String) {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({ email });

        return Boolean(user);
    }

    static async surveyExistsById(id: String) {
        const surveyRepository = getCustomRepository(SurveyRepository);
        const survey = await surveyRepository.findOne({ id });

        return Boolean(survey);
    }
}