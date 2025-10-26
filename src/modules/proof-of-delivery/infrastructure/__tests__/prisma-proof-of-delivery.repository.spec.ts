import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaProofOfDeliveryRepository } from '../prisma-proof-of-delivery.repository';
import { ProofOfDelivery } from '../../domain/proof-of-delivery.entity';

describe('PrismaProofOfDeliveryRepository', () => {
  let repository: PrismaProofOfDeliveryRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    repository = new PrismaProofOfDeliveryRepository(prismaMock);
  });

  it('should create a new proof of delivery', async () => {
    const proofOfDeliveryResult = ProofOfDelivery.create({
      delivery_id: 'a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a',
      signature_url: 'http://example.com/signature.png',
      photo_url: 'http://example.com/photo.png',
      notes: 'Delivered to front door.',
    });

    if (!proofOfDeliveryResult.success) {
      throw new Error('Failed to create test entity');
    }
    const proofOfDeliveryEntity = proofOfDeliveryResult.value;

    const createdProofOfDelivery = {
      id: 'some-id',
      delivery_id: 'a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a',
      signature_url: 'http://example.com/signature.png',
      photo_url: 'http://example.com/photo.png',
      notes: 'Delivered to front door.',
      is_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    prismaMock.proofOfDelivery.create.mockResolvedValue(createdProofOfDelivery);

    const result = await repository.create(proofOfDeliveryEntity);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeInstanceOf(ProofOfDelivery);
      expect(result.value.id).toBe('some-id');
    }
  });

  it('should find a proof of delivery by id', async () => {
    const proofOfDeliveryId = 'some-id';
    const prismaProofOfDelivery = {
      id: proofOfDeliveryId,
      delivery_id: 'a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a',
      signature_url: 'http://example.com/signature.png',
      photo_url: 'http://example.com/photo.png',
      notes: 'Delivered to front door.',
      is_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    prismaMock.proofOfDelivery.findUnique.mockResolvedValue(prismaProofOfDelivery);

    const result = await repository.findById(proofOfDeliveryId);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeInstanceOf(ProofOfDelivery);
      expect(result.value.id).toBe(proofOfDeliveryId);
    }
  });

  it('should update a proof of delivery', async () => {
    const proofOfDeliveryId = 'some-id';
    const updatedProofOfDeliveryResult = ProofOfDelivery.create({
      delivery_id: 'a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a',
      notes: 'Updated notes.',
    });

    if (!updatedProofOfDeliveryResult.success) {
      throw new Error('Failed to create test entity');
    }
    const updatedProofOfDeliveryEntity = updatedProofOfDeliveryResult.value;

    const updatedPrismaProofOfDelivery = {
      id: proofOfDeliveryId,
      delivery_id: 'a2a0a4a0-8b0a-4b0a-8b0a-0a4a0a4a0a4a',
      signature_url: null,
      photo_url: null,
      notes: 'Updated notes.',
      is_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    prismaMock.proofOfDelivery.update.mockResolvedValue(updatedPrismaProofOfDelivery);

    const result = await repository.update(proofOfDeliveryId, updatedProofOfDeliveryEntity);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeInstanceOf(ProofOfDelivery);
      expect(result.value.props.notes).toBe('Updated notes.');
    }
  });

  it('should delete a proof of delivery', async () => {
    const proofOfDeliveryId = 'some-id';
    prismaMock.proofOfDelivery.delete.mockResolvedValue({} as any);

    const result = await repository.delete(proofOfDeliveryId);

    expect(result.success).toBe(true);
    expect(prismaMock.proofOfDelivery.delete).toHaveBeenCalledWith({ where: { id: proofOfDeliveryId } });
  });
});
