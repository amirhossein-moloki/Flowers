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
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user.repository';
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

export interface Dependencies {
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

  return {
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
  };
}
