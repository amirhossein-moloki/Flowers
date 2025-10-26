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
      const results = promotions.map(PromotionMapper.toDomain);
      const errors = results.filter((r): r is Result<Promotion, Error> & { success: false } => !r.success);

      if (errors.length > 0) {
        return failure(new Error('Failed to map one or more promotions'));
      }

      const successes = results as (Result<Promotion, Error> & { success: true })[];
      return success(successes.map(r => r.value));
    } catch (error) {
      return failure(error as Error);
    }
  }

  async save(promotion: Promotion): Promise<Result<Promotion, Error>> {
    try {
      const data = PromotionMapper.toPersistence(promotion);
      const createdPromotion = await this.prisma.promotion.create({ data });
      return PromotionMapper.toDomain(createdPromotion);
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
