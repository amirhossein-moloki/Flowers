import request from 'supertest';
import express from 'express';
import { createProofOfDeliveryRoutes } from '../routes';
import { Dependencies } from '@/infrastructure/di';
import { success } from '@/core/utils/result';

describe('ProofOfDelivery Controller', () => {
  let app: express.Express;
  let dependencies: Partial<Dependencies>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    dependencies = {
      createProofOfDeliveryUseCase: {
        execute: jest.fn().mockResolvedValue(success({})),
      },
      findProofOfDeliveryByIdUseCase: {
        execute: jest.fn().mockResolvedValue(success({})),
      },
      updateProofOfDeliveryUseCase: {
        execute: jest.fn().mockResolvedValue(success({})),
      },
      deleteProofOfDeliveryUseCase: {
        execute: jest.fn().mockResolvedValue(success(undefined)),
      },
    };

    const proofOfDeliveryRoutes = createProofOfDeliveryRoutes(dependencies as Dependencies);
    app.use('/proof-of-delivery', proofOfDeliveryRoutes);
  });

  it('should create a new proof of delivery', async () => {
    await request(app)
      .post('/proof-of-delivery')
      .send({
        delivery_id: 'a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a',
        signature_url: 'http://example.com/signature.png',
        photo_url: 'http://example.com/photo.png',
        notes: 'Delivered to front door.',
      })
      .expect(201);
  });

  it('should find a proof of delivery by id', async () => {
    await request(app).get('/proof-of-delivery/a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a').expect(200);
  });

  it('should update a proof of delivery', async () => {
    await request(app)
      .put('/proof-of-delivery/a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a')
      .send({
        notes: 'Updated notes.',
      })
      .expect(200);
  });

  it('should delete a proof of delivery', async () => {
    await request(app).delete('/proof-of-delivery/a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a').expect(204);
  });
});
