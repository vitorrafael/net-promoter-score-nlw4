import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getRepository(User);

        const userAlreadyExists = await UserController.validateUserAlreadyExistsByEmail(email);

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
        }
        const user = await usersRepository.create({name, email});
        
        await usersRepository.save(user);

        return response.json(user);
    }

    static async validateUserAlreadyExistsByEmail(email: String) {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ email });
        return Boolean(user);
    }

}

export { UserController };