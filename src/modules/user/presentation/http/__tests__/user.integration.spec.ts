import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { UserController } from '../user.controller';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user.repository';
import { CreateUserUseCase } from '@/modules/user/application/use-cases/create-user.usecase';
import { GetUserUseCase } from '@/modules/user/application/use-cases/get-user.usecase';
import { UserRole } from '@/core/domain/enums';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, getUserUseCase);

app.use('/users', userController.router);

describe('User Integration Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('POST /users', () => {
    it('should create a new user and return 201', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        password: 'password123',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(newUser.username);
    });

    it('should return 400 for missing required fields', async () => {
      const newUser = {
        username: 'testuser',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid email', async () => {
      const newUser = {
        username: 'testuser',
        email: 'not-an-email',
        role: UserRole.CUSTOMER,
        password: 'password123',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const newUser = await prisma.user.create({
        data: {
          username: 'gettest',
          email: 'gettest@example.com',
          role: 'CUSTOMER',
          password: 'password123',
        },
      });

      const response = await request(app).get(`/users/${newUser.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(newUser.id);
    });

    it('should return 404 for a non-existent user', async () => {
      const response = await request(app).get('/users/non-existent-id');
      expect(response.status).toBe(404);
    });
  });
});
