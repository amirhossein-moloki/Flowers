import { PrismaClient, NotificationChannel, NotificationStatus, VehicleType } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from '@/infrastructure/database/prisma/prisma-client';

jest.mock('@/infrastructure/database/prisma/prisma-client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');
  return {
    ...originalModule,
    NotificationChannel: {
      EMAIL: 'EMAIL',
      PUSH: 'PUSH',
      SMS: 'SMS',
      IN_APP: 'IN_APP',
    },
    NotificationStatus: {
      PENDING: 'PENDING',
      SENT: 'SENT',
      FAILED: 'FAILED',
    },
    VehicleType: {
      CAR: 'CAR',
      MOTORCYCLE: 'MOTORCYCLE',
      BICYCLE: 'BICYCLE',
      VAN: 'VAN',
    },
    OrderStatus: {
      PENDING: 'PENDING',
      PAID: 'PAID',
      SHIPPED: 'SHIPPED',
      DELIVERED: 'DELIVERED',
      CANCELED: 'CANCELED',
    },
    PaymentMethod: {
      CREDIT_CARD: 'CREDIT_CARD',
      DEBIT_CARD: 'DEBIT_CARD',
      BANK_TRANSFER: 'BANK_TRANSFER',
      CASH: 'CASH',
    },
    PaymentStatus: {
      PENDING: 'PENDING',
      COMPLETED: 'COMPLETED',
      FAILED: 'FAILED',
      REFUNDED: 'REFUNDED',
    },
    DiscountType: {
      PERCENTAGE: 'PERCENTAGE',
      FIXED_AMOUNT: 'FIXED_AMOUNT',
    },
    UserRole: {
      ADMIN: 'ADMIN',
      CUSTOMER: 'CUSTOMER',
      COURIER: 'COURIER',
      VENDOR: 'VENDOR',
    },
  };
});

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;