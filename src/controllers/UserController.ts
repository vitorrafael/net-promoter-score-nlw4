import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";

import UserRepository from "../repositories/UserRepository";
import UserSchema from "../schemas/UserSchema";

import User from "../models/User";
import ErrorHandler from "../errors/ErrorHandler";
import Errors from "../enums/Errors";

export default class UserController {

    private userRepository : Repository<User>

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async create(request: Request, response: Response) {

        const { name, email } = request.body;

        ErrorHandler.validate(UserSchema.isValidSync({ name, email }), Errors.INVALID_VALUE);
        ErrorHandler.validate(! (await this.validateUserAlreadyExistsByEmail(email)), Errors.USER_ALREADY_EXIST);

        const user = await this.userRepository.create({name, email});

        await this.userRepository.save(user);

        return response.status(201).json(user);
    }

    async validateUserAlreadyExistsByEmail(email: string) {
        const usersWithEmail = await this.userRepository.count({ email });
        return usersWithEmail === 0;
    }

}