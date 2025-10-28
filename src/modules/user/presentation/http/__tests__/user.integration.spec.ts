import request from 'supertest';
import { Server } from 'http';
import App from '@/app';
import { PrismaClient, User } from '@prisma/client';
import { randomUUID } from 'crypto';

describe('User Integration Tests', () => {
    let app: App;
    let server: Server;
    let prisma: PrismaClient;

    beforeAll(async () => {
        prisma = new PrismaClient();
        app = new App(prisma);
        server = app.start(3005);
    });

    beforeEach(async () => {
        await prisma.orderItem.deleteMany({});
        await prisma.payment.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.courier.deleteMany({});
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        server.close();
        await prisma.$disconnect();
    });

    describe('POST /users', () => {
        it('should create a new user and return 201', async () => {
            const response = await request(server)
                .post('/api/v1/users')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    username: 'testuser',
                    role: 'CUSTOMER'
                });

            expect(response.status).toBe(201);
            expect(response.body.email).toBe('test@example.com');
        });

        it('should return 422 for missing required fields', async () => {
            const response = await request(server)
                .post('/api/v1/users')
                .send({
                    email: 'test@example.com',
                });

            expect(response.status).toBe(422);
        });

        it('should return 422 for invalid email', async () => {
            const response = await request(server)
                .post('/api/v1/users')
                .send({
                    email: 'invalid-email',
                    password: 'password123',
                    username: 'testuser',
                });

            expect(response.status).toBe(422);
        });
    });

    describe('GET /users/:id', () => {
        it('should return a user by id', async () => {
            const user = await prisma.user.create({
                data: {
                    email: 'test@example.com',
                    password: 'password123',
                    username: 'testuser',
                },
            });

            const response = await request(server).get(`/api/v1/users/${user.id}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(user.id);
        });

        it('should return 404 for a non-existent user', async () => {
            const response = await request(server).get(`/api/v1/users/${randomUUID()}`);
            expect(response.status).toBe(404);
        });
    });
});
