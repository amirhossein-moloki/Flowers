import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import { createProductRoutes } from '../routes';
import { Dependencies } from '@/infrastructure/di';
import { mock, mockDeep } from 'jest-mock-extended';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@/modules/product/application';
import { Product } from '@/modules/product/domain/product.entity';
import { success } from '@/core/utils/result';

describe('Product Routes', () => {
  let app: express.Application;
  const mockDependencies = mock<Dependencies>();

  beforeAll(() => {
    mockDependencies.createProductUseCase = mock<CreateProductUseCase>();
    mockDependencies.getAllProductsUseCase = mock<GetAllProductsUseCase>();
    mockDependencies.getProductUseCase = mock<GetProductUseCase>();
    mockDependencies.updateProductUseCase = mock<UpdateProductUseCase>();
    mockDependencies.deleteProductUseCase = mock<DeleteProductUseCase>();

    app = express();
    app.use(express.json());
    app.use('/products', createProductRoutes(mockDependencies));
  });

  describe('POST /products', () => {
    it('should return 201 and the created product', async () => {
      const product = Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      }).value as Product;

      (mockDependencies.createProductUseCase.execute as jest.Mock).mockResolvedValue(success(product));

      const response = await request(app)
        .post('/products')
        .send({ name: 'Test Product', description: 'Test Description', price: 100, stock: 10 });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Product');
    });
  });

  describe('GET /products', () => {
    it('should return 200 and a list of products', async () => {
      const products = [
        Product.create({ name: 'Product 1', price: 10, stock: 5 }).value as Product,
        Product.create({ name: 'Product 2', price: 20, stock: 10 }).value as Product,
      ];

      (mockDependencies.getAllProductsUseCase.execute as jest.Mock).mockResolvedValue(success(products));

      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /products/:id', () => {
    it('should return 200 and the product', async () => {
      const product = Product.create({ name: 'Test Product', price: 100, stock: 10 }).value as Product;

      (mockDependencies.getProductUseCase.execute as jest.Mock).mockResolvedValue(success(product));

      const response = await request(app).get(`/products/${product.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', product.id);
    });
  });

  describe('PUT /products/:id', () => {
    it('should return 200 and the updated product', async () => {
      const product = Product.create({ name: 'Updated Product', price: 150, stock: 15 }).value as Product;

      (mockDependencies.updateProductUseCase.execute as jest.Mock).mockResolvedValue(success(product));

      const response = await request(app)
        .put(`/products/${product.id}`)
        .send({ name: 'Updated Product', price: 150, stock: 15 });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Product');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should return 204', async () => {
      (mockDependencies.deleteProductUseCase.execute as jest.Mock).mockResolvedValue(success(undefined));

      const response = await request(app).delete('/products/some-id');

      expect(response.status).toBe(204);
    });
  });
});
