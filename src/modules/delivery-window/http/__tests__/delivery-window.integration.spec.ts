import request from 'supertest';
import App from '@/app';
import { PrismaClient, ServiceZone } from '@prisma/client';

describe('DeliveryWindow API', () => {
  let app: App;
  let prisma: PrismaClient;
  let server;
  let zone: ServiceZone;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    app = new App(prisma);
    server = app.start(3011);
  });

  afterAll(async () => {
    await prisma.deliveryWindow.deleteMany();
    await prisma.serviceZone.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  beforeEach(async () => {
    await prisma.deliveryWindow.deleteMany();
    await prisma.serviceZone.deleteMany();
    zone = await prisma.serviceZone.create({
      data: {
        name: 'Test Zone',
        geo_json: '{}',
      },
    });
  });

  describe('POST /api/v1/delivery-windows', () => {
    it('should create a new delivery window', async () => {
      const response = await request(server)
        .post('/api/v1/delivery-windows')
        .send({
          label: 'Test Window',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: zone.id,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.label).toBe('Test Window');
    });

    it('should return 422 for invalid data', async () => {
      const response = await request(server)
        .post('/api/v1/delivery-windows')
        .send({
          label: 'Test Window',
          start_time: '09:00',
          end_time: '12:00',
        });

      expect(response.status).toBe(422);
    });
  });

  describe('GET /api/v1/delivery-windows', () => {
    it('should return all delivery windows', async () => {
      await prisma.deliveryWindow.create({
        data: {
          label: 'Test Window',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: zone.id,
        },
      });

      const response = await request(server).get('/api/v1/delivery-windows');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].label).toBe('Test Window');
    });
  });

  describe('GET /api/v1/delivery-windows/:id', () => {
    it('should return a delivery window by id', async () => {
      const deliveryWindow = await prisma.deliveryWindow.create({
        data: {
          label: 'Test Window',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: zone.id,
        },
      });

      const response = await request(server).get(
        `/api/v1/delivery-windows/${deliveryWindow.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(deliveryWindow.id);
    });

    it('should return 404 for a non-existent id', async () => {
      const response = await request(server).get(
        '/api/v1/delivery-windows/non-existent-id',
      );

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/delivery-windows/:id', () => {
    it('should update a delivery window', async () => {
      const deliveryWindow = await prisma.deliveryWindow.create({
        data: {
          label: 'Test Window',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: zone.id,
        },
      });

      const response = await request(server)
        .put(`/api/v1/delivery-windows/${deliveryWindow.id}`)
        .send({
          label: 'Updated Window',
        });

      expect(response.status).toBe(200);
      expect(response.body.label).toBe('Updated Window');
    });
  });

  describe('DELETE /api/v1/delivery-windows/:id', () => {
    it('should delete a delivery window', async () => {
      const deliveryWindow = await prisma.deliveryWindow.create({
        data: {
          label: 'Test Window',
          start_time: '09:00',
          end_time: '12:00',
          cutoff_time: '08:00',
          zone_id: zone.id,
        },
      });

      const response = await request(server).delete(
        `/api/v1/delivery-windows/${deliveryWindow.id}`,
      );

      expect(response.status).toBe(204);

      const deletedWindow = await prisma.deliveryWindow.findUnique({
        where: { id: deliveryWindow.id },
      });

      expect(deletedWindow).toBeNull();
    });
  });
});
