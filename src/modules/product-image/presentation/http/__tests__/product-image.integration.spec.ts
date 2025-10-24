import 'reflect-metadata';
import request from 'supertest';
import App from '@/app';
import { PrismaClient, Product, Vendor, ProductImage } from '@prisma/client';
import { CreateProductImageDto } from '../dto/create-product-image.dto';
import { UpdateProductImageDto } from '../dto/update-product-image.dto';

describe('ProductImage Integration Tests', () => {
  let app: App;
  let prisma: PrismaClient;
  let vendor: Vendor;
  let product: Product;
  let productImage: ProductImage;

  beforeAll(() => {
    prisma = new PrismaClient();
    app = new App(prisma);
  });

  beforeEach(async () => {
    vendor = await prisma.vendor.create({
      data: {
        name: 'Test Vendor',
        email: `test-vendor-${Date.now()}@example.com`,
        phone: `1234567890-${Date.now()}`,
        address: '123 Test St',
      },
    });

    product = await prisma.product.create({
      data: {
        name: 'Test Product',
        price: 100,
        stock: 10,
        vendorId: vendor.id,
      },
    });

    productImage = await prisma.productImage.create({
        data: {
            product_id: product.id,
            url: 'http://example.com/image.png',
            sort_order: 1,
        }
    })
  });

  afterEach(async () => {
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.vendor.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /product-images', () => {
    it('should create a new product image and return 201', async () => {
      const dto: CreateProductImageDto = {
        product_id: product.id,
        url: 'http://example.com/image.png',
        sort_order: 1,
      };

      await request(app.express)
        .post('/api/v1/product-image')
        .send(dto)
        .expect(201)
        .then((res) => {
          expect(res.body.product_id).toEqual(dto.product_id);
          expect(res.body.url).toEqual(dto.url);
          expect(res.body.sort_order).toEqual(dto.sort_order);
        });
    });

    it('should return 422 for invalid data', async () => {
      const dto = {
        // Missing product_id and url
      };

      await request(app.express).post('/api/v1/product-image').send(dto).expect(422);
    });
  });

  describe('GET /product-images', () => {
    it('should return a list of product images', async () => {
        await request(app.express)
        .get('/api/v1/product-image')
        .expect(200)
        .then((res) => {
            expect(res.body).toHaveLength(1);
            expect(res.body[0].id).toEqual(productImage.id);
        });
    });
    });

    describe('GET /product-images/:id', () => {
        it('should return a product image by id', async () => {
            await request(app.express)
            .get(`/api/v1/product-image/${productImage.id}`)
            .expect(200)
            .then((res) => {
                expect(res.body.id).toEqual(productImage.id);
            });
        });

        it('should return 404 for a non-existent product image', async () => {
            await request(app.express).get('/api/v1/product-image/invalid-id').expect(404);
        });
    });

    describe('PUT /product-images/:id', () => {
        it('should update a product image and return 200', async () => {
            const dto: UpdateProductImageDto & { product_id: string } = {
                url: 'http://example.com/new-image.png',
                sort_order: 2,
                product_id: product.id,
            };

            await request(app.express)
                .put(`/api/v1/product-image/${productImage.id}`)
                .send(dto)
                .expect(200)
                .then((res) => {
                    expect(res.body.url).toEqual(dto.url);
                    expect(res.body.sort_order).toEqual(dto.sort_order);
                });
        });

        it('should return 422 for invalid data', async () => {
            const dto = {
                url: '',
            };

            await request(app.express).put(`/api/v1/product-image/${productImage.id}`).send(dto).expect(422);
        });
    });

    describe('DELETE /product-images/:id', () => {
        it('should delete a product image and return 204', async () => {
            await request(app.express)
                .delete(`/api/v1/product-image/${productImage.id}`)
                .expect(204);
        });
    });
});
