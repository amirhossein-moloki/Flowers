import 'reflect-metadata';
import request from 'supertest';
import express, { Router } from 'express';
import { mock, mockDeep } from 'jest-mock-extended';
import { ProductImageController } from '../product-image.controller';
import {
  CreateProductImageUseCase,
  DeleteProductImageUseCase,
  GetProductImageUseCase,
  UpdateProductImageUseCase,
  FindAllProductImageUseCase,
} from '@/modules/product-image/application/use-cases';
import { ProductImage } from '@/modules/product-image/domain/product-image.entity';
import { success } from '@/core/utils/result';
import { CreateProductImageSchema } from '../dto/create-product-image.schema';
import { UpdateProductImageSchema } from '../dto/update-product-image.schema';
import { validate } from '@/core/middlewares/validate.middleware';

describe('ProductImageController', () => {
  let app: express.Express;
  const mockCreateProductImageUseCase = mock<CreateProductImageUseCase>();
  const mockDeleteProductImageUseCase = mock<DeleteProductImageUseCase>();
  const mockGetProductImageUseCase = mock<GetProductImageUseCase>();
  const mockUpdateProductImageUseCase = mock<UpdateProductImageUseCase>();
  const mockFindAllProductImageUseCase = mock<FindAllProductImageUseCase>();

  beforeAll(() => {
    app = express();
    app.use(express.json());
    const controller = new ProductImageController(
      mockCreateProductImageUseCase,
      mockDeleteProductImageUseCase,
      mockGetProductImageUseCase,
      mockUpdateProductImageUseCase,
      mockFindAllProductImageUseCase,
    );

    const router = Router();
    router.post(
      '/',
      validate(CreateProductImageSchema),
      controller.create.bind(controller),
    );
    router.delete(
      '/:id',
      controller.delete.bind(controller),
    );
    router.get(
      '/:id',
      controller.findById.bind(controller),
    );
    router.get('/', controller.findAll.bind(controller));
    router.put(
      '/:id',
      validate(UpdateProductImageSchema),
      controller.update.bind(controller),
    );

    app.use('/product-images', router);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /product-images', () => {
    it('should create a new product image and return 201', async () => {
      const dto = {
        productId: 'a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a',
        url: 'http://example.com/image.png',
      };
      const productImage = ProductImage.create(dto).value;

      mockCreateProductImageUseCase.execute.mockResolvedValue(
        success(productImage),
      );

      await request(app)
        .post('/product-images')
        .send(dto)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toEqual(productImage.id);
          expect(res.body.productId).toEqual(dto.productId);
        });
    });
  });

  describe('GET /product-images/:id', () => {
    it('should get a product image by id and return 200', async () => {
      const productImage = ProductImage.create({
        productId: 'a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a',
        url: 'http://example.com/image.png',
      }).value;

      mockGetProductImageUseCase.execute.mockResolvedValue(
        success(productImage),
      );

      await request(app)
        .get(`/product-images/${productImage.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.id).toEqual(productImage.id);
        });
    });
  });

  describe('GET /product-images', () => {
    it('should get all product images and return 200', async () => {
      const productImage = ProductImage.create({
        productId: 'a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a',
        url: 'http://example.com/image.png',
      }).value;

      mockFindAllProductImageUseCase.execute.mockResolvedValue(success([productImage]));

      await request(app)
        .get('/product-images')
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0].id).toEqual(productImage.id);
        });
    });
  });

  describe('DELETE /product-images/:id', () => {
    it('should delete a product image and return 204', async () => {
      mockDeleteProductImageUseCase.execute.mockResolvedValue(success(true));

      await request(app)
        .delete('/product-images/a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a')
        .expect(204);
    });
  });

  describe('PUT /product-images/:id', () => {
    it('should update a product image and return 200', async () => {
      const dto = {
        url: 'http://example.com/new-image.png',
      };
      const productImage = ProductImage.create({
        productId: 'a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a',
        url: dto.url,
      }).value;

      mockUpdateProductImageUseCase.execute.mockResolvedValue(
        success(productImage),
      );

      await request(app)
        .put('/product-images/a7e5a2a2-2b6b-4b2b-8a8a-8a8a8a8a8a8a')
        .send(dto)
        .expect(200)
        .then((res) => {
          expect(res.body.url).toEqual(dto.url);
        });
    });
  });
});
