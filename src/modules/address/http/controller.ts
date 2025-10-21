import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateAddressDTO, createAddressSchema } from './dto/create-address.schema';
import { UpdateAddressDTO, updateAddressSchema } from './dto/update-address.schema';
import { AddressPresenter } from './presenters/address.presenter';
import { Address } from '../domain/address.entity';
import { Result, success, failure } from '@/core/utils/result';
import { randomUUID } from 'crypto';

// In-memory store for testing purposes
let addresses: Address[] = [];

// Export a function to clear the store for test isolation
export const clearAddressStore = () => {
  addresses = [];
};

const mockCreateAddressUseCase = {
  execute: async (dto: CreateAddressDTO): Promise<Result<Address, Error>> => {
    const id = randomUUID();
    const addressResult = Address.create({ ...dto }, id);
    if (addressResult.success) {
      addresses.push(addressResult.value);
      return success(addressResult.value);
    }
    return addressResult;
  },
};

const mockFindAddressByIdUseCase = {
  execute: async (id: string): Promise<Result<Address | null, Error>> => {
    const address = addresses.find(a => a.id === id);
    return success(address || null);
  },
};

const mockUpdateAddressUseCase = {
  execute: async (id: string, dto: UpdateAddressDTO): Promise<Result<Address, Error>> => {
    const addressIndex = addresses.findIndex(a => a.id === id);
    if (addressIndex === -1) {
      return failure(new Error('Address not found'));
    }
    const existingAddress = addresses[addressIndex];
    const updatedAddressResult = Address.create({
        street: existingAddress.street,
        city: existingAddress.city,
        state: existingAddress.state,
        zipCode: existingAddress.zipCode,
        country: existingAddress.country,
        ...dto
    }, id);
    if (updatedAddressResult.success) {
        addresses[addressIndex] = updatedAddressResult.value;
        return success(updatedAddressResult.value);
    }
    return updatedAddressResult;
  },
};

const mockDeleteAddressUseCase = {
  execute: async (id: string): Promise<Result<void, Error>> => {
    const addressIndex = addresses.findIndex(a => a.id === id);
    if (addressIndex > -1) {
      addresses.splice(addressIndex, 1);
    }
    return success(undefined);
  },
};

const mockListAddressesUseCase = {
    execute: async (): Promise<Result<Address[], Error>> => {
        return success([...addresses]);
    }
}

export class AddressController {
  async create(req: Request, res: Response) {
    try {
      const addressDTO = createAddressSchema.parse(req.body);
      const result = await mockCreateAddressUseCase.execute(addressDTO);

      if (result.success) {
        return res.status(201).json(AddressPresenter.toJSON(result.value));
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
    const result = await mockFindAddressByIdUseCase.execute(id);

    if (result.success && result.value) {
      return res.status(200).json(AddressPresenter.toJSON(result.value));
    } else if (!result.value) {
      return res.status(404).json({ error: 'Address not found' });
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await mockListAddressesUseCase.execute();

    if (result.success) {
        const addressesJSON = result.value.map(AddressPresenter.toJSON);
        return res.status(200).json(addressesJSON);
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const addressDTO = updateAddressSchema.parse(req.body);
      const result = await mockUpdateAddressUseCase.execute(id, addressDTO);

      if (result.success) {
        return res.status(200).json(AddressPresenter.toJSON(result.value));
      } else {
        return res.status(404).json({ error: 'Address not found' });
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
    const result = await mockDeleteAddressUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }
}