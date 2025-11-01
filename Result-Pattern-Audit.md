# Result Pattern Audit

**Date:** 2025-10-31T18:18:04Z
**Repo:** /app
**Branch:** HEAD

## Summary
- Total files with issues: **187**
- Total occurrences: **673**

### Breakdown by category
- `tsc-error`: 522
- `error-message-passed`: 41
- `nested-result`: 0
- `legacy-success-guard`: 3
- `error-non-null`: 0

## Table of affected files
| # | File | Categories | Occurrences | Suggested Fix (one-liner) | وضعیت اصلاح |
|---|------|------------|-------------|----------------------------|---|
| 1 | `src/core/events/in-memory-event-bus.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 2 | `src/core/http/validators.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 3 | `src/core/middlewares/auth.middleware.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 4 | `src/core/utils/result.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 5 | `src/infrastructure/cache/redis.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 6 | `src/infrastructure/database/prisma/prisma-client.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 7 | `src/infrastructure/di/index.ts` | , tsc-error | 16 | Fix Result pattern issues | |
| 8 | `src/infrastructure/http/middlewares/security.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 9 | `src/infrastructure/http/middlewares/zod-validation.middleware.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 10 | `src/main.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 11 | `src/modules/__tests__/address/address.entity.spec.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 12 | `src/modules/__tests__/address/prisma-address.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 13 | `src/modules/__tests__/automation-log/prisma-automation-log.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 14 | `src/modules/__tests__/courier/courier.entity.spec.ts` | , error-message-passed | 2 | Fix Result pattern issues | |
| 15 | `src/modules/__tests__/courier/prisma-courier.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 16 | `src/modules/__tests__/customer-address/prisma-customer-address.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 17 | `src/modules/__tests__/delivery-status/prisma-delivery-status.repository.spec.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 18 | `src/modules/__tests__/delivery-window/prisma-delivery-window.repository.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 19 | `src/modules/__tests__/helpers/prisma-mock.helper.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 20 | `src/modules/__tests__/notification/prisma-notification.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 21 | `src/modules/__tests__/order-promotion/prisma-order-promotion.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 22 | `src/modules/__tests__/order/prisma-order.repository.spec.ts` | , tsc-error | 13 | Fix Result pattern issues | |
| 23 | `src/modules/__tests__/payment/prisma-payment.repository.spec.ts` | , tsc-error | 7 | Fix Result pattern issues | |
| 24 | `src/modules/__tests__/product-image/prisma-product-image.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 25 | `src/modules/__tests__/promotion/prisma-promotion.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 26 | `src/modules/__tests__/service-zone/prisma-service-zone.repository.spec.ts` | , tsc-error | 14 | Fix Result pattern issues | |
| 27 | `src/modules/__tests__/shipping-rate/prisma-shipping-rate.repository.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 28 | `src/modules/__tests__/user/prisma-user.repository.spec.ts` | , tsc-error | 6 | Fix Result pattern issues | |
| 29 | `src/modules/__tests__/vendor-outlet/prisma-vendor-outlet.repository.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 30 | `src/modules/__tests__/vendor/prisma-vendor.repository.spec.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 31 | `src/modules/address/application/use-cases/create-address.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 32 | `src/modules/address/application/use-cases/list-addresses.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 33 | `src/modules/address/application/use-cases/update-address.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 34 | `src/modules/address/domain/address.repository.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 35 | `src/modules/address/http/__tests__/address.controller.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 36 | `src/modules/address/http/__tests__/address.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 37 | `src/modules/address/http/controller.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 38 | `src/modules/address/infrastructure/address.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 39 | `src/modules/automation-log/application/dtos/automation-log.dto.ts` | , tsc-error | 6 | Fix Result pattern issues | |
| 40 | `src/modules/automation-log/application/dtos/create-automation-log.dto.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 41 | `src/modules/automation-log/application/use-cases/create-automation-log.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues | |
| 42 | `src/modules/automation-log/application/use-cases/delete-automation-log.usecase.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 43 | `src/modules/automation-log/application/use-cases/get-automation-log.usecase.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 44 | `src/modules/automation-log/application/use-cases/update-automation-log.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues | |
| 45 | `src/modules/automation-log/infrastructure/automation-log.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 46 | `src/modules/automation-log/presentation/http/__tests__/automation-log.controller.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 47 | `src/modules/automation-log/presentation/http/__tests__/automation-log.integration.spec.ts` | , tsc-error | 13 | Fix Result pattern issues | |
| 48 | `src/modules/courier/application/use-cases/create-courier.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 49 | `src/modules/courier/application/use-cases/update-courier.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 50 | `src/modules/courier/http/__tests__/courier.integration.spec.ts` | , tsc-error | 7 | Fix Result pattern issues | |
| 51 | `src/modules/courier/http/controller.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 52 | `src/modules/courier/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 53 | `src/modules/courier/infrastructure/courier.mapper.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 54 | `src/modules/customer-address/application/use-cases/create-customer-address.usecase.ts` | , error-message-passed, tsc-error | 5 | Fix Result pattern issues | |
| 55 | `src/modules/customer-address/application/use-cases/list-customer-addresses.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 56 | `src/modules/customer-address/application/use-cases/update-customer-address.usecase.ts` | , error-message-passed, tsc-error | 5 | Fix Result pattern issues | |
| 57 | `src/modules/customer-address/domain/customer-address.entity.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 58 | `src/modules/customer-address/http/__tests__/customer-address.integration.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 59 | `src/modules/customer-address/http/controller.ts` | , tsc-error | 9 | Fix Result pattern issues | |
| 60 | `src/modules/customer-address/infrastructure/customer-address.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 61 | `src/modules/delivery-status/application/dtos/create-delivery-status.dto.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 62 | `src/modules/delivery-status/application/use-cases/create-delivery-status.usecase.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues | |
| 63 | `src/modules/delivery-status/application/use-cases/get-delivery-status.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 64 | `src/modules/delivery-status/application/use-cases/list-delivery-statuses.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 65 | `src/modules/delivery-status/application/use-cases/update-delivery-status.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 66 | `src/modules/delivery-status/http/__tests__/delivery-status.integration.spec.ts` | , tsc-error | 8 | Fix Result pattern issues | |
| 67 | `src/modules/delivery-status/infrastructure/delivery-status.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 68 | `src/modules/delivery-status/infrastructure/prisma-delivery-status.repository.ts` | , error-message-passed, tsc-error | 8 | Fix Result pattern issues | |
| 69 | `src/modules/delivery-status/presentation/http/presenters/delivery-status.presenter.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 70 | `src/modules/delivery-window/application/use-cases/create-delivery-window.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 71 | `src/modules/delivery-window/application/use-cases/update-delivery-window.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 72 | `src/modules/delivery-window/http/__tests__/delivery-window.controller.spec.ts` | , tsc-error | 12 | Fix Result pattern issues | |
| 73 | `src/modules/delivery-window/http/__tests__/delivery-window.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 74 | `src/modules/delivery-window/http/controller.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 75 | `src/modules/delivery-window/infrastructure/delivery-window.mapper.ts` | , legacy-success-guard, tsc-error | 3 | Fix Result pattern issues | |
| 76 | `src/modules/delivery-window/presentation/mappers/delivery-window.mapper.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues | |
| 77 | `src/modules/delivery/application/dtos/create-delivery.dto.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 78 | `src/modules/delivery/application/dtos/delivery.dto.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 79 | `src/modules/delivery/application/dtos/update-delivery.dto.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 80 | `src/modules/delivery/application/use-cases/create-delivery.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 81 | `src/modules/delivery/application/use-cases/update-delivery.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 82 | `src/modules/delivery/domain/delivery.entity.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 83 | `src/modules/delivery/http/__tests__/delivery.controller.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 84 | `src/modules/delivery/http/__tests__/delivery.integration.spec.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 85 | `src/modules/delivery/http/controller.ts` | , tsc-error | 10 | Fix Result pattern issues | |
| 86 | `src/modules/delivery/http/dto/create-delivery.schema.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 87 | `src/modules/delivery/http/dto/update-delivery.schema.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 88 | `src/modules/delivery/infrastructure/__tests__/delivery/prisma-delivery.repository.spec.ts` | , tsc-error | 6 | Fix Result pattern issues | |
| 89 | `src/modules/delivery/infrastructure/__tests__/prisma-delivery.repository.spec.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 90 | `src/modules/delivery/infrastructure/delivery.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 91 | `src/modules/driver-location/application/use-cases/create-driver-location.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 92 | `src/modules/driver-location/http/__tests__/driver-location.controller.spec.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 93 | `src/modules/driver-location/http/__tests__/driver-location.integration.spec.ts` | , tsc-error | 8 | Fix Result pattern issues | |
| 94 | `src/modules/driver-location/http/controller.ts` | , tsc-error | 12 | Fix Result pattern issues | |
| 95 | `src/modules/driver-location/infrastructure/driver-location.mapper.ts` | , legacy-success-guard, tsc-error | 2 | Fix Result pattern issues | |
| 96 | `src/modules/driver-location/presentation/mappers/driver-location.mapper.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 97 | `src/modules/notification/application/use-cases/create-notification.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 98 | `src/modules/notification/application/use-cases/delete-notification.usecase.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 99 | `src/modules/notification/application/use-cases/get-notification.usecase.ts` | , tsc-error | 7 | Fix Result pattern issues | |
| 100 | `src/modules/notification/application/use-cases/update-notification.usecase.ts` | , tsc-error | 11 | Fix Result pattern issues | |
| 101 | `src/modules/notification/infrastructure/notification.mapper.ts` | , legacy-success-guard, tsc-error | 3 | Fix Result pattern issues | |
| 102 | `src/modules/notification/infrastructure/prisma-notification.repository.ts` | , error-message-passed, tsc-error | 8 | Fix Result pattern issues | |
| 103 | `src/modules/notification/presentation/http/__tests__/notification.controller.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 104 | `src/modules/notification/presentation/http/__tests__/notification.integration.spec.ts` | , tsc-error | 8 | Fix Result pattern issues | |
| 105 | `src/modules/notification/presentation/http/notification.controller.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 106 | `src/modules/order-promotion/__tests__/order-promotion.usecase.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 107 | `src/modules/order-promotion/application/use-cases/create-order-promotion.usecase.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues | |
| 108 | `src/modules/order-promotion/application/use-cases/update-order-promotion.usecase.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues | |
| 109 | `src/modules/order-promotion/infrastructure/order-promotion.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 110 | `src/modules/order-promotion/presentation/http/__tests__/order-promotion.controller.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 111 | `src/modules/order-promotion/presentation/http/__tests__/order-promotion.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 112 | `src/modules/order-promotion/presentation/http/order-promotion.routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 113 | `src/modules/order/application/use-cases/create-order.usecase.ts` | , tsc-error | 6 | Fix Result pattern issues | |
| 114 | `src/modules/order/application/use-cases/update-order.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 115 | `src/modules/order/infrastructure/__tests__/prisma-order.repository.spec.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 116 | `src/modules/order/infrastructure/order.mapper.ts` | , tsc-error | 6 | Fix Result pattern issues | |
| 117 | `src/modules/order/infrastructure/prisma-order.repository.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 118 | `src/modules/order/presentation/http/__tests__/order.controller.spec.ts` | , tsc-error | 7 | Fix Result pattern issues | |
| 119 | `src/modules/order/presentation/http/__tests__/order.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 120 | `src/modules/payment/application/dtos/payment.dto.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 121 | `src/modules/payment/application/dtos/update-payment.dto.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 122 | `src/modules/payment/application/use-cases/create-payment.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues | |
| 123 | `src/modules/payment/application/use-cases/update-payment.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 124 | `src/modules/payment/application/use-cases/verify-payment.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 125 | `src/modules/payment/domain/payment.entity.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 126 | `src/modules/payment/infrastructure/__tests__/prisma-payment.repository.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 127 | `src/modules/payment/infrastructure/payment.mapper.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 128 | `src/modules/payment/presentation/http/__tests__/payment.controller.spec.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 129 | `src/modules/payment/presentation/http/__tests__/payment.integration.spec.ts` | , tsc-error | 12 | Fix Result pattern issues | |
| 130 | `src/modules/product-image/application/use-cases/create-product-image.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues | |
| 131 | `src/modules/product-image/application/use-cases/find-all-product-image.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 132 | `src/modules/product-image/application/use-cases/get-product-image.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 133 | `src/modules/product-image/application/use-cases/update-product-image.usecase.ts` | , error-message-passed, tsc-error | 7 | Fix Result pattern issues | |
| 134 | `src/modules/product-image/infrastructure/prisma-product-image.repository.ts` | , error-message-passed | 6 | Fix Result pattern issues | |
| 135 | `src/modules/product-image/infrastructure/product-image.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 136 | `src/modules/product-image/presentation/http/__tests__/product-image.controller.spec.ts` | , tsc-error | 8 | Fix Result pattern issues | |
| 137 | `src/modules/product-image/presentation/http/__tests__/product-image.integration.spec.ts` | , tsc-error | 15 | Fix Result pattern issues | |
| 138 | `src/modules/product/application/use-cases/create-product.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 139 | `src/modules/product/application/use-cases/update-product.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues | |
| 140 | `src/modules/product/infrastructure/__tests__/product/prisma-product.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 141 | `src/modules/product/infrastructure/product.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 142 | `src/modules/product/presentation/http/__tests__/product.controller.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 143 | `src/modules/product/presentation/http/__tests__/product.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 144 | `src/modules/product/presentation/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 145 | `src/modules/promotion/application/use-cases/create-promotion.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 146 | `src/modules/promotion/application/use-cases/update-promotion.usecase.ts` | , tsc-error | 5 | Fix Result pattern issues | |
| 147 | `src/modules/promotion/domain/promotion.entity.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 148 | `src/modules/promotion/infrastructure/mappers/promotion.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 149 | `src/modules/promotion/infrastructure/prisma-promotion.repository.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 150 | `src/modules/promotion/infrastructure/promotion.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 151 | `src/modules/promotion/presentation/http/__tests__/promotion.controller.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 152 | `src/modules/promotion/presentation/http/__tests__/promotion.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 153 | `src/modules/promotion/presentation/http/dto/create-promotion.schema.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 154 | `src/modules/promotion/presentation/http/dto/update-promotion.schema.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 155 | `src/modules/proof-of-delivery/infrastructure/__tests__/prisma-proof-of-delivery.repository.spec.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 156 | `src/modules/proof-of-delivery/infrastructure/prisma-proof-of-delivery.repository.ts` | , tsc-error | 14 | Fix Result pattern issues | |
| 157 | `src/modules/proof-of-delivery/infrastructure/proof-of-delivery.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 158 | `src/modules/proof-of-delivery/presentation/http/__tests__/proof-of-delivery.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 159 | `src/modules/proof-of-delivery/presentation/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 160 | `src/modules/service-zone/infrastructure/service-zone.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 161 | `src/modules/shipping-rate/application/use-cases/create-shipping-rate.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 162 | `src/modules/shipping-rate/application/use-cases/update-shipping-rate.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 163 | `src/modules/shipping-rate/infrastructure/shipping-rate.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 164 | `src/modules/shipping-rate/presentation/http/__tests__/shipping-rate.controller.spec.ts` | , tsc-error | 6 | Fix Result pattern issues | |
| 165 | `src/modules/shipping-rate/presentation/http/__tests__/shipping-rate.integration.spec.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 166 | `src/modules/shipping-rate/presentation/http/shipping-rate.routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 167 | `src/modules/user/application/dtos/create-user.dto.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 168 | `src/modules/user/application/use-cases/create-user.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 169 | `src/modules/user/domain/user.entity.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 170 | `src/modules/user/http/__tests__/user.controller.spec.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues | |
| 171 | `src/modules/user/http/dto/create-user.schema.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 172 | `src/modules/user/infrastructure/user.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues | |
| 173 | `src/modules/user/presentation/http/__tests__/user.integration.spec.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 174 | `src/modules/vendor-outlet/application/use-cases/create-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 175 | `src/modules/vendor-outlet/application/use-cases/delete-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 176 | `src/modules/vendor-outlet/application/use-cases/get-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 177 | `src/modules/vendor-outlet/application/use-cases/list-vendor-outlets.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 178 | `src/modules/vendor-outlet/application/use-cases/update-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 179 | `src/modules/vendor-outlet/http/__tests__/vendor-outlet.controller.spec.ts` | , tsc-error | 15 | Fix Result pattern issues | |
| 180 | `src/modules/vendor-outlet/http/__tests__/vendor-outlet.integration.spec.ts` | , tsc-error | 4 | Fix Result pattern issues | |
| 181 | `src/modules/vendor-outlet/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 182 | `src/modules/vendor-outlet/infrastructure/vendor-outlet.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 183 | `src/modules/vendor/application/use-cases/create-vendor.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 184 | `src/modules/vendor/application/use-cases/update-vendor.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues | |
| 185 | `src/modules/vendor/http/__tests__/vendor.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues | |
| 186 | `src/modules/vendor/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues | |
| 187 | `src/modules/vendor/infrastructure/vendor.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues | |
