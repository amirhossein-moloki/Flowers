import request from 'supertest';
import express from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { ListUsersUseCase } from '../../application/use-cases/list-users.usecase';
import { success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';
import { User } from '../../domain/user.entity';
import { UserRole } from '@prisma/client';
import { UserDto } from '../../application/dtos/user.dto';
import { createUserRoutes } from '../routes';
import { Dependencies } from '@/infrastructure/di';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../presentation/http/user.controller';

// Mock middleware
jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.user = { id: 'mock-user-id' };
    next();
  },
}));

jest.mock('@/config/env', () => ({
  env: {
    DATABASE_URL: 'test_url',
    REDIS_HOST: 'test_host',
    REDIS_PORT: 6379,
    JWT_SECRET: 'test_secret',
  },
}));

const mockCreateUserUseCase = {
  execute: jest.fn(),
};
const mockGetUserUseCase = {
  execute: jest.fn(),
};
const mockUpdateUserUseCase = {
  execute: jest.fn(),
};
const mockDeleteUserUseCase = {
  execute: jest.fn(),
};
const mockListUsersUseCase = {
  execute: jest.fn(),
};

const app = express();
app.use(express.json());
const userController = new UserController({
  createUserUseCase: mockCreateUserUseCase as unknown as CreateUserUseCase,
  getUserUseCase: mockGetUserUseCase as unknown as GetUserUseCase,
  updateUserUseCase: mockUpdateUserUseCase as unknown as UpdateUserUseCase,
  deleteUserUseCase: mockDeleteUserUseCase as unknown as DeleteUserUseCase,
  listUsersUseCase: mockListUsersUseCase as unknown as ListUsersUseCase,
});
import { errorHandler } from '@/infrastructure/http/middlewares/error-handler';
app.use(
  '/users',
  createUserRoutes(userController),
);
app.use(errorHandler);

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('should create a user and return 201', async () => {
      const userInput = {
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        password: 'password123',
      };

      const userDto = { id: 'new-user-id', ...userInput };
      mockCreateUserUseCase.execute.mockResolvedValue(success(userDto));

      const response = await request(app).post('/users').send(userInput);

      expect(response.status).toBe(201);
      expect(response.body.username).toBe(userInput.username);
      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(userInput);
    });

    it('should return 400 if creation fails', async () => {
      const userInput = {
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        password: 'password123',
      };

      mockCreateUserUseCase.execute.mockResolvedValue(
        failure(HttpError.badRequest('Creation failed')),
      );

      const response = await request(app).post('/users').send(userInput);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Creation failed');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const userDto: UserDto = {
        id: 'user-id',
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        createdAt: new Date(),
      };
      mockGetUserUseCase.execute.mockResolvedValue(success(userDto));

      const response = await request(app).get('/users/user-id');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe('user-id');
      expect(mockGetUserUseCase.execute).toHaveBeenCalledWith('user-id');
    });

    it('should return 404 if user not found', async () => {
      mockGetUserUseCase.execute.mockResolvedValue(
        failure(HttpError.notFound('Not found')),
      );

      const response = await request(app).get('/users/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Not found');
    });
  });

  describe('GET /users/me', () => {
    it('should return the authenticated user', async () => {
      const userDto: UserDto = {
        id: 'mock-user-id',
        username: 'me',
        email: 'me@example.com',
        role: UserRole.CUSTOMER,
        createdAt: new Date(),
      };
      mockGetUserUseCase.execute.mockResolvedValue(success(userDto));

      const response = await request(app).get('/users/me');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe('mock-user-id');
      expect(mockGetUserUseCase.execute).toHaveBeenCalledWith('mock-user-id');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user and return 200', async () => {
      const updateData = { username: 'updateduser' };
      const userDto: UserDto = {
        id: 'user-id',
        username: 'updateduser',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
        createdAt: new Date(),
      };
      mockUpdateUserUseCase.execute.mockResolvedValue(success(userDto));

      const response = await request(app).put('/users/user-id').send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe('updateduser');
      expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith('user-id', updateData);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user and return 204', async () => {
      mockDeleteUserUseCase.execute.mockResolvedValue(success(null));

      const response = await request(app).delete('/users/user-id');

      expect(response.status).toBe(204);
      expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith('user-id');
    });
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const user1: UserDto = { id: '1', username: 'user1', email: 'user1@test.com', role: UserRole.CUSTOMER, createdAt: new Date() };
      const user2: UserDto = { id: '2', username: 'user2', email: 'user2@test.com', role: UserRole.CUSTOMER, createdAt: new Date() };
      mockListUsersUseCase.execute.mockResolvedValue(success([user1, user2]));

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].username).toBe('user1');
    });
  });
});
