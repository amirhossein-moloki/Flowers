import { Router } from 'express';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '../../infrastructure/prisma-user.repository';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';

const router = Router();

// Dependencies
const userRepository = new PrismaUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, getUserUseCase);

router.use('/users', userController.router);

export default router;