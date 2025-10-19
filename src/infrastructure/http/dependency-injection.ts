import { PrismaClient } from '@prisma/client';
import { PrismaAddressRepository } from '@/modules/address/infrastructure/prisma-address.repository';
import { PrismaAutomationLogRepository } from '@/modules/automation-log/infrastructure/prisma-automation-log.repository';
import { PrismaCourierRepository } from '@/modules/courier/infrastructure/prisma-courier.repository';
import { PrismaCustomerAddressRepository } from '@/modules/customer-address/infrastructure/prisma-customer-address.repository';
import { PrismaDeliveryRepository } from '@/modules/delivery/infrastructure/prisma-delivery.repository';
import { PrismaDeliveryStatusRepository } from '@/modules/delivery-status/infrastructure/prisma-delivery-status.repository';
import { PrismaDeliveryWindowRepository } from '@/modules/delivery-window/infrastructure/prisma-delivery-window.repository';
import { PrismaDriverLocationRepository } from '@/modules/driver-location/infrastructure/prisma-driver-location.repository';
import { PrismaNotificationRepository } from '@/modules/notification/infrastructure/prisma-notification.repository';
import { PrismaOrderRepository } from '@/modules/order/infrastructure/prisma-order.repository';
import { PrismaPaymentRepository } from '@/modules/payment/infrastructure/prisma-payment.repository';
import { PrismaProductRepository } from '@/modules/product/infrastructure/prisma-product.repository';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user.repository';
import { PrismaVendorRepository } from '@/modules/vendor/infrastructure/prisma-vendor.repository';

export function createDependencyContainer(prisma: PrismaClient) {
  return {
    addressRepository: new PrismaAddressRepository(prisma),
    automationLogRepository: new PrismaAutomationLogRepository(prisma),
    courierRepository: new PrismaCourierRepository(prisma),
    customerAddressRepository: new PrismaCustomerAddressRepository(prisma),
    deliveryRepository: new PrismaDeliveryRepository(prisma),
    deliveryStatusRepository: new PrismaDeliveryStatusRepository(prisma),
    deliveryWindowRepository: new PrismaDeliveryWindowRepository(prisma),
    driverLocationRepository: new PrismaDriverLocationRepository(prisma),
    notificationRepository: new PrismaNotificationRepository(prisma),
    orderRepository: new PrismaOrderRepository(prisma),
    paymentRepository: new PrismaPaymentRepository(prisma),
    productRepository: new PrismaProductRepository(prisma),
    userRepository: new PrismaUserRepository(prisma),
    vendorRepository: new PrismaVendorRepository(prisma),
  };
}