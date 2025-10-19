import { Request, Response } from 'express';
import { ProductImagePresenter } from './presenters/product-image.presenter';
import { CreateProductImageDto } from './dto/create-product-image.schema';
import { UpdateProductImageDto } from './dto/update-product-image.schema';
import { StatusCodes } from 'http-status-codes';
import { CreateProductImageUseCase } from '@/modules/product-image/application/use-cases/create-product-image.usecase';
import { DeleteProductImageUseCase } from '@/modules/product-image/application/use-cases/delete-product-image.usecase';
import { GetProductImageUseCase } from '@/modules/product-image/application/use-cases/get-product-image.usecase';
import { UpdateProductImageUseCase } from '@/modules/product-image/application/use-cases/update-product-image.usecase';
import { FindAllProductImageUseCase } from '@/modules/product-image/application/use-cases/find-all-product-image.usecase';

export class ProductImageController {
  constructor(
    private readonly createProductImageUseCase: CreateProductImageUseCase,
    private readonly deleteProductImageUseCase: DeleteProductImageUseCase,
    private readonly getProductImageUseCase: GetProductImageUseCase,
    private readonly updateProductImageUseCase: UpdateProductImageUseCase,
    private readonly findAllProductImageUseCase: FindAllProductImageUseCase,
  ) {}

  async create(
    req: Request<unknown, unknown, CreateProductImageDto>,
    res: Response,
  ) {
    const result = await this.createProductImageUseCase.execute(req.body);

    if (!result.success) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: result.error.message });
    }

    return res
      .status(StatusCodes.CREATED)
      .json(ProductImagePresenter.toJSON(result.value));
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const result = await this.deleteProductImageUseCase.execute(req.params.id);

    if (!result.success) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: result.error.message });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    const result = await this.getProductImageUseCase.execute(req.params.id);

    if (!result.success) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: result.error.message });
    }

    return res
      .status(StatusCodes.OK)
      .json(ProductImagePresenter.toJSON(result.value));
  }

  async findAll(req: Request, res: Response) {
    const result = await this.findAllProductImageUseCase.execute();

    if (!result.success) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: result.error.message });
    }

    return res
      .status(StatusCodes.OK)
      .json(result.value.map(ProductImagePresenter.toJSON));
  }

  async update(
    req: Request<{ id: string }, unknown, UpdateProductImageDto>,
    res: Response,
  ) {
    const result = await this.updateProductImageUseCase.execute({
      id: req.params.id,
      ...req.body,
    });

    if (!result.success) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: result.error.message });
    }

    return res
      .status(StatusCodes.OK)
      .json(ProductImagePresenter.toJSON(result.value));
  }
}
