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

// This instance is now shared between the test and the repository
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const userController = new UserController(
  new CreateUserUseCase(userRepository),
  new GetUserUseCase(userRepository),
);

app.use('/users', userController.router);

describe('User Integration Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "User";`);
    await prisma.$executeRawUnsafe(`CREATE TABLE "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "username" TEXT NOT NULL UNIQUE,
      "email" TEXT NOT NULL UNIQUE,
      "password" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );`);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /users', () => {
    it('should create a new user and return 201', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        password: 'password123',
      };

      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(newUser.username);
    });

    it('should return 422 for missing required fields', async () => {
      const newUser = {
        username: 'testuser',
      };

      const response = await request(app).post('/users').send(newUser);
      expect(response.status).toBe(422);
    });

    it('should return 422 for invalid email', async () => {
      const newUser = {
        username: 'testuser',
        email: 'not-an-email',
        role: UserRole.CUSTOMER,
        password: 'password123',
      };

      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(422);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const user = await prisma.user.create({
        data: {
          username: 'gettest',
          email: 'gettest@example.com',
          role: 'CUSTOMER',
          password: 'password123',
        },
      });

      const response = await request(app).get(`/users/${user.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(user.id);
    });

    it('should return 404 for a non-existent user', async () => {
      const response = await request(app).get('/users/non-existent-id');
      expect(response.status).toBe(404);
    });
  });
});
