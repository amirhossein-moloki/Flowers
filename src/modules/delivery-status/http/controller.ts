import { Request, Response } from 'express';
import { z } from 'zod';
import { DeliveryStatusPresenter } from './presenters/delivery-status.presenter';
import { DeliveryStatus } from '../domain/delivery-status.entity';
import { Result, success } from '@/core/utils/result';

// Mock Use Cases - In a real application, these would be injected
const mockFindDeliveryStatusByIdUseCase = {
  execute: async (id: string): Promise<Result<DeliveryStatus | null, Error>> => {
    const deliveryStatusResult = DeliveryStatus.create({
      code: 'PENDING',
      name: 'Pending',
      display_order: 1,
    }, id);
    if (deliveryStatusResult.success) {
      return success(deliveryStatusResult.value);
    }
    return success(null);
  },
};

const mockListDeliveryStatusesUseCase = {
    execute: async (): Promise<Result<DeliveryStatus[], Error>> => {
        const deliveryStatus1Result = DeliveryStatus.create({
            code: 'PENDING',
            name: 'Pending',
            display_order: 1,
        }, '1');
        const deliveryStatus2Result = DeliveryStatus.create({
            code: 'SHIPPED',
            name: 'Shipped',
            display_order: 2,
        }, '2');

        if (deliveryStatus1Result.success && deliveryStatus2Result.success) {
            return success([deliveryStatus1Result.value, deliveryStatus2Result.value]);
        }

        return success([]);
    }
}

export class DeliveryStatusController {
  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await mockFindDeliveryStatusByIdUseCase.execute(id);

    if (result.success && result.value) {
      return res.status(200).json(DeliveryStatusPresenter.toJSON(result.value));
    } else if (!result.value) {
      return res.status(404).json({ error: 'DeliveryStatus not found' });
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await mockListDeliveryStatusesUseCase.execute();

    if (result.success) {
        const deliveryStatusesJSON = result.value.map(DeliveryStatusPresenter.toJSON);
        return res.status(200).json(deliveryStatusesJSON);
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}