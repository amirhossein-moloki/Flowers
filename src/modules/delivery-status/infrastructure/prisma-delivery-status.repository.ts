import { PrismaClient } from '@prisma/client';
import { IDeliveryStatusRepository } from '../domain/delivery-status.repository';
import { DeliveryStatus } from '../domain/delivery-status.entity';
import { DeliveryStatusMapper } from './delivery-status.mapper';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export class PrismaDeliveryStatusRepository implements IDeliveryStatusRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Result<DeliveryStatus | null, HttpError>> {
    try {
      const deliveryStatus = await this.prisma.deliveryStatus.findUnique({
        where: { id },
      });

      if (!deliveryStatus) {
        return failure(HttpError.notFound('Delivery status not found'));
      }

      const deliveryStatusEntityResult = DeliveryStatusMapper.toDomain(deliveryStatus);
      return success(deliveryStatusEntityResult);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async findAll(): Promise<Result<DeliveryStatus[], HttpError>> {
    try {
      const deliveryStatuses = await this.prisma.deliveryStatus.findMany();
      const deliveryStatusEntities = deliveryStatuses.map(DeliveryStatusMapper.toDomain);
      return success(deliveryStatusEntities);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async save(deliveryStatus: DeliveryStatus): Promise<Result<DeliveryStatus, HttpError>> {
    try {
      const data = DeliveryStatusMapper.toPersistence(deliveryStatus);
      const { id, ...updateData } = data;
      const prismaDeliveryStatus = await this.prisma.deliveryStatus.upsert({
        where: { id: deliveryStatus.id },
        update: updateData,
        create: data,
      });

      const newDeliveryStatusEntity = DeliveryStatusMapper.toDomain(prismaDeliveryStatus);
      return success(newDeliveryStatusEntity);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async delete(id: string): Promise<Result<null, HttpError>> {
    try {
      await this.prisma.deliveryStatus.delete({ where: { id } });
      return success(null);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }
}
