import { PrismaClient } from '@prisma/client';
import { CreateShippingRateUseCase } from '@/modules/shipping-rate/application/use-cases/create-shipping-rate.usecase';
import { UpdateShippingRateUseCase } from '@/modules/shipping-rate/application/use-cases/update-shipping-rate.usecase';
import { DeleteShippingRateUseCase } from '@/modules/shipping-rate/application/use-cases/delete-shipping-rate.usecase';
import { GetShippingRateUseCase } from '@/modules/shipping-rate/application/use-cases/get-shipping-rate.usecase';
import { ListShippingRatesUseCase } from '@/modules/shipping-rate/application/use-cases/list-shipping-rates.usecase';
import { CalculateShippingRateUseCase } from '@/modules/shipping-rate/application/use-cases/calculate-shipping-rate.usecase';
import { PrismaShippingRateRepository } from '@/modules/shipping-rate/infrastructure/prisma-shipping-rate.repository';
import { CreateVendorUseCase } from '@/modules/vendor/application/use-cases/create-vendor.usecase';
import { GetVendorUseCase } from '@/modules/vendor/application/use-cases/get-vendor.usecase';
import { UpdateVendorUseCase } from '@/modules/vendor/application/use-cases/update-vendor.usecase';
import { DeleteVendorUseCase } from '@/modules/vendor/application/use-cases/delete-vendor.usecase';
import { ListVendorsUseCase } from '@/modules/vendor/application/use-cases/list-vendors.usecase';
import { PrismaVendorRepository } from '@/modules/vendor/infrastructure/prisma-vendor.repository';
import { GetServiceZoneUseCase } from '@/modules/service-zone/application/use-cases/get-service-zone.usecase';
import { ListServiceZonesUseCase } from '@/modules/service-zone/application/use-cases/list-service-zones.usecase';
import { PrismaServiceZoneRepository } from '@/modules/service-zone/infrastructure/prisma-service-zone.repository';
import { CreateProofOfDeliveryUseCase } from '@/modules/proof-of-delivery/application/use-cases/create-proof-of-delivery.usecase';
import { FindProofOfDeliveryByIdUseCase } from '@/modules/proof-of-delivery/application/use-cases/find-proof-of-delivery-by-id.usecase';
import { UpdateProofOfDeliveryUseCase } from '@/modules/proof-of-delivery/application/use-cases/update-proof-of-delivery.usecase';
import { DeleteProofOfDeliveryUseCase } from '@/modules/proof-of-delivery/application/use-cases/delete-proof-of-delivery.usecase';
import { PrismaProofOfDeliveryRepository } from '@/modules/proof-of-delivery/infrastructure/prisma-proof-of-delivery.repository';
import { CreateNotificationUseCase } from '@/modules/notification/application/use-cases/create-notification.usecase';
import { PrismaNotificationRepository } from '@/modules/notification/infrastructure/prisma-notification.repository';

import { GetNotificationUseCase } from '@/modules/notification/application/use-cases/get-notification.usecase';
import { UpdateNotificationUseCase } from '@/modules/notification/application/use-cases/update-notification.usecase';
import { DeleteNotificationUseCase } from '@/modules/notification/application/use-cases/delete-notification.usecase';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from '@/modules/user/application/use-cases';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { PrismaUserRepository } from '@/modules/user/infrastructure';
import { UserController, UserRoutes } from '@/modules/user/presentation/http';
import { IVendorRepository } from '@/modules/vendor/domain/vendor.repository';
import { IVendorOutletRepository } from '@/modules/vendor-outlet/domain/vendor-outlet.repository';
import { PrismaVendorOutletRepository } from '@/modules/vendor-outlet/infrastructure/prisma-vendor-outlet.repository';
import { CreateVendorOutletUseCase } from '@/modules/vendor-outlet/application/use-cases/create-vendor-outlet.usecase';
import { GetVendorOutletUseCase } from '@/modules/vendor-outlet/application/use-cases/get-vendor-outlet.usecase';
import { UpdateVendorOutletUseCase } from '@/modules/vendor-outlet/application/use-cases/update-vendor-outlet.usecase';
import { DeleteVendorOutletUseCase } from '@/modules/vendor-outlet/application/use-cases/delete-vendor-outlet.usecase';
import { ListVendorOutletsUseCase } from '@/modules/vendor-outlet/application/use-cases/list-vendor-outlets.usecase';
import { CreateCustomerAddressUseCase } from '@/modules/customer-address/application/use-cases/create-customer-address.usecase';
import { GetCustomerAddressUseCase } from '@/modules/customer-address/application/use-cases/get-customer-address.usecase';
import { UpdateCustomerAddressUseCase } from '@/modules/customer-address/application/use-cases/update-customer-address.usecase';
import { DeleteCustomerAddressUseCase } from '@/modules/customer-address/application/use-cases/delete-customer-address.usecase';
import { ListCustomerAddressesUseCase } from '@/modules/customer-address/application/use-cases/list-customer-addresses.usecase';
import { CreateAddressUseCase } from '@/modules/address/application/use-cases/create-address.usecase';
import { GetAddressUseCase } from '@/modules/address/application/use-cases/get-address.usecase';
import { UpdateAddressUseCase } from '@/modules/address/application/use-cases/update-address.usecase';
import { DeleteAddressUseCase } from '@/modules/address/application/use-cases/delete-address.usecase';
import { ListAddressesUseCase } from '@/modules/address/application/use-cases/list-addresses.usecase';
import { IAddressRepository } from '@/modules/address/domain/address.repository.interface';
import { ICustomerAddressRepository } from '@/modules/customer-address/domain/customer-address.repository.interface';
import { PrismaAddressRepository } from '@/modules/address/infrastructure/prisma-address.repository';
import { PrismaCustomerAddressRepository } from '@/modules/customer-address/infrastructure/prisma-customer-address.repository';
import { ICourierRepository } from '@/modules/courier/domain/courier.repository';
import { PrismaCourierRepository } from '@/modules/courier/infrastructure/prisma-courier.repository';
import { CreateCourierUseCase } from '@/modules/courier/application/use-cases/create-courier.usecase';
import { GetCourierUseCase } from '@/modules/courier/application/use-cases/get-courier.usecase';
import { UpdateCourierUseCase } from '@/modules/courier/application/use-cases/update-courier.usecase';
import { DeleteCourierUseCase } from '@/modules/courier/application/use-cases/delete-courier.usecase';
import { ListCouriersUseCase } from '@/modules/courier/application/use-cases/list-couriers.usecase';
import { IDriverLocationRepository } from '@/modules/driver-location/domain/driver-location.repository.interface';
import { PrismaDriverLocationRepository } from '@/modules/driver-location/infrastructure/prisma-driver-location.repository';
import {
  CreateDriverLocationUseCase,
  DeleteDriverLocationUseCase,
  GetDriverLocationUseCase,
  UpdateDriverLocationUseCase,
} from '@/modules/driver-location/application/use-cases';
import { IDeliveryStatusRepository } from '@/modules/delivery-status/domain/delivery-status.repository';
import { PrismaDeliveryStatusRepository } from '@/modules/delivery-status/infrastructure/prisma-delivery-status.repository';
import { GetDeliveryStatusUseCase } from '@/modules/delivery-status/application/use-cases/get-delivery-status.usecase';
import { ListDeliveryStatusesUseCase } from '@/modules/delivery-status/application/use-cases/list-delivery-statuses.usecase';
import { PrismaDeliveryWindowRepository } from '@/modules/delivery-window/infrastructure/prisma-delivery-window.repository';
import { IDeliveryRepository } from '@/modules/delivery/domain/delivery.repository.interface';
import { PrismaDeliveryRepository } from '@/modules/delivery/infrastructure/prisma-delivery.repository';
import { CreateDeliveryUseCase } from '@/modules/delivery/application/use-cases/create-delivery.usecase';
import { GetDeliveryUseCase } from '@/modules/delivery/application/use-cases/get-delivery.usecase';
import { UpdateDeliveryUseCase } from '@/modules/delivery/application/use-cases/update-delivery.usecase';
import { DeleteDeliveryUseCase } from '@/modules/delivery/application/use-cases/delete-delivery.usecase';
import { ListDeliveriesUseCase } from '@/modules/delivery/application/use-cases/list-deliveries.usecase';
import { CreateProductUseCase } from '@/modules/product/application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from '@/modules/product/application/use-cases/delete-product.usecase';
import { GetAllProductsUseCase } from '@/modules/product/application/use-cases/get-all-products.usecase';
import { GetProductUseCase } from '@/modules/product/application/use-cases/get-product.usecase';
import { UpdateProductUseCase } from '@/modules/product/application/use-cases/update-product.usecase';
import { IProductRepository } from '@/modules/product/domain/product.repository';
import { PrismaProductRepository } from '@/modules/product/infrastructure/prisma-product.repository';
import { IProductImageRepository } from '@/modules/product-image/domain/product-image.repository.interface';
import { PrismaProductImageRepository } from '@/modules/product-image/infrastructure/prisma-product-image.repository';
import { CreateProductImageUseCase } from '@/modules/product-image/application/use-cases/create-product-image.usecase';
import { DeleteProductImageUseCase } from '@/modules/product-image/application/use-cases/delete-product-image.usecase';
import { FindAllProductImageUseCase } from '@/modules/product-image/application/use-cases/find-all-product-image.usecase';
import { GetProductImageUseCase } from '@/modules/product-image/application/use-cases/get-product-image.usecase';
import { UpdateProductImageUseCase } from '@/modules/product-image/application/use-cases/update-product-image.usecase';
import { CreatePromotionUseCase } from '@/modules/promotion/application/use-cases/create-promotion.usecase';
import { GetPromotionUseCase } from '@/modules/promotion/application/use-cases/get-promotion.usecase';
import { UpdatePromotionUseCase } from '@/modules/promotion/application/use-cases/update-promotion.usecase';
import { DeletePromotionUseCase } from '@/modules/promotion/application/use-cases/delete-promotion.usecase';
import { GetAllPromotionsUseCase } from '@/modules/promotion/application/use-cases/get-all-promotions.usecase';
import { IPromotionRepository } from '@/modules/promotion/domain/promotion.repository.interface';
import { PrismaPromotionRepository } from '@/modules/promotion/infrastructure/prisma-promotion.repository';
import { PrismaOrderPromotionRepository } from '@/modules/order-promotion/infrastructure/prisma-order-promotion.repository';
import {
  CreateOrderPromotionUseCase,
  GetOrderPromotionUseCase,
  UpdateOrderPromotionUseCase,
  DeleteOrderPromotionUseCase,
} from '@/modules/order-promotion/application/use-cases';

export interface Dependencies {
  orderPromotionRepository: PrismaOrderPromotionRepository;
  createOrderPromotionUseCase: CreateOrderPromotionUseCase;
  getOrderPromotionUseCase: GetOrderPromotionUseCase;
  updateOrderPromotionUseCase: UpdateOrderPromotionUseCase;
  deleteOrderPromotionUseCase: DeleteOrderPromotionUseCase;
  createPromotionUseCase: CreatePromotionUseCase;
  getPromotionUseCase: GetPromotionUseCase;
  updatePromotionUseCase: UpdatePromotionUseCase;
  deletePromotionUseCase: DeletePromotionUseCase;
  getAllPromotionsUseCase: GetAllPromotionsUseCase;
  createProductImageUseCase: CreateProductImageUseCase;
  getProductImageUseCase: GetProductImageUseCase;
  findAllProductImageUseCase: FindAllProductImageUseCase;
  updateProductImageUseCase: UpdateProductImageUseCase;
  deleteProductImageUseCase: DeleteProductImageUseCase;
  createProductUseCase: CreateProductUseCase;
  getAllProductsUseCase: GetAllProductsUseCase;
  getProductUseCase: GetProductUseCase;
  updateProductUseCase: UpdateProductUseCase;
  deleteProductUseCase: DeleteProductUseCase;
  driverLocationRepository: IDriverLocationRepository;
  createDriverLocationUseCase: CreateDriverLocationUseCase;
  getDriverLocationUseCase: GetDriverLocationUseCase;
  updateDriverLocationUseCase: UpdateDriverLocationUseCase;
  deleteDriverLocationUseCase: DeleteDriverLocationUseCase;
  courierRepository: ICourierRepository;
  createCourierUseCase: CreateCourierUseCase;
  getCourierUseCase: GetCourierUseCase;
  updateCourierUseCase: UpdateCourierUseCase;
  deleteCourierUseCase: DeleteCourierUseCase;
  listCouriersUseCase: ListCouriersUseCase;
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetUserUseCase;
  updateUserUseCase: UpdateUserUseCase;
  deleteUserUseCase: DeleteUserUseCase;
  listUsersUseCase: ListUsersUseCase;
  userController: UserController;
  userRepository: IUserRepository;
  vendorRepository: IVendorRepository;
  vendorOutletRepository: IVendorOutletRepository;
  addressRepository: IAddressRepository;
  customerAddressRepository: ICustomerAddressRepository;
  createNotificationUseCase: CreateNotificationUseCase;
  getNotificationUseCase: GetNotificationUseCase;
  updateNotificationUseCase: UpdateNotificationUseCase;
  deleteNotificationUseCase: DeleteNotificationUseCase;
  createProofOfDeliveryUseCase: CreateProofOfDeliveryUseCase;
  findProofOfDeliveryByIdUseCase: FindProofOfDeliveryByIdUseCase;
  updateProofOfDeliveryUseCase: UpdateProofOfDeliveryUseCase;
  deleteProofOfDeliveryUseCase: DeleteProofOfDeliveryUseCase;
  createShippingRateUseCase: CreateShippingRateUseCase;
  updateShippingRateUseCase: UpdateShippingRateUseCase;
  deleteShippingRateUseCase: DeleteShippingRateUseCase;
  getShippingRateUseCase: GetShippingRateUseCase;
  listShippingRatesUseCase: ListShippingRatesUseCase;
  calculateShippingRateUseCase: CalculateShippingRateUseCase;
  createVendorUseCase: CreateVendorUseCase;
  getVendorUseCase: GetVendorUseCase;
  updateVendorUseCase: UpdateVendorUseCase;
  deleteVendorUseCase: DeleteVendorUseCase;
  listVendorsUseCase: ListVendorsUseCase;
  getServiceZoneUseCase: GetServiceZoneUseCase;
  listServiceZonesUseCase: ListServiceZonesUseCase;
  createVendorOutletUseCase: CreateVendorOutletUseCase;
  getVendorOutletUseCase: GetVendorOutletUseCase;
  updateVendorOutletUseCase: UpdateVendorOutletUseCase;
  deleteVendorOutletUseCase: DeleteVendorOutletUseCase;
  listVendorOutletsUseCase: ListVendorOutletsUseCase;
  createCustomerAddressUseCase: CreateCustomerAddressUseCase;
  getCustomerAddressUseCase: GetCustomerAddressUseCase;
  updateCustomerAddressUseCase: UpdateCustomerAddressUseCase;
  deleteCustomerAddressUseCase: DeleteCustomerAddressUseCase;
  listCustomerAddressesUseCase: ListCustomerAddressesUseCase;
  createAddressUseCase: CreateAddressUseCase;
  getAddressUseCase: GetAddressUseCase;
  updateAddressUseCase: UpdateAddressUseCase;
  deleteAddressUseCase: DeleteAddressUseCase;
  listAddressesUseCase: ListAddressesUseCase;
  deliveryStatusRepository: IDeliveryStatusRepository;
  getDeliveryStatusUseCase: GetDeliveryStatusUseCase;
  listDeliveryStatusesUseCase: ListDeliveryStatusesUseCase;
  deliveryWindowRepository: any;
  deliveryRepository: IDeliveryRepository;
  createDeliveryUseCase: CreateDeliveryUseCase;
  getDeliveryUseCase: GetDeliveryUseCase;
  updateDeliveryUseCase: UpdateDeliveryUseCase;
  deleteDeliveryUseCase: DeleteDeliveryUseCase;
  listDeliveriesUseCase: ListDeliveriesUseCase;
}

export function createDependencies(prisma: PrismaClient): Dependencies {
  const proofOfDeliveryRepository = new PrismaProofOfDeliveryRepository(prisma);
  const shippingRateRepository = new PrismaShippingRateRepository(prisma);
  const vendorRepository = new PrismaVendorRepository(prisma);
  const serviceZoneRepository = new PrismaServiceZoneRepository(prisma);
  const notificationRepository = new PrismaNotificationRepository(prisma);
  const userRepository = new PrismaUserRepository(prisma);
  const vendorOutletRepository = new PrismaVendorOutletRepository(prisma);
  const addressRepository = new PrismaAddressRepository(prisma);
  const customerAddressRepository = new PrismaCustomerAddressRepository(prisma);
  const courierRepository = new PrismaCourierRepository(prisma);
  const driverLocationRepository = new PrismaDriverLocationRepository(prisma);
  const deliveryStatusRepository = new PrismaDeliveryStatusRepository(prisma);
  const deliveryWindowRepository = new PrismaDeliveryWindowRepository(prisma);
  const deliveryRepository = new PrismaDeliveryRepository(prisma);
  const productRepository = new PrismaProductRepository(prisma);
  const productImageRepository = new PrismaProductImageRepository(prisma);
  const promotionRepository = new PrismaPromotionRepository(prisma);
  const orderPromotionRepository = new PrismaOrderPromotionRepository(prisma);

  const createOrderPromotionUseCase = new CreateOrderPromotionUseCase(orderPromotionRepository);
  const getOrderPromotionUseCase = new GetOrderPromotionUseCase(orderPromotionRepository);
  const updateOrderPromotionUseCase = new UpdateOrderPromotionUseCase(orderPromotionRepository);
  const deleteOrderPromotionUseCase = new DeleteOrderPromotionUseCase(orderPromotionRepository);
  const createPromotionUseCase = new CreatePromotionUseCase(promotionRepository);
  const getPromotionUseCase = new GetPromotionUseCase(promotionRepository);
  const updatePromotionUseCase = new UpdatePromotionUseCase(promotionRepository);
  const deletePromotionUseCase = new DeletePromotionUseCase(promotionRepository);
  const getAllPromotionsUseCase = new GetAllPromotionsUseCase(promotionRepository);
  const createProductImageUseCase = new CreateProductImageUseCase(productImageRepository);
  const getProductImageUseCase = new GetProductImageUseCase(productImageRepository);
  const findAllProductImageUseCase = new FindAllProductImageUseCase(productImageRepository);
  const updateProductImageUseCase = new UpdateProductImageUseCase(productImageRepository);
  const deleteProductImageUseCase = new DeleteProductImageUseCase(productImageRepository);
  const createProductUseCase = new CreateProductUseCase(productRepository);
  const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
  const getProductUseCase = new GetProductUseCase(productRepository);
  const updateProductUseCase = new UpdateProductUseCase(productRepository);
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);
  const getDeliveryStatusUseCase = new GetDeliveryStatusUseCase(deliveryStatusRepository);
  const listDeliveryStatusesUseCase = new ListDeliveryStatusesUseCase(deliveryStatusRepository);
  const createDriverLocationUseCase = new CreateDriverLocationUseCase(driverLocationRepository);
  const getDriverLocationUseCase = new GetDriverLocationUseCase(driverLocationRepository);
  const updateDriverLocationUseCase = new UpdateDriverLocationUseCase(driverLocationRepository);
  const deleteDriverLocationUseCase = new DeleteDriverLocationUseCase(driverLocationRepository);
  const createCourierUseCase = new CreateCourierUseCase(courierRepository);
  const getCourierUseCase = new GetCourierUseCase(courierRepository);
  const updateCourierUseCase = new UpdateCourierUseCase(courierRepository);
  const deleteCourierUseCase = new DeleteCourierUseCase(courierRepository);
  const listCouriersUseCase = new ListCouriersUseCase(courierRepository);
  const createNotificationUseCase = new CreateNotificationUseCase(notificationRepository);
  const getNotificationUseCase = new GetNotificationUseCase(notificationRepository);
  const updateNotificationUseCase = new UpdateNotificationUseCase(notificationRepository);
  const deleteNotificationUseCase = new DeleteNotificationUseCase(notificationRepository);
  const createShippingRateUseCase = new CreateShippingRateUseCase(shippingRateRepository);
  const updateShippingRateUseCase = new UpdateShippingRateUseCase(shippingRateRepository);
  const deleteShippingRateUseCase = new DeleteShippingRateUseCase(shippingRateRepository);
  const getShippingRateUseCase = new GetShippingRateUseCase(shippingRateRepository);
  const listShippingRatesUseCase = new ListShippingRatesUseCase(shippingRateRepository);
  const calculateShippingRateUseCase = new CalculateShippingRateUseCase(shippingRateRepository);

  const createVendorUseCase = new CreateVendorUseCase(vendorRepository);
  const getVendorUseCase = new GetVendorUseCase(vendorRepository);
  const updateVendorUseCase = new UpdateVendorUseCase(vendorRepository);
  const deleteVendorUseCase = new DeleteVendorUseCase(vendorRepository);
  const listVendorsUseCase = new ListVendorsUseCase(vendorRepository);

  const getServiceZoneUseCase = new GetServiceZoneUseCase(serviceZoneRepository);
  const listServiceZonesUseCase = new ListServiceZonesUseCase(serviceZoneRepository);

  const createProofOfDeliveryUseCase = new CreateProofOfDeliveryUseCase(proofOfDeliveryRepository);
  const findProofOfDeliveryByIdUseCase = new FindProofOfDeliveryByIdUseCase(proofOfDeliveryRepository);
  const updateProofOfDeliveryUseCase = new UpdateProofOfDeliveryUseCase(proofOfDeliveryRepository);
  const deleteProofOfDeliveryUseCase = new DeleteProofOfDeliveryUseCase(proofOfDeliveryRepository);

  const createVendorOutletUseCase = new CreateVendorOutletUseCase(vendorOutletRepository);
  const getVendorOutletUseCase = new GetVendorOutletUseCase(vendorOutletRepository, vendorRepository);
  const updateVendorOutletUseCase = new UpdateVendorOutletUseCase(vendorOutletRepository);
  const deleteVendorOutletUseCase = new DeleteVendorOutletUseCase(vendorOutletRepository);
  const listVendorOutletsUseCase = new ListVendorOutletsUseCase(vendorOutletRepository, vendorRepository);

  const createCustomerAddressUseCase = new CreateCustomerAddressUseCase(customerAddressRepository);
  const getCustomerAddressUseCase = new GetCustomerAddressUseCase(customerAddressRepository);
  const updateCustomerAddressUseCase = new UpdateCustomerAddressUseCase(customerAddressRepository);
  const deleteCustomerAddressUseCase = new DeleteCustomerAddressUseCase(customerAddressRepository);
  const listCustomerAddressesUseCase = new ListCustomerAddressesUseCase(customerAddressRepository);
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  const getAddressUseCase = new GetAddressUseCase(addressRepository);
  const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
  const listAddressesUseCase = new ListAddressesUseCase(addressRepository);

  const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryRepository);
  const getDeliveryUseCase = new GetDeliveryUseCase(deliveryRepository);
  const updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveryRepository);
  const deleteDeliveryUseCase = new DeleteDeliveryUseCase(deliveryRepository);
  const listDeliveriesUseCase = new ListDeliveriesUseCase(deliveryRepository);

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const getUserUseCase = new GetUserUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const listUsersUseCase = new ListUsersUseCase(userRepository);
  const userController = new (require('@/modules/user/presentation/http').UserController)({
    createUserUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    listUsersUseCase,
  });

  return {
    userRepository,
    userController,
    createUserUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    listUsersUseCase,
    orderPromotionRepository,
    createOrderPromotionUseCase,
    getOrderPromotionUseCase,
    updateOrderPromotionUseCase,
    deleteOrderPromotionUseCase,
    createPromotionUseCase,
    getPromotionUseCase,
    updatePromotionUseCase,
    deletePromotionUseCase,
    getAllPromotionsUseCase,
    createProductImageUseCase,
    getProductImageUseCase,
    findAllProductImageUseCase,
    updateProductImageUseCase,
    deleteProductImageUseCase,
    createProductUseCase,
    getAllProductsUseCase,
    getProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    driverLocationRepository,
    createDriverLocationUseCase,
    getDriverLocationUseCase,
    updateDriverLocationUseCase,
    deleteDriverLocationUseCase,
    courierRepository,
    createCourierUseCase,
    getCourierUseCase,
    updateCourierUseCase,
    deleteCourierUseCase,
    listCouriersUseCase,
    userRepository,
    createUserUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    listUsersUseCase,
    userController,
    vendorRepository,
    vendorOutletRepository,
    addressRepository,
    customerAddressRepository,
    createNotificationUseCase,
    getNotificationUseCase,
    updateNotificationUseCase,
    deleteNotificationUseCase,
    createProofOfDeliveryUseCase,
    findProofOfDeliveryByIdUseCase,
    updateProofOfDeliveryUseCase,
    deleteProofOfDeliveryUseCase,
    createShippingRateUseCase,
    updateShippingRateUseCase,
    deleteShippingRateUseCase,
    getShippingRateUseCase,
    listShippingRatesUseCase,
    calculateShippingRateUseCase,
    createVendorUseCase,
    getVendorUseCase,
    updateVendorUseCase,
    deleteVendorUseCase,
    listVendorsUseCase,
    getServiceZoneUseCase,
    listServiceZonesUseCase,
    createVendorOutletUseCase,
    getVendorOutletUseCase,
    updateVendorOutletUseCase,
    deleteVendorOutletUseCase,
    listVendorOutletsUseCase,
    createCustomerAddressUseCase,
    getCustomerAddressUseCase,
    updateCustomerAddressUseCase,
    deleteCustomerAddressUseCase,
    listCustomerAddressesUseCase,
    createAddressUseCase,
    getAddressUseCase,
    updateAddressUseCase,
    deleteAddressUseCase,
    listAddressesUseCase,
    deliveryStatusRepository,
    getDeliveryStatusUseCase,
    listDeliveryStatusesUseCase,
    deliveryWindowRepository,
    deliveryRepository,
    createDeliveryUseCase,
    getDeliveryUseCase,
    updateDeliveryUseCase,
    deleteDeliveryUseCase,
    listDeliveriesUseCase,
  };
}
