import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository';
import { Result, success, failure } from '@/core/utils/result';

type DeletePromotionRequest = {
  id: string;
};

export class DeletePromotionUseCase {
  constructor(private promotionRepository: IPromotionRepository) {}

  async execute(request: DeletePromotionRequest): Promise<Result<void, Error>> {
    const findResult = await this.promotionRepository.findById(request.id);

    if (findResult.isFailure()) {
      return failure(findResult.error);
    }

    const deleteResult = await this.promotionRepository.delete(request.id);

    return deleteResult;
  }
}
