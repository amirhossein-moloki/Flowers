import { Request, Response, NextFunction } from 'express';
import {
  CreateProductImageUseCase,
  DeleteProductImageUseCase,
  GetProductImageUseCase,
  UpdateProductImageUseCase,
  FindAllProductImageUseCase,
} from '../../application/use-cases';

export class ProductImageController {
  constructor(
    private readonly createProductImageUseCase: CreateProductImageUseCase,
    private readonly deleteProductImageUseCase: DeleteProductImageUseCase,
    private readonly getProductImageUseCase: GetProductImageUseCase,
    private readonly updateProductImageUseCase: UpdateProductImageUseCase,
    private readonly findAllProductImageUseCase: FindAllProductImageUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.createProductImageUseCase.execute(req.body);

      if (result.success) {
        res.status(201).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.deleteProductImageUseCase.execute(id);

      if (result.success) {
        res.status(204).send();
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getProductImageUseCase.execute(id);

      if (result.success) {
        if (result.value) {
          res.status(200).json(result.value);
        } else {
          res.status(404).json({ error: 'Product image not found' });
        }
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.findAllProductImageUseCase.execute(req.query.productId as string);

      if (result.success) {
        res.status(200).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.updateProductImageUseCase.execute(id, req.body);

      if (result.success) {
        res.status(200).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}
