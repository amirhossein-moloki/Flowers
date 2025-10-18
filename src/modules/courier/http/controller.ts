import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateCourierDTO, createCourierSchema } from './dto/create-courier.schema';
import { UpdateCourierDTO, updateCourierSchema } from './dto/update-courier.schema';
import { CourierPresenter } from './presenters/courier.presenter';
import { Courier } from '../domain/courier.entity';
import { Result, success } from '@/core/utils/result';

// Mock Use Cases - In a real application, these would be injected
const mockCreateCourierUseCase = {
  execute: async (dto: CreateCourierDTO): Promise<Result<Courier, Error>> => {
    const courierResult = Courier.create({ ...dto }, 'mock-id');
    if (courierResult.success) {
      return success(courierResult.value);
    }
    return courierResult;
  },
};

const mockFindCourierByIdUseCase = {
  execute: async (id: string): Promise<Result<Courier | null, Error>> => {
    const courierResult = Courier.create({
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'johndoe@test.com',
    }, id);
    if (courierResult.success) {
      return success(courierResult.value);
    }
    return success(null);
  },
};

const mockUpdateCourierUseCase = {
  execute: async (id: string, dto: UpdateCourierDTO): Promise<Result<Courier, Error>> => {
    const courierResult = Courier.create({
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'johndoe@test.com',
      ...dto
    }, id);
    if (courierResult.success) {
        return success(courierResult.value);
    }
    return courierResult;
  },
};

const mockDeleteCourierUseCase = {
  execute: async (id: string): Promise<Result<void, Error>> => {
    console.log(`Courier ${id} deleted`);
    return success(undefined);
  },
};

const mockListCouriersUseCase = {
    execute: async (): Promise<Result<Courier[], Error>> => {
        const courier1Result = Courier.create({
            name: 'John Doe',
            phone: '123-456-7890',
            email: 'johndoe@test.com',
        }, '1');
        const courier2Result = Courier.create({
            name: 'Jane Doe',
            phone: '098-765-4321',
            email: 'janedoe@test.com',
        }, '2');

        if (courier1Result.success && courier2Result.success) {
            return success([courier1Result.value, courier2Result.value]);
        }

        return success([]);
    }
}

export class CourierController {
  async create(req: Request, res: Response) {
    try {
      const courierDTO = createCourierSchema.parse(req.body);
      const result = await mockCreateCourierUseCase.execute(courierDTO);

      if (result.success) {
        return res.status(201).json(CourierPresenter.toJSON(result.value));
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
    const result = await mockFindCourierByIdUseCase.execute(id);

    if (result.success && result.value) {
      return res.status(200).json(CourierPresenter.toJSON(result.value));
    } else if (!result.value) {
      return res.status(404).json({ error: 'Courier not found' });
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await mockListCouriersUseCase.execute();

    if (result.success) {
        const couriersJSON = result.value.map(CourierPresenter.toJSON);
        return res.status(200).json(couriersJSON);
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const courierDTO = updateCourierSchema.parse(req.body);
      const result = await mockUpdateCourierUseCase.execute(id, courierDTO);

      if (result.success) {
        return res.status(200).json(CourierPresenter.toJSON(result.value));
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
    const result = await mockDeleteCourierUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }
}