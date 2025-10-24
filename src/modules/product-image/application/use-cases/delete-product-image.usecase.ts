import { IProductImageRepository } from '../../domain/product-image.repository.interface';
import { UseCase } from '@/core/base/use-case';
import { Result } from '@/core/utils/result';

export class DeleteProductImageUseCase implements UseCase<boolean, string> {
  constructor(private readonly productImageRepository: IProductImageRepository) {}

  async execute(id: string): Promise<Result<boolean, Error>> {
    return this.productImageRepository.delete(id);
  }
}
