import { PrismaClient } from '@prisma/client';
import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import { Result, success, failure } from '@/core/utils/result';
import { PromotionMapper } from './mappers/promotion.mapper';
import { NotFoundError } from '@/core/errors/not-found.error';

export class PrismaPromotionRepository implements IPromotionRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Result<Promotion, Error>> {
    try {
      const promotion = await this.prisma.promotion.findUnique({ where: { id } });
      if (!promotion) {
        return failure(new NotFoundError('Promotion not found'));
      }
      return PromotionMapper.toDomain(promotion);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async findByCode(code: string): Promise<Result<Promotion, Error>> {
    try {
      const promotion = await this.prisma.promotion.findUnique({ where: { code } });
      if (!promotion) {
        return failure(new NotFoundError('Promotion not found'));
      }
      return PromotionMapper.toDomain(promotion);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async findAll(): Promise<Result<Promotion[], Error>> {
    try {
      const promotions = await this.prisma.promotion.findMany();
      const domainPromotions = promotions.map((promotion) => PromotionMapper.toDomain(promotion));
      const failures = domainPromotions.filter((p) => p.failure);

      if (failures.length > 0) {
        return failure(new Error('Failed to map one or more promotions'));
      }

      return success(domainPromotions.map((p) => p.value as Promotion));
    } catch (error) {
      return failure(error as Error);
    }
  }

  async save(promotion: Promotion): Promise<Result<void, Error>> {
    try {
      const data = PromotionMapper.toPersistence(promotion);
      await this.prisma.promotion.create({ data });
      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async update(promotion: Promotion): Promise<Result<void, Error>> {
    try {
      const data = PromotionMapper.toPersistence(promotion);
      await this.prisma.promotion.update({
        where: { id: promotion.id },
        data,
      });
      return success(undefined);
    } catch (error) {
      return failure(new NotFoundError('Promotion not found'));
    }
  }

  async delete(id: string): Promise<Result<void, Error>> {
    try {
      await this.prisma.promotion.delete({ where: { id } });
      return success(undefined);
    } catch (error) {
      return failure(new NotFoundError('Promotion not found'));
    }
  }
}
