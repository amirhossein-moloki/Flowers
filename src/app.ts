import express, { Application } from 'express';
import { errorHandler } from './infrastructure/http/middlewares/error-handler';
import { notFoundHandler } from './infrastructure/http/middlewares/not-found';
import { securityMiddleware } from './infrastructure/http/middlewares/security';
import { createDependencies, Dependencies } from './infrastructure/di';
import { userRoutes } from './modules/user/http/routes';
import { createVendorRoutes } from './modules/vendor/http/routes';
import { createServiceZoneRoutes } from './modules/service-zone/http/routes';
import { createShippingRateRoutes } from './modules/shipping-rate/presentation/http/shipping-rate.routes';
import { createProofOfDeliveryRoutes } from './modules/proof-of-delivery/presentation/http/routes';
import { PrismaClient } from '@prisma/client';
import { createVendorOutletRoutes } from './modules/vendor-outlet/http/routes';
import { VendorOutletDependencies } from './modules/vendor-outlet/vendor-outlet.dependencies';
import { createAddressRoutes } from './modules/address/http/routes';
import { createCustomerAddressRoutes } from './modules/customer-address/http/routes';
import { createCourierRoutes } from './modules/courier/http/routes';
import { driverLocationRoutes } from './modules/driver-location/http/routes';
import { createDeliveryStatusRoutes } from './modules/delivery-status/http/routes';
import { createDeliveryWindowRoutes } from './modules/delivery-window/http/routes';
import { createDeliveryRoutes } from './modules/delivery/http/routes';
import { createNotificationRoutes } from './modules/notification/presentation/http/notification.routes';
import { createProductRoutes } from './modules/product/presentation/http/routes';
import { createProductImageRoutes } from './modules/product-image/presentation/http/product-image.routes';
import { createPromotionRoutes } from './modules/promotion/presentation/http/promotion.routes';
import orderStatusRouter from './modules/order-status/presentation/http/routes';
import { orderPromotionRouter } from './modules/order-promotion/presentation/http/order-promotion.routes';
import orderRouter from './modules/order/presentation/http/order.routes';
import paymentRouter from './modules/payment/presentation/http/payment.routes';

class App {
  public express: Application;
  public dependencies: Dependencies;

  constructor(prisma: PrismaClient) {
    this.express = express();
    this.dependencies = createDependencies(prisma);
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddlewares(): void {
    this.express.use(express.json());
    securityMiddleware(this.express);
  }

  private setupRoutes(): void {
    this.express.get('/', (req, res) => {
      res.send('API is running...');
    });
    this.express.use('/api/v1/users', userRoutes);
    this.express.use('/api/v1/vendors', createVendorRoutes(this.dependencies));
    this.express.use('/api/v1/service-zones', createServiceZoneRoutes(this.dependencies));
    this.express.use('/api/v1/shipping-rates', createShippingRateRoutes(this.dependencies));
    this.express.use('/api/v1/proof-of-delivery', createProofOfDeliveryRoutes(this.dependencies));
    this.express.use('/api/v1/vendor-outlets', createVendorOutletRoutes(this.dependencies as unknown as VendorOutletDependencies));
    this.express.use('/api/v1/addresses', createAddressRoutes(this.dependencies));
    this.express.use('/api/v1/customer-addresses', createCustomerAddressRoutes(this.dependencies));
    this.express.use(
      '/api/v1/couriers',
      createCourierRoutes(
        this.dependencies.createCourierUseCase,
        this.dependencies.getCourierUseCase,
        this.dependencies.updateCourierUseCase,
        this.dependencies.deleteCourierUseCase,
        this.dependencies.listCouriersUseCase,
      ),
    );
    this.express.use('/api/v1/driver-locations', driverLocationRoutes(this.dependencies));
    this.express.use('/api/v1/delivery-status', createDeliveryStatusRoutes(this.dependencies));
    this.express.use('/api/v1/delivery-windows', createDeliveryWindowRoutes(this.dependencies));
    this.express.use('/api/v1/deliveries', createDeliveryRoutes(this.dependencies));
    this.express.use('/api/v1/notifications', createNotificationRoutes(this.dependencies));
    this.express.use('/api/v1/products', createProductRoutes(this.dependencies));
    this.express.use('/api/v1/product-image', createProductImageRoutes(this.dependencies));
    this.express.use('/api/v1/promotions', createPromotionRoutes(this.dependencies));
    this.express.use('/api/v1/order-statuses', orderStatusRouter);
    this.express.use('/api/v1/order-promotions', orderPromotionRouter);
    this.express.use('/api/v1/orders', orderRouter);
    this.express.use('/api/v1/payments', paymentRouter);
  }

  private setupErrorHandlers(): void {
    this.express.use(notFoundHandler);
    this.express.use(errorHandler);
  }

  public start(port: number): import('http').Server {
    return this.express.listen(port);
  }

  public getServer(): Application {
    return this.express;
  }
}

export default App;
