import request from 'supertest';
import App from '@/app';
import { PrismaClient, UserRole } from '@prisma/client';
import { Dependencies } from '@/infrastructure/di';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { User } from '@/modules/user/domain/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { env } from '@/config/env';
import { ServiceZone } from '@/modules/service-zone/domain/service-zone.entity';
import { execSync } from 'child_process';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  ...jest.requireActual('@/core/middlewares/auth.middleware'),
  isAuthenticated: jest.fn((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verify(token, env.JWT_SECRET);
      // @ts-ignore
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }),
}));

describe('ServiceZone Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let dependencies: Dependencies;
  let userRepository: IUserRepository;
  let authToken: string;
  let authedUser: User;
  let testServiceZone: ServiceZone;
  let server: import('http').Server;

  beforeAll(async () => {
    execSync('npx prisma migrate reset --force --schema=src/infrastructure/database/prisma/schema.prisma');
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.start(env.PORT);
    dependencies = app.dependencies;

    userRepository = dependencies.userRepository;

    const userResult = User.create({
        username: 'test_service_zone_user',
        email: 'test_service_zone_user@test.com',
        password: 'password123',
        role: UserRole.CUSTOMER,
        is_active: true,
      });

      if (userResult.failure) {
        throw userResult.error;
      }

      authedUser = userResult.value;
      await userRepository.save(authedUser);

      authToken = sign({ id: authedUser.id, role: authedUser.role }, env.JWT_SECRET, { expiresIn: '1h' });

      const serviceZoneResult = ServiceZone.create({
        name: 'Test Zone',
        points: 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))'
      });

      if (serviceZoneResult.failure) {
        throw serviceZoneResult.error;
      }
      testServiceZone = serviceZoneResult.value;
      await dependencies.serviceZoneRepository.save(testServiceZone);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  describe('GET /service-zones', () => {
    it('should return a list of service zones for an authenticated user', async () => {
      const response = await request(app.getServer())
        .get('/api/v1/service-zones')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe(testServiceZone.name);
    });

    it('should return 401 for an unauthenticated user', async () => {
        const response = await request(app.getServer())
          .get('/api/v1/service-zones');

        expect(response.status).toBe(401);
      });
  });

  describe('GET /service-zones/:id', () => {
    it('should return a single service zone by id for an authenticated user', async () => {
      const response = await request(app.getServer())
        .get(`/api/v1/service-zones/${testServiceZone.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testServiceZone.id);
      expect(response.body.name).toBe(testServiceZone.name);
    });

    it('should return 404 if service zone not found', async () => {
      const nonExistentId = 'clxsmf25p000008l3g1h3c9d8';
      const response = await request(app.getServer())
        .get(`/api/v1/service-zones/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });

    it('should return 401 for an unauthenticated user', async () => {
        const response = await request(app.getServer())
            .get(`/api/v1/service-zones/${testServiceZone.id}`);

        expect(response.status).toBe(401);
    });
  });
});
