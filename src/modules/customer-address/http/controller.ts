import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateCustomerAddressDTO, createCustomerAddressSchema } from './dto/create-customer-address.schema';
import { UpdateCustomerAddressDTO, updateCustomerAddressSchema } from './dto/update-customer-address.schema';
import { CustomerAddressPresenter } from './presenters/customer-address.presenter';
import { CustomerAddress } from '../domain/customer-address.entity';
import { Result, success } from '@/core/utils/result';

// Mock Use Cases - In a real application, these would be injected
const mockCreateCustomerAddressUseCase = {
  execute: async (dto: CreateCustomerAddressDTO): Promise<Result<CustomerAddress, Error>> => {
    const customerAddressResult = CustomerAddress.create({ ...dto }, 'mock-id');
    if (customerAddressResult.success) {
      return success(customerAddressResult.value);
    }
    return customerAddressResult;
  },
};

const mockFindCustomerAddressByIdUseCase = {
  execute: async (id: string): Promise<Result<CustomerAddress | null, Error>> => {
    const customerAddressResult = CustomerAddress.create({
      user_id: 'user-1',
      address_id: 'address-1',
      label: 'Home',
    }, id);
    if (customerAddressResult.success) {
      return success(customerAddressResult.value);
    }
    return success(null);
  },
};

const mockUpdateCustomerAddressUseCase = {
  execute: async (id: string, dto: UpdateCustomerAddressDTO): Promise<Result<CustomerAddress, Error>> => {
    const customerAddressResult = CustomerAddress.create({
        user_id: 'user-1',
        address_id: 'address-1',
        label: 'Home',
      ...dto
    }, id);
    if (customerAddressResult.success) {
        return success(customerAddressResult.value);
    }
    return customerAddressResult;
  },
};

const mockDeleteCustomerAddressUseCase = {
  execute: async (id: string): Promise<Result<void, Error>> => {
    console.log(`CustomerAddress ${id} deleted`);
    return success(undefined);
  },
};

const mockListCustomerAddressesUseCase = {
    execute: async (): Promise<Result<CustomerAddress[], Error>> => {
        const customerAddress1Result = CustomerAddress.create({
            user_id: 'user-1',
            address_id: 'address-1',
            label: 'Home',
        }, '1');
        const customerAddress2Result = CustomerAddress.create({
            user_id: 'user-1',
            address_id: 'address-2',
            label: 'Work',
        }, '2');

        if (customerAddress1Result.success && customerAddress2Result.success) {
            return success([customerAddress1Result.value, customerAddress2Result.value]);
        }

        return success([]);
    }
}

export class CustomerAddressController {
  async create(req: Request, res: Response) {
    try {
      const customerAddressDTO = createCustomerAddressSchema.parse(req.body);
      const result = await mockCreateCustomerAddressUseCase.execute(customerAddressDTO);

      if (result.success) {
        return res.status(201).json(CustomerAddressPresenter.toJSON(result.value));
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
    const result = await mockFindCustomerAddressByIdUseCase.execute(id);

    if (result.success && result.value) {
      return res.status(200).json(CustomerAddressPresenter.toJSON(result.value));
    } else if (!result.value) {
      return res.status(404).json({ error: 'CustomerAddress not found' });
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await mockListCustomerAddressesUseCase.execute();

    if (result.success) {
        const customerAddressesJSON = result.value.map(CustomerAddressPresenter.toJSON);
        return res.status(200).json(customerAddressesJSON);
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customerAddressDTO = updateCustomerAddressSchema.parse(req.body);
      const result = await mockUpdateCustomerAddressUseCase.execute(id, customerAddressDTO);

      if (result.success) {
        return res.status(200).json(CustomerAddressPresenter.toJSON(result.value));
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
    const result = await mockDeleteCustomerAddressUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }
}