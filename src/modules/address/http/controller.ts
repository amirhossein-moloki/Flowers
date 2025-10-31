import { Request, Response } from 'express';
import { z } from 'zod';
import {
  CreateAddressDTO,
  createAddressSchema,
} from './dto/create-address.schema';
import {
  UpdateAddressDTO,
  updateAddressSchema,
} from './dto/update-address.schema';
import { AddressPresenter } from '../presentation/address.presenter';
import { AddressDependencies } from '../address.dependencies';

export class AddressController {
  constructor(private readonly dependencies: AddressDependencies) {}
  async create(req: Request, res: Response) {
    try {
      const addressDTO = createAddressSchema.parse(req.body);
      const result =
        await this.dependencies.createAddressUseCase.execute(addressDTO);

      if (result.isSuccess()) {
        return res.status(201).json(AddressPresenter.toJSON(result.value));
      } else {
        return res.status(400).json({ error: result.error?.message });
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
    const result = await this.dependencies.getAddressUseCase.execute(id);

    if (result.isSuccess() && result.value) {
      return res.status(200).json(AddressPresenter.toJSON(result.value));
    } else if (!result.value) {
      return res.status(404).json({ error: 'Address not found' });
    } else {
      return res.status(400).json({ error: result.error?.message });
    }
  }

  async list(req: Request, res: Response) {
    const result = await this.dependencies.listAddressesUseCase.execute();

    if (result.isSuccess()) {
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
      const result = await this.dependencies.updateAddressUseCase.execute({
        id,
        ...addressDTO,
      });

      if (result.isSuccess()) {
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
    const result = await this.dependencies.deleteAddressUseCase.execute(id);

    if (result.isSuccess()) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error?.message });
    }
  }
}
