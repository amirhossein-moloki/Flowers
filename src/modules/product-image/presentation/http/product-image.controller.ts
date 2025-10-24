import { Request, Response } from 'express';
import {
  CreateProductImageUseCase,
  DeleteProductImageUseCase,
  GetProductImageUseCase,
  UpdateProductImageUseCase,
  FindAllProductImageUseCase,
} from '../../application/use-cases';
import { ProductImagePresenter } from './presenters/product-image.presenter';
import { NotFoundError } from '@/core/errors/not-found.error';

export class ProductImageController {
  constructor(
    private readonly createProductImageUseCase: CreateProductImageUseCase,
    private readonly deleteProductImageUseCase: DeleteProductImageUseCase,
    private readonly getProductImageUseCase: GetProductImageUseCase,
    private readonly updateProductImageUseCase: UpdateProductImageUseCase,
    private readonly findAllProductImageUseCase: FindAllProductImageUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const result = await this.createProductImageUseCase.execute(req.body);

    if (result.success) {
      const presenter = new ProductImagePresenter(result.value);
      return res.status(201).json(presenter.toJSON());
    }

    return res.status(500).json({ error: result.error.message });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.deleteProductImageUseCase.execute(id);

    if (result.success) {
      return res.status(204).send();
    }

    if (result.error.name === 'NotFoundError') {
      return res.status(404).json({ error: result.error.message });
    }

    return res.status(500).json({ error: result.error.message });
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.getProductImageUseCase.execute(id);

    if (result.success) {
      if (result.value) {
        const presenter = new ProductImagePresenter(result.value);
        return res.status(200).json(presenter.toJSON());
      }
    }

    if (result.error.name === 'NotFoundError') {
      return res.status(404).json({ error: result.error.message });
    }

    return res.status(500).json({ error: result.error.message });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const result = await this.findAllProductImageUseCase.execute();

    if (result.success) {
      const presenters = result.value.map(
        (image) => new ProductImagePresenter(image),
      );
      return res.status(200).json(presenters.map((p) => p.toJSON()));
    }

    return res.status(500).json({ error: result.error.message });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { product_id } = req.body;
    const result = await this.updateProductImageUseCase.execute({
      id,
      product_id,
      data: req.body,
    });

    if (result.success) {
      const presenter = new ProductImagePresenter(result.value);
      return res.status(200).json(presenter.toJSON());
    }

    if (result.error.name === 'NotFoundError') {
      return res.status(404).json({ error: result.error.message });
    }

    return res.status(500).json({ error: result.error.message });
  }
}
