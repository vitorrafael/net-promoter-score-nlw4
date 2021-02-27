import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

export default class NpsController {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUsers = await surveyUserRepository.find({ survey_id, value: Not(IsNull()) });

        const detractors = surveyUsers.filter( (survey) => (survey.value >= 0 && survey.value <= 6)).length;
        const passives = surveyUsers.filter( (survey) => (survey.value >= 7 && survey.value <= 8)).length;
        const promoters = surveyUsers.filter( (survey) => (survey.value >= 9 && survey.value <= 10)).length;

        const totalRespondents = surveyUsers.length;

        const nps = Number(calculateNps(detractors, promoters, totalRespondents).toFixed(2));

        return response.json({
            detractors,
            passives,
            promoters,
            totalRespondents,
            nps
        })
    }
}

function calculateNps(detractors: number, promoters: number, totalRespondents: number) : number {
    return ((promoters - detractors) / totalRespondents) * 100;
}