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

class App {
  public express: Application;
  private dependencies: Dependencies;

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
    this.express.use('/api/v1/service-zones', createServiceZoneRoutes(this.dependencies));
    this.express.use('/api/v1/shipping-rates', createShippingRateRoutes(this.dependencies));
    this.express.use('/api/v1/proof-of-delivery', createProofOfDeliveryRoutes(this.dependencies));
  }

  private setupErrorHandlers(): void {
    this.express.use(notFoundHandler);
    this.express.use(errorHandler);
  }

  public start(port: number, cb: () => void): void {
    this.express.listen(port, cb);
  }
}

export default App;
