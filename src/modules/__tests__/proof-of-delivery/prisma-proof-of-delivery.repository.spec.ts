import { PrismaProofOfDeliveryRepository } from '../../proof-of-delivery/infrastructure/prisma-proof-of-delivery.repository';
import { ProofOfDelivery } from '../../proof-of-delivery/domain/proof-of-delivery.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { ProofOfDeliveryMapper } from '../../proof-of-delivery/infrastructure/proof-of-delivery.mapper';

jest.mock('../../../infrastructure/database/prisma/prisma-client', () => ({
  proofOfDelivery: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../../proof-of-delivery/infrastructure/proof-of-delivery.mapper', () => ({
  ProofOfDeliveryMapper: {
    toDomain: jest.fn(),
    toPersistence: jest.fn(),
  },
}));

describe('PrismaProofOfDeliveryRepository', () => {
  let repository: PrismaProofOfDeliveryRepository;
  let mockPrisma;
  let mockMapper;

  beforeEach(() => {
    repository = new PrismaProofOfDeliveryRepository();
    mockPrisma = prisma.proofOfDelivery;
    mockMapper = ProofOfDeliveryMapper;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a proof of delivery if found', async () => {
      const proofOfDeliveryId = 'some-id';
      const prismaProofOfDelivery = { id: proofOfDeliveryId, delivery_id: 'del-1', photo_url: 'http://example.com/photo.png', receiver_name: 'John Doe', receiver_signature_url: 'http://example.com/sig.png', otp_code: '123456', created_at: new Date(), updated_at: new Date() };
      const domainProofOfDelivery = ProofOfDelivery.create({ delivery_id: 'del-1', photo_url: 'http://example.com/photo.png', receiver_name: 'John Doe', receiver_signature_url: 'http://example.com/sig.png', otp_code: '123456' }, proofOfDeliveryId).value;

      mockPrisma.findUnique.mockResolvedValue(prismaProofOfDelivery);
      mockMapper.toDomain.mockReturnValue(domainProofOfDelivery);

      const result = await repository.findById(proofOfDeliveryId);

      expect(result).toEqual(domainProofOfDelivery);
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: proofOfDeliveryId } });
      expect(mockMapper.toDomain).toHaveBeenCalledWith(prismaProofOfDelivery);
    });

    it('should return null if proof of delivery not found', async () => {
      const proofOfDeliveryId = 'non-existent-id';
      mockPrisma.findUnique.mockResolvedValue(null);

      const result = await repository.findById(proofOfDeliveryId);

      expect(result).toBeNull();
      expect(mockPrisma.findUnique).toHaveBeenCalledWith({ where: { id: proofOfDeliveryId } });
    });
  });

  describe('findAll', () => {
    it('should return all proofs of delivery', async () => {
      const prismaProofsOfDelivery = [
        { id: '1', delivery_id: 'del-1', photo_url: 'http://example.com/photo1.png', receiver_name: 'John Doe', receiver_signature_url: 'http://example.com/sig1.png', otp_code: '123456', created_at: new Date(), updated_at: new Date() },
        { id: '2', delivery_id: 'del-2', photo_url: 'http://example.com/photo2.png', receiver_name: 'Jane Doe', receiver_signature_url: 'http://example.com/sig2.png', otp_code: '654321', created_at: new Date(), updated_at: new Date() },
      ];
      const domainProofsOfDelivery = prismaProofsOfDelivery.map(pod => ProofOfDelivery.create({ delivery_id: pod.delivery_id, photo_url: pod.photo_url, receiver_name: pod.receiver_name, receiver_signature_url: pod.receiver_signature_url, otp_code: pod.otp_code }, pod.id).value);

      mockPrisma.findMany.mockResolvedValue(prismaProofsOfDelivery);
      mockMapper.toDomain.mockImplementation(pod => domainProofsOfDelivery.find(dpod => dpod.id === pod.id));

      const result = await repository.findAll();

      expect(result).toEqual(domainProofsOfDelivery);
      expect(mockPrisma.findMany).toHaveBeenCalled();
      expect(mockMapper.toDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('save', () => {
    it('should upsert a proof of delivery', async () => {
      const proofOfDelivery = ProofOfDelivery.create({ delivery_id: 'del-1', photo_url: 'http://example.com/photo.png', receiver_name: 'John Doe', receiver_signature_url: 'http://example.com/sig.png', otp_code: '123456' }, 'some-id').value;
      const persistenceProofOfDelivery = { id: 'some-id', delivery_id: 'del-1', photo_url: 'http://example.com/photo.png', receiver_name: 'John Doe', receiver_signature_url: 'http://example.com/sig.png', otp_code: '123456', created_at: new Date(), updated_at: new Date() };

      mockMapper.toPersistence.mockReturnValue(persistenceProofOfDelivery);

      await repository.save(proofOfDelivery);

      expect(mockMapper.toPersistence).toHaveBeenCalledWith(proofOfDelivery);
      expect(mockPrisma.upsert).toHaveBeenCalledWith({
        where: { id: proofOfDelivery.id },
        update: persistenceProofOfDelivery,
        create: persistenceProofOfDelivery,
      });
    });
  });

  describe('delete', () => {
    it('should delete a proof of delivery', async () => {
      const proofOfDeliveryId = 'some-id';
      await repository.delete(proofOfDeliveryId);
      expect(mockPrisma.delete).toHaveBeenCalledWith({ where: { id: proofOfDeliveryId } });
    });
  });
});