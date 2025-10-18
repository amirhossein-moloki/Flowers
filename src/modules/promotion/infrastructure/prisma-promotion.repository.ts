import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Promotion } from '@/modules/promotion/domain/promotion.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { PromotionMapper } from '@/modules/promotion/infrastructure/promotion.mapper';

export class PrismaPromotionRepository implements IPromotionRepository {
  async findById(id: string): Promise<Promotion | null> {
    const promotion = await prisma.promotion.findUnique({ where: { id } });
    return promotion ? PromotionMapper.toDomain(promotion) : null;
  }

  async findByCode(code: string): Promise<Promotion | null> {
    const promotion = await prisma.promotion.findUnique({ where: { code } });
    return promotion ? PromotionMapper.toDomain(promotion) : null;
  }

  async save(promotion: Promotion): Promise<void> {
    const data = PromotionMapper.toPersistence(promotion);
    await prisma.promotion.upsert({
      where: { id: promotion.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.promotion.delete({ where: { id } });
  }
}