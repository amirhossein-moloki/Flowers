import express, { Application } from 'express';
import { errorHandler } from './infrastructure/http/middlewares/error-handler';
import { notFoundHandler } from './infrastructure/http/middlewares/not-found';
import { securityMiddleware } from './infrastructure/http/middlewares/security';

import { IAddressRepository } from './modules/address/domain/address.repository';
import { IAutomationLogRepository } from './modules/automation-log/domain/automation-log.repository';
import { ICourierRepository } from './modules/courier/domain/courier.repository';
import { ICustomerAddressRepository } from './modules/customer-address/domain/customer-address.repository';
import { IDeliveryRepository } from './modules/delivery/domain/delivery.repository';
import { IDeliveryStatusRepository } from './modules/delivery-status/domain/delivery-status.repository';
import { IDeliveryWindowRepository } from './modules/delivery-window/domain/delivery-window.repository';
import { IDriverLocationRepository } from './modules/driver-location/domain/driver-location.repository';
import { INotificationRepository } from './modules/notification/domain/notification.repository';
import { IOrderRepository } from './modules/order/domain/order.repository';
import { IPaymentRepository } from './modules/payment/domain/payment.repository';
import { IProductRepository } from './modules/product/domain/product.repository';
import { IUserRepository } from './modules/user/domain/user.repository';
import { IVendorRepository } from './modules/vendor/domain/vendor.repository';
import { PrismaClient } from '@prisma/client';
import { IServiceZoneRepository } from './modules/service-zone/domain/service-zone.repository';
import { userRoutes } from './modules/user/http/routes';
import { createVendorRoutes } from './modules/vendor/http/routes';
import { createServiceZoneRoutes } from './modules/service-zone/http/routes';

// Define a type for your dependency container
export interface AppDependencies {
  addressRepository: IAddressRepository;
  automationLogRepository: IAutomationLogRepository;
  courierRepository: ICourierRepository;
  customerAddressRepository: ICustomerAddressRepository;
  deliveryRepository: IDeliveryRepository;
  deliveryStatusRepository: IDeliveryStatusRepository;
  deliveryWindowRepository: IDeliveryWindowRepository;
  driverLocationRepository: IDriverLocationRepository;
  notificationRepository: INotificationRepository;
  orderRepository: IOrderRepository;
  paymentRepository: IPaymentRepository;
  productRepository: IProductRepository;
  userRepository: IUserRepository;
  vendorRepository: IVendorRepository;
  serviceZoneRepository: IServiceZoneRepository;
  prisma: PrismaClient;
}

class App {
  public express: Application;
  private dependencies: AppDependencies;

  constructor(dependencies: AppDependencies) {
    this.express = express();
    this.dependencies = dependencies;
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddlewares(): void {
    securityMiddleware(this.express);
  }

  private setupRoutes(): void {
    // Placeholder for future routes
    this.express.get('/', (req, res) => {
      res.send('API is running...');
    });
    this.express.use('/api/v1/users', userRoutes);
    this.express.use('/api/v1/vendors', createVendorRoutes(this.dependencies));
    this.express.use('/api/v1/service-zones', createServiceZoneRoutes(this.dependencies));
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
