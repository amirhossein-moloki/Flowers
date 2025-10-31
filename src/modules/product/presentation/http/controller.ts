import { Request, Response, NextFunction } from 'express';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@/modules/product/application';
import { ProductPresenter } from './presenters/product.presenter';
import { Dependencies } from '@/infrastructure/di';
import { Product } from '../../domain/product.entity';

export class ProductController {
  private readonly createProductUseCase: CreateProductUseCase;
  private readonly getAllProductsUseCase: GetAllProductsUseCase;
  private readonly getProductUseCase: GetProductUseCase;
  private readonly updateProductUseCase: UpdateProductUseCase;
  private readonly deleteProductUseCase: DeleteProductUseCase;

  constructor(dependencies: Dependencies) {
    this.createProductUseCase = dependencies.createProductUseCase;
    this.getAllProductsUseCase = dependencies.getAllProductsUseCase;
    this.getProductUseCase = dependencies.getProductUseCase;
    this.updateProductUseCase = dependencies.updateProductUseCase;
    this.deleteProductUseCase = dependencies.deleteProductUseCase;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.createProductUseCase.execute(req.body);

      if (result.isSuccess()) {
        res.status(201).json(ProductPresenter.toJSON(result.value));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, vendorId } = req.query;
      const result = await this.getAllProductsUseCase.execute({
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10,
        vendorId: vendorId as string | undefined,
      });

      if (result.isSuccess()) {
        res
          .status(200)
          .json(result.value.map((p) => ProductPresenter.toJSON(p)));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getProductUseCase.execute(id);

      if (result.isSuccess()) {
        if (result.value) {
          res.status(200).json(ProductPresenter.toJSON(result.value));
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
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
      const result = await this.updateProductUseCase.execute(id, req.body);

      if (result.isSuccess()) {
        res.status(200).json(ProductPresenter.toJSON(result.value));
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
      const result = await this.deleteProductUseCase.execute(id);

      if (result.isSuccess()) {
        res.status(204).send();
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}
