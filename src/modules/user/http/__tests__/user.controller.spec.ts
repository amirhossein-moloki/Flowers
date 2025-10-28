import request from 'supertest';
import express from 'express';
import { mock } from 'jest-mock-extended';
import { GetUserUseCase } from '@/modules/user/application/use-cases';
import { UserController } from '@/modules/user/http/controller';
import { createUserRoutes } from '@/modules/user/http/routes';
import { success } from '@/core/utils/result';
import { Role } from '@prisma/client';

jest.mock('@/core/middlewares/auth.middleware', () => ({
    isAuthenticated: jest.fn((req, res, next) => {
        req.user = { id: 'mock-user-id' };
        next();
    }),
}));

jest.mock('@prisma/client', () => {
    const originalModule = jest.requireActual('@prisma/client');
    return {
        ...originalModule,
        Role: {
            CUSTOMER: 'CUSTOMER',
        },
    };
});

describe('UserController', () => {
    let app: express.Application;
    const mockGetUserUseCase = mock<GetUserUseCase>();

    beforeAll(() => {
        const userController = new UserController({
            getUserUseCase: mockGetUserUseCase,
        } as any);
        const userRoutes = createUserRoutes(userController);
        app = express();
        app.use(express.json());
        app.use('/users', userRoutes);
    });

    describe('GET /users/me', () => {
        it('should return the authenticated user', async () => {
            const user = {
                id: 'mock-user-id',
                email: 'test@example.com',
                username: 'testuser',
                role: Role.CUSTOMER,
            };
            mockGetUserUseCase.execute.mockResolvedValue(success(user as any));

            const response = await request(app).get('/users/me');

            expect(response.status).toBe(200);
            expect(response.body.id).toBe('mock-user-id');
            expect(mockGetUserUseCase.execute).toHaveBeenCalledWith('mock-user-id');
        });
    });
});
