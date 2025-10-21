import request from 'supertest';
import { app } from '../../../../../index';
import { clearAddressStore } from '../controller'; // Import the clear function

describe('Address Module - Integration Tests', () => {
  let addressId: string;

  const addressData = {
    street: '123 Test St',
    city: 'Testville',
    state: 'TS',
    zipCode: '12345',
    country: 'Testland',
  };

  // Clear the in-memory store before each test
  beforeEach(() => {
    clearAddressStore();
  });

  // Test: Create Address (POST /api/v1/address)
  describe('POST /api/v1/address', () => {
    it('should create a new address successfully', async () => {
      const response = await request(app)
        .post('/api/v1/address')
        .send(addressData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.street).toBe(addressData.street);
      addressId = response.body.id;
    });

    it('should return 400 for invalid input', async () => {
      await request(app)
        .post('/api/v1/address')
        .send({ ...addressData, street: '' }) // Invalid street
        .expect(400);
    });
  });

  // Test: Get Address by ID (GET /api/v1/address/:id)
  describe('GET /api/v1/address/:id', () => {
    beforeEach(async () => {
      // Create an address to be fetched
      const response = await request(app).post('/api/v1/address').send(addressData);
      addressId = response.body.id;
    });

    it('should retrieve an address by its ID', async () => {
      const response = await request(app)
        .get(`/api/v1/address/${addressId}`)
        .expect(200);

      expect(response.body.id).toBe(addressId);
      expect(response.body.street).toBe(addressData.street);
    });

    it('should return 404 for a non-existent address', async () => {
      await request(app)
        .get('/api/v1/address/non-existent-id')
        .expect(404);
    });
  });

  // Test: List Addresses (GET /api/v1/address)
  describe('GET /api/v1/address', () => {
    beforeEach(async () => {
      // Create a couple of addresses to be listed
      await request(app).post('/api/v1/address').send(addressData);
      await request(app).post('/api/v1/address').send({ ...addressData, street: '456 Other St' });
    });

    it('should retrieve a list of addresses', async () => {
      const response = await request(app)
        .get('/api/v1/address')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  // Test: Update Address (PUT /api/v1/address/:id)
  describe('PUT /api/v1/address/:id', () => {
    beforeEach(async () => {
      // Create an address to be updated
      const response = await request(app).post('/api/v1/address').send(addressData);
      addressId = response.body.id;
    });

    it('should update an existing address', async () => {
      const updatedData = { ...addressData, street: '456 Updated St' };
      const response = await request(app)
        .put(`/api/v1/address/${addressId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.street).toBe(updatedData.street);
    });

    it('should return 400 for invalid update data', async () => {
      await request(app)
        .put(`/api/v1/address/${addressId}`)
        .send({ ...addressData, zipCode: '' }) // Invalid zipCode
        .expect(400);
    });
  });

  // Test: Delete Address (DELETE /api/v1/address/:id)
  describe('DELETE /api/v1/address/:id', () => {
    beforeEach(async () => {
      // Create an address to be deleted
      const response = await request(app).post('/api/v1/address').send(addressData);
      addressId = response.body.id;
    });

    it('should delete an address successfully', async () => {
      await request(app)
        .delete(`/api/v1/address/${addressId}`)
        .expect(204);
    });

    it('should return 404 when trying to get the deleted address', async () => {
        await request(app)
          .delete(`/api/v1/address/${addressId}`) // make sure it's gone

        await request(app)
          .get(`/api/v1/address/${addressId}`)
          .expect(404);
      });
  });
});