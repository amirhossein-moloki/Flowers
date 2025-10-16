export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR_ADMIN = 'vendor_admin',
  COURIER = 'courier',
  OPS = 'ops',
  ADMIN = 'admin',
}

export enum VehicleType {
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  BICYCLE = 'bicycle',
  VAN = 'van',
}

export enum PaymentMethod {
  ONLINE = 'online',
  COD = 'cod',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIAL_REFUND = 'partial_refund',
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