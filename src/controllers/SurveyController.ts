import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";

export default class SurveyController {

    async create(request: Request, response: Response) {
        const { title, description } = request.body;

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