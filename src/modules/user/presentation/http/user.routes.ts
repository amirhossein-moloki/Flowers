import { Router } from 'express';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '../../infrastructure/prisma-user.repository';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';

import { PrismaClient } from '@prisma/client';

const router = Router();

// Dependencies
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, getUserUseCase);

router.use('/users', userController.router);

export default router;