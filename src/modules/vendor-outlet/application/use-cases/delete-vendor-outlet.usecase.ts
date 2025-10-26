import { Result, success, failure } from '@/core/utils/result';
import { IVendorOutletRepository } from '../../domain/vendor-outlet.repository';

export class DeleteVendorOutletUseCase {
  constructor(
    private readonly vendorOutletRepository: IVendorOutletRepository,
  ) {}

  async execute(id: string): Promise<Result<void, Error>> {
    try {
      const deleted = await this.vendorOutletRepository.delete(id);
      if (!deleted) {
        return failure(new Error('Vendor outlet not found'));
      }
      return success(undefined);
    } catch (error: any) {
      return failure(new Error(error.message));
    }
  }
}
