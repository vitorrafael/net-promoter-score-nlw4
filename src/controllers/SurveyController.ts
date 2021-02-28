import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import SurveyRepository from "../repositories/SurveyRepository";
import SurveySchema from "../schemas/SurveySchema"; 

export default class SurveyController {

    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        if (!SurveySchema.isValidSync(request.body)) {
            return response.status(400).json({
                error: "Invalid Values"
            });
        }

        const surveyRepository = getCustomRepository(SurveyRepository);

        const survey = await surveyRepository.create({ title, description });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {

        const surveyRepository = getCustomRepository(SurveyRepository);

        const surveys = await surveyRepository.find();

        return response.status(200).json(surveys);
    }
}