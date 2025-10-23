import { Prisma, PrismaClient } from '@prisma/client';
import { ProofOfDelivery } from '../domain/proof-of-delivery.entity';
import { ProofOfDeliveryRepository } from '../domain/proof-of-delivery.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class PrismaProofOfDeliveryRepository implements ProofOfDeliveryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: ProofOfDelivery): Promise<Result<ProofOfDelivery, Error>> {
    try {
      const proofOfDelivery = await this.prisma.proofOfDelivery.create({
        data: {
          delivery_id: data.delivery_id,
          signature_url: data.signature_url,
          photo_url: data.photo_url,
          notes: data.notes,
        },
      });
      return success(
        ProofOfDelivery.create(
          {
            delivery_id: proofOfDelivery.delivery_id,
            signature_url: proofOfDelivery.signature_url,
            photo_url: proofOfDelivery.photo_url,
            notes: proofOfDelivery.notes,
            is_verified: proofOfDelivery.is_verified,
          },
          proofOfDelivery.id
        ).value
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return failure(HttpError.notFound('Proof of delivery not found'));
      }
      return failure(error as Error);
    }
  }

  async findById(id: string): Promise<Result<ProofOfDelivery, Error>> {
    try {
      const proofOfDelivery = await this.prisma.proofOfDelivery.findUnique({
        where: { id },
      });
      if (!proofOfDelivery) {
        return failure(HttpError.notFound('Proof of delivery not found'));
      }
      return success(
        ProofOfDelivery.create(
          {
            delivery_id: proofOfDelivery.delivery_id,
            signature_url: proofOfDelivery.signature_url,
            photo_url: proofOfDelivery.photo_url,
            notes: proofOfDelivery.notes,
            is_verified: proofOfDelivery.is_verified,
          },
          proofOfDelivery.id
        ).value
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return failure(HttpError.notFound('Proof of delivery not found'));
      }
      return failure(error as Error);
    }
  }

  async update(id: string, data: ProofOfDelivery): Promise<Result<ProofOfDelivery, Error>> {
    try {
      const proofOfDelivery = await this.prisma.proofOfDelivery.update({
        where: { id },
        data: {
          signature_url: data.signature_url,
          photo_url: data.photo_url,
          notes: data.notes,
          is_verified: data.is_verified,
        },
      });
      return success(
        ProofOfDelivery.create(
          {
            delivery_id: proofOfDelivery.delivery_id,
            signature_url: proofOfDelivery.signature_url,
            photo_url: proofOfDelivery.photo_url,
            notes: proofOfDelivery.notes,
            is_verified: proofOfDelivery.is_verified,
          },
          proofOfDelivery.id
        ).value
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return failure(HttpError.notFound('Proof of delivery not found'));
      }
      return failure(error as Error);
    }
  }

  async delete(id: string): Promise<Result<void, Error>> {
    try {
      await this.prisma.proofOfDelivery.delete({ where: { id } });
      return success(undefined);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return failure(HttpError.notFound('Proof of delivery not found'));
      }
      return failure(error as Error);
    }
  }
}
