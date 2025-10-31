import { Request, Response } from 'express';
import { z } from 'zod';
import {
  CreateCustomerAddressDTO,
  createCustomerAddressSchema,
} from './dto/create-customer-address.schema';
import {
  UpdateCustomerAddressDTO,
  updateCustomerAddressSchema,
} from './dto/update-customer-address.schema';
import { CustomerAddressPresenter } from './presenters/customer-address.presenter';
import { CustomerAddressDependencies } from '../customer-address.dependencies';

export class CustomerAddressController {
  constructor(private readonly dependencies: CustomerAddressDependencies) {}
  async create(req: Request, res: Response) {
    try {
      const customerAddressDTO = createCustomerAddressSchema.parse(req.body);
      const result =
        await this.dependencies.createCustomerAddressUseCase.execute({
          ...customerAddressDTO,
          // @ts-ignore
          user_id: req.user.id,
        });

      if (result.isSuccess()) {
        return res
          .status(201)
          .json(CustomerAddressPresenter.toJSON(result.value));
      } else {
        return res
          .status(result.error.statusCode)
          .json({ error: result.error.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ errors: error.issues });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result =
      await this.dependencies.getCustomerAddressUseCase.execute(id);

    if (result.isSuccess() && result.value) {
      return res
        .status(200)
        .json(CustomerAddressPresenter.toJSON(result.value));
    } else if (result.isFailure()) {
      return res
        .status(result.error.statusCode)
        .json({ error: result.error.message });
    } else {
      return res.status(404).json({ error: 'CustomerAddress not found' });
    }
  }

  async list(req: Request, res: Response) {
    // @ts-ignore
    const result = await this.dependencies.listCustomerAddressesUseCase.execute(
      req.user.id,
    );

    if (result.isSuccess()) {
      const customerAddressesJSON = result.value.map(
        CustomerAddressPresenter.toJSON,
      );
      return res.status(200).json(customerAddressesJSON);
    } else {
      return res
        .status(result.error.statusCode)
        .json({ error: result.error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customerAddressDTO = updateCustomerAddressSchema.parse(req.body);
      const result =
        await this.dependencies.updateCustomerAddressUseCase.execute({
          id,
          ...customerAddressDTO,
        });

      if (result.isSuccess()) {
        return res
          .status(200)
          .json(CustomerAddressPresenter.toJSON(result.value));
      } else {
        return res
          .status(result.error.statusCode)
          .json({ error: result.error.message });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ errors: error.issues });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result =
      await this.dependencies.deleteCustomerAddressUseCase.execute(id);

    if (result.isSuccess()) {
      return res.status(204).send();
    } else {
      return res
        .status(result.error.statusCode)
        .json({ error: result.error.message });
    }
  }
}
