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

export interface Dependencies {
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
}

export function createDependencies(prisma: PrismaClient): Dependencies {
  const proofOfDeliveryRepository = new PrismaProofOfDeliveryRepository(prisma);
  const shippingRateRepository = new PrismaShippingRateRepository(prisma);
  const vendorRepository = new PrismaVendorRepository(prisma);
  const serviceZoneRepository = new PrismaServiceZoneRepository(prisma);

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

  return {
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
  };
}
