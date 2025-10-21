import express, { Application } from 'express';
import { errorHandler } from './infrastructure/http/middlewares/error-handler';
import { notFoundHandler } from './infrastructure/http/middlewares/not-found';
import { securityMiddleware } from './infrastructure/http/middlewares/security';
import { createDependencies, Dependencies } from './infrastructure/di';
import { userRoutes } from './modules/user/http/routes';
import { createVendorRoutes } from './modules/vendor/http/routes';
import { isAuthenticated } from './core/middlewares/auth.middleware';
import { createServiceZoneRoutes } from './modules/service-zone/http/routes';
import { createShippingRateRoutes } from './modules/shipping-rate/presentation/http/shipping-rate.routes';
import { createProofOfDeliveryRoutes } from './modules/proof-of-delivery/presentation/http/routes';
import { PrismaClient } from '@prisma/client';
import { createVendorOutletRoutes } from './modules/vendor-outlet/http/routes';
import { VendorOutletDependencies } from './modules/vendor-outlet/vendor-outlet.dependencies';
import { createAddressRoutes } from './modules/address/http/routes';
import { createCustomerAddressRoutes } from './modules/customer-address/http/routes';

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
    securityMiddleware(this.express);
  }

  private setupRoutes(): void {
    this.express.get('/', (req, res) => {
      res.send('API is running...');
    });
    this.express.use('/api/v1/users', userRoutes);
    this.express.use('/api/v1/vendors', createVendorRoutes(this.dependencies));
    this.express.use('/api/v1/service-zones', isAuthenticated, createServiceZoneRoutes(this.dependencies));
    this.express.use('/api/v1/shipping-rates', createShippingRateRoutes(this.dependencies));
    this.express.use('/api/v1/proof-of-delivery', createProofOfDeliveryRoutes(this.dependencies));
    this.express.use('/api/v1/vendor-outlets', createVendorOutletRoutes(this.dependencies as unknown as VendorOutletDependencies));
    this.express.use('/api/v1/addresses', createAddressRoutes(this.dependencies));
    this.express.use('/api/v1/customer-addresses', createCustomerAddressRoutes(this.dependencies));
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
