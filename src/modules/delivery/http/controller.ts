import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateDeliveryDTO, createDeliverySchema } from './dto/create-delivery.schema';
import { UpdateDeliveryDTO, updateDeliverySchema } from './dto/update-delivery.schema';
import { DeliveryPresenter } from './presenters/delivery.presenter';
import { Delivery } from '../domain/delivery.entity';
import { Result, success } from '@/core/utils/result';
import { VehicleType } from '@/core/domain/enums';

// Mock Use Cases - In a real application, these would be injected
const mockCreateDeliveryUseCase = {
  execute: async (dto: CreateDeliveryDTO): Promise<Result<Delivery, Error>> => {
    const deliveryResult = Delivery.create({ ...dto }, 'mock-id');
    if (deliveryResult.success) {
      return success(deliveryResult.value);
    }
    return deliveryResult;
  },
};

const mockFindDeliveryByIdUseCase = {
  execute: async (id: string): Promise<Result<Delivery | null, Error>> => {
    const deliveryResult = Delivery.create({
      order_id: 'order-1',
      courier_id: 'courier-1',
      status_id: 'status-1',
      vehicle_type: VehicleType.MOTORCYCLE,
      assigned_at: new Date(),
      pickup_at: new Date(),
      dropoff_at: new Date(),
      distance_meters: 1000,
      eta_seconds: 600,
      failure_reason: '',
    }, id);
    if (deliveryResult.success) {
      return success(deliveryResult.value);
    }
    return success(null);
  },
};

const mockUpdateDeliveryUseCase = {
  execute: async (id: string, dto: UpdateDeliveryDTO): Promise<Result<Delivery, Error>> => {
    const deliveryResult = Delivery.create({
        order_id: 'order-1',
        courier_id: 'courier-1',
        status_id: 'status-1',
        vehicle_type: VehicleType.MOTORCYCLE,
        assigned_at: new Date(),
        pickup_at: new Date(),
        dropoff_at: new Date(),
        distance_meters: 1000,
        eta_seconds: 600,
        failure_reason: '',
      ...dto
    }, id);
    if (deliveryResult.success) {
        return success(deliveryResult.value);
    }
    return deliveryResult;
  },
};

const mockDeleteDeliveryUseCase = {
  execute: async (id: string): Promise<Result<void, Error>> => {
    console.log(`Delivery ${id} deleted`);
    return success(undefined);
  },
};

const mockListDeliveriesUseCase = {
    execute: async (): Promise<Result<Delivery[], Error>> => {
        const delivery1Result = Delivery.create({
            order_id: 'order-1',
            courier_id: 'courier-1',
            status_id: 'status-1',
            vehicle_type: VehicleType.MOTORCYCLE,
            assigned_at: new Date(),
            pickup_at: new Date(),
            dropoff_at: new Date(),
            distance_meters: 1000,
            eta_seconds: 600,
            failure_reason: '',
        }, '1');
        const delivery2Result = Delivery.create({
            order_id: 'order-2',
            courier_id: 'courier-2',
            status_id: 'status-2',
            vehicle_type: VehicleType.CAR,
            assigned_at: new Date(),
            pickup_at: new Date(),
            dropoff_at: new Date(),
            distance_meters: 2000,
            eta_seconds: 1200,
            failure_reason: '',
        }, '2');

        if (delivery1Result.success && delivery2Result.success) {
            return success([delivery1Result.value, delivery2Result.value]);
        }

        return success([]);
    }
}

export class DeliveryController {
  async create(req: Request, res: Response) {
    try {
      const deliveryDTO = createDeliverySchema.parse(req.body);
      const result = await mockCreateDeliveryUseCase.execute(deliveryDTO);

      if (result.success) {
        return res.status(201).json(DeliveryPresenter.toJSON(result.value));
      } else {
        return res.status(400).json({ error: result.error.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await mockFindDeliveryByIdUseCase.execute(id);

    if (result.success && result.value) {
      return res.status(200).json(DeliveryPresenter.toJSON(result.value));
    } else if (!result.value) {
      return res.status(404).json({ error: 'Delivery not found' });
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await mockListDeliveriesUseCase.execute();

    if (result.success) {
        const deliveriesJSON = result.value.map(DeliveryPresenter.toJSON);
        return res.status(200).json(deliveriesJSON);
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deliveryDTO = updateDeliverySchema.parse(req.body);
      const result = await mockUpdateDeliveryUseCase.execute(id, deliveryDTO);

      if (result.success) {
        return res.status(200).json(DeliveryPresenter.toJSON(result.value));
      } else {
        return res.status(400).json({ error: result.error.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await mockDeleteDeliveryUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }
}