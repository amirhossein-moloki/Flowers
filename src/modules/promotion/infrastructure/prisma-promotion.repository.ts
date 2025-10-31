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
      const result = PromotionMapper.toDomain(promotion);
      if (result.isFailure()) {
        return failure(result.error);
      }
      return success(result.value);
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
      const result = PromotionMapper.toDomain(promotion);
      if (result.isFailure()) {
        return failure(result.error);
      }
      return success(result.value);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async findAll(): Promise<Result<Promotion[], Error>> {
    try {
      const promotions = await this.prisma.promotion.findMany();
      const results = promotions.map(PromotionMapper.toDomain);
      const combined = Result.combine(results);
      if (combined.isFailure()) {
        return failure(combined.error);
      }
      return success(combined.value);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async save(promotion: Promotion): Promise<Result<Promotion, Error>> {
    try {
      const data = PromotionMapper.toPersistence(promotion);
      const createdPromotion = await this.prisma.promotion.create({ data });
      const result = PromotionMapper.toDomain(createdPromotion);
      if (result.isFailure()) {
        return failure(result.error);
      }
      return success(result.value);
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
