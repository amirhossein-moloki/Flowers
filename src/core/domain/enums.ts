export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR_ADMIN = 'VENDOR_ADMIN',
  COURIER = 'COURIER',
  OPS = 'OPS',
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
  VENDOR = 'VENDOR',
}

export enum VehicleType {
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  BICYCLE = 'bicycle',
  VAN = 'van',
}

export enum PaymentMethod {
  ONLINE = 'ONLINE',
  COD = 'COD',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIAL_REFUND = 'PARTIAL_REFUND',
}

export enum NotificationChannel {
  PUSH = 'push',
  SMS = 'sms',
  EMAIL = 'email',
  IN_APP = 'in_app',
}

export enum ActorType {
  SYSTEM = 'system',
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  COURIER = 'courier',
  OPS = 'ops',
  ADMIN = 'admin',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}