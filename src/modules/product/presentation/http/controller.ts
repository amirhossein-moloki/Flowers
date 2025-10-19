import { Request, Response } from 'express';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@/modules/product/application';
import { ProductPresenter } from './presenters/product.presenter';
import { Dependencies } from '@/infrastructure/di';

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

  async create(req: Request, res: Response): Promise<Response> {
    const result = await this.createProductUseCase.execute(req.body);

    if (result.success) {
      return res.status(201).json(ProductPresenter.toJSON(result.value));
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const { page, limit, vendorId } = req.query;
    const result = await this.getAllProductsUseCase.execute({
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
      vendorId: vendorId as string | undefined,
    });

    if (result.success) {
      return res.status(200).json(result.value.map(ProductPresenter.toJSON));
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.getProductUseCase.execute(id);

    if (result.success) {
      if (result.value) {
        return res.status(200).json(ProductPresenter.toJSON(result.value));
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.updateProductUseCase.execute({ id, ...req.body });

    if (result.success) {
      return res.status(200).json(ProductPresenter.toJSON(result.value));
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.deleteProductUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    } else {
      return res.status(400).json({ error: result.error.message });
    }
  }
}
