import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import * as yup from "yup";

export default class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
        });

        if(!(await schema.isValid(request.body))) {
            return response.status(400).json({
                error: "Invalid values!"
            })
        }

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await UserController.validateUserAlreadyExistsByEmail(email);

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
        }
        const user = await userRepository.create({name, email});
        
        await userRepository.save(user);

        return response.status(201).json(user);
    }

    static async validateUserAlreadyExistsByEmail(email: string) {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({ email });
        return Boolean(user);
    }

}