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
| # | File | Categories | Occurrences | Suggested Fix (one-liner) |
|---|------|------------|-------------|----------------------------|
| 1 | `src/core/events/in-memory-event-bus.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 2 | `src/core/http/validators.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 3 | `src/core/middlewares/auth.middleware.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 4 | `src/core/utils/result.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 5 | `src/infrastructure/cache/redis.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 6 | `src/infrastructure/database/prisma/prisma-client.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 7 | `src/infrastructure/di/index.ts` | , tsc-error | 16 | Fix Result pattern issues |
| 8 | `src/infrastructure/http/middlewares/security.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 9 | `src/infrastructure/http/middlewares/zod-validation.middleware.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 10 | `src/main.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 11 | `src/modules/__tests__/address/address.entity.spec.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 12 | `src/modules/__tests__/address/prisma-address.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 13 | `src/modules/__tests__/automation-log/prisma-automation-log.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 14 | `src/modules/__tests__/courier/courier.entity.spec.ts` | , error-message-passed | 2 | Fix Result pattern issues |
| 15 | `src/modules/__tests__/courier/prisma-courier.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 16 | `src/modules/__tests__/customer-address/prisma-customer-address.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 17 | `src/modules/__tests__/delivery-status/prisma-delivery-status.repository.spec.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 18 | `src/modules/__tests__/delivery-window/prisma-delivery-window.repository.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 19 | `src/modules/__tests__/helpers/prisma-mock.helper.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 20 | `src/modules/__tests__/notification/prisma-notification.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 21 | `src/modules/__tests__/order-promotion/prisma-order-promotion.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 22 | `src/modules/__tests__/order/prisma-order.repository.spec.ts` | , tsc-error | 13 | Fix Result pattern issues |
| 23 | `src/modules/__tests__/payment/prisma-payment.repository.spec.ts` | , tsc-error | 7 | Fix Result pattern issues |
| 24 | `src/modules/__tests__/product-image/prisma-product-image.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 25 | `src/modules/__tests__/promotion/prisma-promotion.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 26 | `src/modules/__tests__/service-zone/prisma-service-zone.repository.spec.ts` | , tsc-error | 14 | Fix Result pattern issues |
| 27 | `src/modules/__tests__/shipping-rate/prisma-shipping-rate.repository.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 28 | `src/modules/__tests__/user/prisma-user.repository.spec.ts` | , tsc-error | 6 | Fix Result pattern issues |
| 29 | `src/modules/__tests__/vendor-outlet/prisma-vendor-outlet.repository.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 30 | `src/modules/__tests__/vendor/prisma-vendor.repository.spec.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 31 | `src/modules/address/application/use-cases/create-address.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 32 | `src/modules/address/application/use-cases/list-addresses.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 33 | `src/modules/address/application/use-cases/update-address.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 34 | `src/modules/address/domain/address.repository.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 35 | `src/modules/address/http/__tests__/address.controller.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 36 | `src/modules/address/http/__tests__/address.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 37 | `src/modules/address/http/controller.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 38 | `src/modules/address/infrastructure/address.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 39 | `src/modules/automation-log/application/dtos/automation-log.dto.ts` | , tsc-error | 6 | Fix Result pattern issues |
| 40 | `src/modules/automation-log/application/dtos/create-automation-log.dto.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 41 | `src/modules/automation-log/application/use-cases/create-automation-log.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues |
| 42 | `src/modules/automation-log/application/use-cases/delete-automation-log.usecase.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 43 | `src/modules/automation-log/application/use-cases/get-automation-log.usecase.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 44 | `src/modules/automation-log/application/use-cases/update-automation-log.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues |
| 45 | `src/modules/automation-log/infrastructure/automation-log.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 46 | `src/modules/automation-log/presentation/http/__tests__/automation-log.controller.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 47 | `src/modules/automation-log/presentation/http/__tests__/automation-log.integration.spec.ts` | , tsc-error | 13 | Fix Result pattern issues |
| 48 | `src/modules/courier/application/use-cases/create-courier.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 49 | `src/modules/courier/application/use-cases/update-courier.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 50 | `src/modules/courier/http/__tests__/courier.integration.spec.ts` | , tsc-error | 7 | Fix Result pattern issues |
| 51 | `src/modules/courier/http/controller.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 52 | `src/modules/courier/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 53 | `src/modules/courier/infrastructure/courier.mapper.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 54 | `src/modules/customer-address/application/use-cases/create-customer-address.usecase.ts` | , error-message-passed, tsc-error | 5 | Fix Result pattern issues |
| 55 | `src/modules/customer-address/application/use-cases/list-customer-addresses.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 56 | `src/modules/customer-address/application/use-cases/update-customer-address.usecase.ts` | , error-message-passed, tsc-error | 5 | Fix Result pattern issues |
| 57 | `src/modules/customer-address/domain/customer-address.entity.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 58 | `src/modules/customer-address/http/__tests__/customer-address.integration.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 59 | `src/modules/customer-address/http/controller.ts` | , tsc-error | 9 | Fix Result pattern issues |
| 60 | `src/modules/customer-address/infrastructure/customer-address.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 61 | `src/modules/delivery-status/application/dtos/create-delivery-status.dto.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 62 | `src/modules/delivery-status/application/use-cases/create-delivery-status.usecase.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues |
| 63 | `src/modules/delivery-status/application/use-cases/get-delivery-status.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 64 | `src/modules/delivery-status/application/use-cases/list-delivery-statuses.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 65 | `src/modules/delivery-status/application/use-cases/update-delivery-status.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 66 | `src/modules/delivery-status/http/__tests__/delivery-status.integration.spec.ts` | , tsc-error | 8 | Fix Result pattern issues |
| 67 | `src/modules/delivery-status/infrastructure/delivery-status.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 68 | `src/modules/delivery-status/infrastructure/prisma-delivery-status.repository.ts` | , error-message-passed, tsc-error | 8 | Fix Result pattern issues |
| 69 | `src/modules/delivery-status/presentation/http/presenters/delivery-status.presenter.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 70 | `src/modules/delivery-window/application/use-cases/create-delivery-window.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 71 | `src/modules/delivery-window/application/use-cases/update-delivery-window.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 72 | `src/modules/delivery-window/http/__tests__/delivery-window.controller.spec.ts` | , tsc-error | 12 | Fix Result pattern issues |
| 73 | `src/modules/delivery-window/http/__tests__/delivery-window.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 74 | `src/modules/delivery-window/http/controller.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 75 | `src/modules/delivery-window/infrastructure/delivery-window.mapper.ts` | , legacy-success-guard, tsc-error | 3 | Fix Result pattern issues |
| 76 | `src/modules/delivery-window/presentation/mappers/delivery-window.mapper.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues |
| 77 | `src/modules/delivery/application/dtos/create-delivery.dto.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 78 | `src/modules/delivery/application/dtos/delivery.dto.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 79 | `src/modules/delivery/application/dtos/update-delivery.dto.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 80 | `src/modules/delivery/application/use-cases/create-delivery.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 81 | `src/modules/delivery/application/use-cases/update-delivery.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 82 | `src/modules/delivery/domain/delivery.entity.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 83 | `src/modules/delivery/http/__tests__/delivery.controller.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 84 | `src/modules/delivery/http/__tests__/delivery.integration.spec.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 85 | `src/modules/delivery/http/controller.ts` | , tsc-error | 10 | Fix Result pattern issues |
| 86 | `src/modules/delivery/http/dto/create-delivery.schema.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 87 | `src/modules/delivery/http/dto/update-delivery.schema.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 88 | `src/modules/delivery/infrastructure/__tests__/delivery/prisma-delivery.repository.spec.ts` | , tsc-error | 6 | Fix Result pattern issues |
| 89 | `src/modules/delivery/infrastructure/__tests__/prisma-delivery.repository.spec.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 90 | `src/modules/delivery/infrastructure/delivery.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 91 | `src/modules/driver-location/application/use-cases/create-driver-location.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 92 | `src/modules/driver-location/http/__tests__/driver-location.controller.spec.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 93 | `src/modules/driver-location/http/__tests__/driver-location.integration.spec.ts` | , tsc-error | 8 | Fix Result pattern issues |
| 94 | `src/modules/driver-location/http/controller.ts` | , tsc-error | 12 | Fix Result pattern issues |
| 95 | `src/modules/driver-location/infrastructure/driver-location.mapper.ts` | , legacy-success-guard, tsc-error | 2 | Fix Result pattern issues |
| 96 | `src/modules/driver-location/presentation/mappers/driver-location.mapper.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 97 | `src/modules/notification/application/use-cases/create-notification.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 98 | `src/modules/notification/application/use-cases/delete-notification.usecase.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 99 | `src/modules/notification/application/use-cases/get-notification.usecase.ts` | , tsc-error | 7 | Fix Result pattern issues |
| 100 | `src/modules/notification/application/use-cases/update-notification.usecase.ts` | , tsc-error | 11 | Fix Result pattern issues |
| 101 | `src/modules/notification/infrastructure/notification.mapper.ts` | , legacy-success-guard, tsc-error | 3 | Fix Result pattern issues |
| 102 | `src/modules/notification/infrastructure/prisma-notification.repository.ts` | , error-message-passed, tsc-error | 8 | Fix Result pattern issues |
| 103 | `src/modules/notification/presentation/http/__tests__/notification.controller.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 104 | `src/modules/notification/presentation/http/__tests__/notification.integration.spec.ts` | , tsc-error | 8 | Fix Result pattern issues |
| 105 | `src/modules/notification/presentation/http/notification.controller.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 106 | `src/modules/order-promotion/__tests__/order-promotion.usecase.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 107 | `src/modules/order-promotion/application/use-cases/create-order-promotion.usecase.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues |
| 108 | `src/modules/order-promotion/application/use-cases/update-order-promotion.usecase.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues |
| 109 | `src/modules/order-promotion/infrastructure/order-promotion.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 110 | `src/modules/order-promotion/presentation/http/__tests__/order-promotion.controller.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 111 | `src/modules/order-promotion/presentation/http/__tests__/order-promotion.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 112 | `src/modules/order-promotion/presentation/http/order-promotion.routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 113 | `src/modules/order/application/use-cases/create-order.usecase.ts` | , tsc-error | 6 | Fix Result pattern issues |
| 114 | `src/modules/order/application/use-cases/update-order.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 115 | `src/modules/order/infrastructure/__tests__/prisma-order.repository.spec.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 116 | `src/modules/order/infrastructure/order.mapper.ts` | , tsc-error | 6 | Fix Result pattern issues |
| 117 | `src/modules/order/infrastructure/prisma-order.repository.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 118 | `src/modules/order/presentation/http/__tests__/order.controller.spec.ts` | , tsc-error | 7 | Fix Result pattern issues |
| 119 | `src/modules/order/presentation/http/__tests__/order.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 120 | `src/modules/payment/application/dtos/payment.dto.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 121 | `src/modules/payment/application/dtos/update-payment.dto.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 122 | `src/modules/payment/application/use-cases/create-payment.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues |
| 123 | `src/modules/payment/application/use-cases/update-payment.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 124 | `src/modules/payment/application/use-cases/verify-payment.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 125 | `src/modules/payment/domain/payment.entity.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 126 | `src/modules/payment/infrastructure/__tests__/prisma-payment.repository.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 127 | `src/modules/payment/infrastructure/payment.mapper.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 128 | `src/modules/payment/presentation/http/__tests__/payment.controller.spec.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 129 | `src/modules/payment/presentation/http/__tests__/payment.integration.spec.ts` | , tsc-error | 12 | Fix Result pattern issues |
| 130 | `src/modules/product-image/application/use-cases/create-product-image.usecase.ts` | , error-message-passed, tsc-error | 6 | Fix Result pattern issues |
| 131 | `src/modules/product-image/application/use-cases/find-all-product-image.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 132 | `src/modules/product-image/application/use-cases/get-product-image.usecase.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 133 | `src/modules/product-image/application/use-cases/update-product-image.usecase.ts` | , error-message-passed, tsc-error | 7 | Fix Result pattern issues |
| 134 | `src/modules/product-image/infrastructure/prisma-product-image.repository.ts` | , error-message-passed | 6 | Fix Result pattern issues |
| 135 | `src/modules/product-image/infrastructure/product-image.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 136 | `src/modules/product-image/presentation/http/__tests__/product-image.controller.spec.ts` | , tsc-error | 8 | Fix Result pattern issues |
| 137 | `src/modules/product-image/presentation/http/__tests__/product-image.integration.spec.ts` | , tsc-error | 15 | Fix Result pattern issues |
| 138 | `src/modules/product/application/use-cases/create-product.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 139 | `src/modules/product/application/use-cases/update-product.usecase.ts` | , error-message-passed, tsc-error | 4 | Fix Result pattern issues |
| 140 | `src/modules/product/infrastructure/__tests__/product/prisma-product.repository.spec.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 141 | `src/modules/product/infrastructure/product.mapper.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 142 | `src/modules/product/presentation/http/__tests__/product.controller.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 143 | `src/modules/product/presentation/http/__tests__/product.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 144 | `src/modules/product/presentation/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 145 | `src/modules/promotion/application/use-cases/create-promotion.usecase.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 146 | `src/modules/promotion/application/use-cases/update-promotion.usecase.ts` | , tsc-error | 5 | Fix Result pattern issues |
| 147 | `src/modules/promotion/domain/promotion.entity.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 148 | `src/modules/promotion/infrastructure/mappers/promotion.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 149 | `src/modules/promotion/infrastructure/prisma-promotion.repository.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 150 | `src/modules/promotion/infrastructure/promotion.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 151 | `src/modules/promotion/presentation/http/__tests__/promotion.controller.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 152 | `src/modules/promotion/presentation/http/__tests__/promotion.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 153 | `src/modules/promotion/presentation/http/dto/create-promotion.schema.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 154 | `src/modules/promotion/presentation/http/dto/update-promotion.schema.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 155 | `src/modules/proof-of-delivery/infrastructure/__tests__/prisma-proof-of-delivery.repository.spec.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 156 | `src/modules/proof-of-delivery/infrastructure/prisma-proof-of-delivery.repository.ts` | , tsc-error | 14 | Fix Result pattern issues |
| 157 | `src/modules/proof-of-delivery/infrastructure/proof-of-delivery.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 158 | `src/modules/proof-of-delivery/presentation/http/__tests__/proof-of-delivery.integration.spec.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 159 | `src/modules/proof-of-delivery/presentation/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 160 | `src/modules/service-zone/infrastructure/service-zone.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 161 | `src/modules/shipping-rate/application/use-cases/create-shipping-rate.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 162 | `src/modules/shipping-rate/application/use-cases/update-shipping-rate.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 163 | `src/modules/shipping-rate/infrastructure/shipping-rate.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 164 | `src/modules/shipping-rate/presentation/http/__tests__/shipping-rate.controller.spec.ts` | , tsc-error | 6 | Fix Result pattern issues |
| 165 | `src/modules/shipping-rate/presentation/http/__tests__/shipping-rate.integration.spec.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 166 | `src/modules/shipping-rate/presentation/http/shipping-rate.routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 167 | `src/modules/user/application/dtos/create-user.dto.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 168 | `src/modules/user/application/use-cases/create-user.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 169 | `src/modules/user/domain/user.entity.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 170 | `src/modules/user/http/__tests__/user.controller.spec.ts` | , error-message-passed, tsc-error | 3 | Fix Result pattern issues |
| 171 | `src/modules/user/http/dto/create-user.schema.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 172 | `src/modules/user/infrastructure/user.mapper.ts` | , tsc-error | 2 | Fix Result pattern issues |
| 173 | `src/modules/user/presentation/http/__tests__/user.integration.spec.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 174 | `src/modules/vendor-outlet/application/use-cases/create-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 175 | `src/modules/vendor-outlet/application/use-cases/delete-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 176 | `src/modules/vendor-outlet/application/use-cases/get-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 177 | `src/modules/vendor-outlet/application/use-cases/list-vendor-outlets.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 178 | `src/modules/vendor-outlet/application/use-cases/update-vendor-outlet.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 179 | `src/modules/vendor-outlet/http/__tests__/vendor-outlet.controller.spec.ts` | , tsc-error | 15 | Fix Result pattern issues |
| 180 | `src/modules/vendor-outlet/http/__tests__/vendor-outlet.integration.spec.ts` | , tsc-error | 4 | Fix Result pattern issues |
| 181 | `src/modules/vendor-outlet/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 182 | `src/modules/vendor-outlet/infrastructure/vendor-outlet.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 183 | `src/modules/vendor/application/use-cases/create-vendor.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 184 | `src/modules/vendor/application/use-cases/update-vendor.usecase.ts` | , error-message-passed | 1 | Fix Result pattern issues |
| 185 | `src/modules/vendor/http/__tests__/vendor.integration.spec.ts` | , tsc-error | 3 | Fix Result pattern issues |
| 186 | `src/modules/vendor/http/routes.ts` | , tsc-error | 1 | Fix Result pattern issues |
| 187 | `src/modules/vendor/infrastructure/vendor.mapper.ts` | , tsc-error | 1 | Fix Result pattern issues |

## Detailed Findings

### `src/core/events/in-memory-event-bus.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS2769: No overload matches this call.
```

### `src/core/http/validators.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 17
- **Snippet:**
```ts
 error TS2339: Property 'errors' does not exist on type 'ZodError<unknown>'.
```

### `src/core/middlewares/auth.middleware.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/core/utils/result.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 13
- **Snippet:**
```ts
 error TS2322: Type 'Result<undefined, E>' is not assignable to type 'Result<T, E>'.
```
#### 2) `tsc-error`
- **Line:** 44
- **Snippet:**
```ts
 error TS2322: Type 'Result<T, E>' is not assignable to type 'Result<U, E>'.
```

### `src/infrastructure/cache/redis.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2307: Cannot find module 'redis' or its corresponding type declarations.
```
#### 2) `tsc-error`
- **Line:** 10
- **Snippet:**
```ts
 error TS7006: Parameter 'err' implicitly has an 'any' type.
```

### `src/infrastructure/database/prisma/prisma-client.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 13
- **Snippet:**
```ts
 error TS7006: Parameter 'e' implicitly has an 'any' type.
```

### `src/infrastructure/di/index.ts`
**Categories:** , tsc-error
**Occurrences:** 16

#### 1) `tsc-error`
- **Line:** 107
- **Snippet:**
```ts
 error TS2307: Cannot find module '@/modules/promotion/domain/promotion.repository.interface' or its corresponding type declarations.
```
#### 2) `tsc-error`
- **Line:** 362
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 3) `tsc-error`
- **Line:** 363
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 4) `tsc-error`
- **Line:** 360
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 5) `tsc-error`
- **Line:** 361
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 6) `tsc-error`
- **Line:** 364
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 7) `tsc-error`
- **Line:** 258
- **Snippet:**
```ts
 error TS2345: Argument of type 'PrismaNotificationRepository' is not assignable to parameter of type 'INotificationRepository'.
```
#### 8) `tsc-error`
- **Line:** 259
- **Snippet:**
```ts
 error TS2345: Argument of type 'PrismaNotificationRepository' is not assignable to parameter of type 'INotificationRepository'.
```
#### 9) `tsc-error`
- **Line:** 38
- **Snippet:**
```ts
 error TS2305: Module '"@/modules/user/presentation/http"' has no exported member 'UserRoutes'.
```
#### 10) `tsc-error`
- **Line:** 359
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 11) `tsc-error`
- **Line:** 358
- **Snippet:**
```ts
 error TS1117: An object literal cannot have multiple properties with the same name.
```
#### 12) `tsc-error`
- **Line:** 248
- **Snippet:**
```ts
 error TS2345: Argument of type 'PrismaDeliveryStatusRepository' is not assignable to parameter of type 'IDeliveryStatusRepository'.
```
#### 13) `tsc-error`
- **Line:** 247
- **Snippet:**
```ts
 error TS2345: Argument of type 'PrismaDeliveryStatusRepository' is not assignable to parameter of type 'IDeliveryStatusRepository'.
```
#### 14) `tsc-error`
- **Line:** 405
- **Snippet:**
```ts
 error TS2322: Type 'PrismaDeliveryStatusRepository' is not assignable to type 'IDeliveryStatusRepository'.
```
#### 15) `tsc-error`
- **Line:** 261
- **Snippet:**
```ts
 error TS2345: Argument of type 'PrismaNotificationRepository' is not assignable to parameter of type 'INotificationRepository'.
```
#### 16) `tsc-error`
- **Line:** 260
- **Snippet:**
```ts
 error TS2345: Argument of type 'PrismaNotificationRepository' is not assignable to parameter of type 'INotificationRepository'.
```

### `src/infrastructure/http/middlewares/security.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS7016: Could not find a declaration file for module 'cors'. '/app/node_modules/cors/lib/index.js' implicitly has an 'any' type.
```

### `src/infrastructure/http/middlewares/zod-validation.middleware.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2724: '"/app/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
```

### `src/main.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2554: Expected 1 arguments, but got 2.
```

### `src/modules/__tests__/address/address.entity.spec.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       expect(result.error.message).toBe('Address fields cannot be empty.');
- **Snippet:**
```ts

```

### `src/modules/__tests__/address/prisma-address.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 53
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```
#### 2) `tsc-error`
- **Line:** 57
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```
#### 3) `tsc-error`
- **Line:** 56
- **Snippet:**
```ts
 error TS18048: 'addressEntity' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 58
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```
#### 5) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS18048: 'addressEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/automation-log/prisma-automation-log.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS18048: 'automationLogEntity' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 66
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```
#### 3) `tsc-error`
- **Line:** 67
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```
#### 4) `tsc-error`
- **Line:** 65
- **Snippet:**
```ts
 error TS18048: 'automationLogEntity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 62
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```

### `src/modules/__tests__/courier/courier.entity.spec.ts`
**Categories:** , error-message-passed
**Occurrences:** 2

#### 1) `error-message-passed`
- **Line:**       expect(result.error.message).toBe('Invalid email format.');
- **Snippet:**
```ts

```
#### 2) `error-message-passed`
- **Line:**       expect(result.error.message).toBe(
- **Snippet:**
```ts

```

### `src/modules/__tests__/courier/prisma-courier.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 59
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```
#### 2) `tsc-error`
- **Line:** 58
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```
#### 3) `tsc-error`
- **Line:** 54
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```
#### 4) `tsc-error`
- **Line:** 57
- **Snippet:**
```ts
 error TS18048: 'courierEntity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS18048: 'courierEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/customer-address/prisma-customer-address.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 66
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | undefined' is not assignable to parameter of type 'CustomerAddress'.
```
#### 2) `tsc-error`
- **Line:** 64
- **Snippet:**
```ts
 error TS18048: 'customerAddressEntity' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 65
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | undefined' is not assignable to parameter of type 'CustomerAddress'.
```
#### 4) `tsc-error`
- **Line:** 61
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | undefined' is not assignable to parameter of type 'CustomerAddress'.
```
#### 5) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS18048: 'customerAddressEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/delivery-status/prisma-delivery-status.repository.spec.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       expect(result.error?.message).toEqual('Delivery status not found');
- **Snippet:**
```ts

```

### `src/modules/__tests__/delivery-window/prisma-delivery-window.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 70
- **Snippet:**
```ts
 error TS2339: Property 'id' does not exist on type 'DeliveryWindowProps'.
```

### `src/modules/__tests__/helpers/prisma-mock.helper.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/__tests__/notification/prisma-notification.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 71
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 2) `tsc-error`
- **Line:** 70
- **Snippet:**
```ts
 error TS18048: 'notificationEntity' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 72
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 4) `tsc-error`
- **Line:** 67
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 5) `tsc-error`
- **Line:** 31
- **Snippet:**
```ts
 error TS18048: 'notificationEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/order-promotion/prisma-order-promotion.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 53
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderPromotion | undefined' is not assignable to parameter of type 'OrderPromotion'.
```
#### 2) `tsc-error`
- **Line:** 57
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderPromotion | undefined' is not assignable to parameter of type 'OrderPromotion'.
```
#### 3) `tsc-error`
- **Line:** 56
- **Snippet:**
```ts
 error TS18048: 'orderPromotionEntity' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 58
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderPromotion | undefined' is not assignable to parameter of type 'OrderPromotion'.
```
#### 5) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS18048: 'orderPromotionEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/order/prisma-order.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 13

#### 1) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS18048: 'orderEntity' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 34
- **Snippet:**
```ts
 error TS18048: 'orderEntity' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 33
- **Snippet:**
```ts
 error TS18048: 'orderEntity' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 32
- **Snippet:**
```ts
 error TS18048: 'orderEntity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 101
- **Snippet:**
```ts
 error TS2345: Argument of type 'Order | undefined' is not assignable to parameter of type 'Order'.
```
#### 6) `tsc-error`
- **Line:** 86
- **Snippet:**
```ts
 error TS7006: Parameter 'callback' implicitly has an 'any' type.
```
#### 7) `tsc-error`
- **Line:** 83
- **Snippet:**
```ts
 error TS2345: Argument of type 'Order | undefined' is not assignable to parameter of type 'Order'.
```
#### 8) `tsc-error`
- **Line:** 40
- **Snippet:**
```ts
 error TS18048: 'orderItem' is possibly 'undefined'.
```
#### 9) `tsc-error`
- **Line:** 41
- **Snippet:**
```ts
 error TS18048: 'orderItem' is possibly 'undefined'.
```
#### 10) `tsc-error`
- **Line:** 42
- **Snippet:**
```ts
 error TS18048: 'orderItem' is possibly 'undefined'.
```
#### 11) `tsc-error`
- **Line:** 43
- **Snippet:**
```ts
 error TS18048: 'orderItem' is possibly 'undefined'.
```
#### 12) `tsc-error`
- **Line:** 44
- **Snippet:**
```ts
 error TS18048: 'orderItem' is possibly 'undefined'.
```
#### 13) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2322: Type 'OrderItem | undefined' is not assignable to type 'OrderItem'.
```

### `src/modules/__tests__/payment/prisma-payment.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 7

#### 1) `tsc-error`
- **Line:** 57
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 2) `tsc-error`
- **Line:** 58
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 3) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```
#### 4) `tsc-error`
- **Line:** 62
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 5) `tsc-error`
- **Line:** 61
- **Snippet:**
```ts
 error TS18048: 'paymentEntity' is possibly 'undefined'.
```
#### 6) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS18048: 'paymentEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/product-image/prisma-product-image.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 56
- **Snippet:**
```ts
 error TS18047: 'foundProductImage.value' is possibly 'null'.
```
#### 2) `tsc-error`
- **Line:** 75
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 3) `tsc-error`
- **Line:** 79
- **Snippet:**
```ts
 error TS18048: 'productImageEntity' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS18048: 'productImageEntity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 36
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```

### `src/modules/__tests__/promotion/prisma-promotion.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 83
- **Snippet:**
```ts
 error TS2345: Argument of type 'Promotion | undefined' is not assignable to parameter of type 'Promotion'.
```
#### 2) `tsc-error`
- **Line:** 80
- **Snippet:**
```ts
 error TS2345: Argument of type 'Promotion | undefined' is not assignable to parameter of type 'Promotion'.
```
#### 3) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```
#### 4) `tsc-error`
- **Line:** 42
- **Snippet:**
```ts
 error TS2345: Argument of type '{ code: string; description: string; discount_type: any; discount_value: number; start_date: Date; end_date: Date; max_uses: number; uses_count: number; is_active: boolean; }' is not assignable to parameter of type 'IPromotionProps'.
```
#### 5) `tsc-error`
- **Line:** 49
- **Snippet:**
```ts
 error TS18048: 'promotionEntity' is possibly 'undefined'.
```

### `src/modules/__tests__/service-zone/prisma-service-zone.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 14

#### 1) `tsc-error`
- **Line:** 18
- **Snippet:**
```ts
 error TS7034: Variable 'mockMapper' implicitly has type 'any' in some locations where its type cannot be determined.
```
#### 2) `tsc-error`
- **Line:** 43
- **Snippet:**
```ts
 error TS7005: Variable 'mockMapper' implicitly has an 'any' type.
```
#### 3) `tsc-error`
- **Line:** 78
- **Snippet:**
```ts
 error TS2561: Object literal may only specify known properties, but 'geojson' does not exist in type 'ServiceZoneProps'. Did you mean to write 'geo_json'?
```
#### 4) `tsc-error`
- **Line:** 72
- **Snippet:**
```ts
 error TS7005: Variable 'mockMapper' implicitly has an 'any' type.
```
#### 5) `tsc-error`
- **Line:** 85
- **Snippet:**
```ts
 error TS7005: Variable 'mockMapper' implicitly has an 'any' type.
```
#### 6) `tsc-error`
- **Line:** 87
- **Snippet:**
```ts
 error TS18048: 'serviceZone' is possibly 'undefined'.
```
#### 7) `tsc-error`
- **Line:** 81
- **Snippet:**
```ts
 error TS7005: Variable 'mockMapper' implicitly has an 'any' type.
```
#### 8) `tsc-error`
- **Line:** 83
- **Snippet:**
```ts
 error TS2345: Argument of type 'ServiceZone | undefined' is not assignable to parameter of type 'ServiceZone'.
```
#### 9) `tsc-error`
- **Line:** 66
- **Snippet:**
```ts
 error TS18048: 'dsz' is possibly 'undefined'.
```
#### 10) `tsc-error`
- **Line:** 63
- **Snippet:**
```ts
 error TS2561: Object literal may only specify known properties, but 'geojson' does not exist in type 'ServiceZoneProps'. Did you mean to write 'geo_json'?
```
#### 11) `tsc-error`
- **Line:** 34
- **Snippet:**
```ts
 error TS2561: Object literal may only specify known properties, but 'geojson' does not exist in type 'ServiceZoneProps'. Did you mean to write 'geo_json'?
```
#### 12) `tsc-error`
- **Line:** 37
- **Snippet:**
```ts
 error TS7005: Variable 'mockMapper' implicitly has an 'any' type.
```

### `src/modules/__tests__/shipping-rate/prisma-shipping-rate.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ShippingRate'.
```

### `src/modules/__tests__/user/prisma-user.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 59
- **Snippet:**
```ts
 error TS2345: Argument of type 'User | undefined' is not assignable to parameter of type 'User'.
```
#### 2) `tsc-error`
- **Line:** 58
- **Snippet:**
```ts
 error TS18048: 'userEntity' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 55
- **Snippet:**
```ts
 error TS2345: Argument of type 'User | undefined' is not assignable to parameter of type 'User'.
```
#### 4) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS18048: 'userEntity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 60
- **Snippet:**
```ts
 error TS2345: Argument of type 'User | undefined' is not assignable to parameter of type 'User'.
```
#### 6) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/__tests__/vendor-outlet/prisma-vendor-outlet.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VendorOutlet'.
```

### `src/modules/__tests__/vendor/prisma-vendor.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 75
- **Snippet:**
```ts
 error TS2345: Argument of type 'Vendor | undefined' is not assignable to parameter of type 'Vendor'.
```
#### 2) `tsc-error`
- **Line:** 78
- **Snippet:**
```ts
 error TS2345: Argument of type 'Vendor | undefined' is not assignable to parameter of type 'Vendor'.
```
#### 3) `tsc-error`
- **Line:** 29
- **Snippet:**
```ts
 error TS18048: 'vendorEntity' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 81
- **Snippet:**
```ts
 error TS18048: 'vendorEntity' is possibly 'undefined'.
```

### `src/modules/address/application/use-cases/create-address.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS2345: Argument of type 'AddressCreationError | undefined' is not assignable to parameter of type 'string | undefined'.
```
#### 3) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```

### `src/modules/address/application/use-cases/list-addresses.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2307: Cannot find module '@/core/application/use-case' or its corresponding type declarations.
```

### `src/modules/address/application/use-cases/update-address.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedAddressResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'Address | undefined' is not assignable to parameter of type 'Address'.
```
#### 4) `error-message-passed`
- **Line:**         return failure(HttpError.badRequest(updatedAddressResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/address/domain/address.repository.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../core/domain/repository' or its corresponding type declarations.
```

### `src/modules/address/http/__tests__/address.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 50
- **Snippet:**
```ts
 error TS2322: Type 'Mock<Promise<Result<Address | undefined, Error>>, [dto: UpdateAddressDto & { id: string; }], any>' is not assignable to type '(dto: UpdateAddressDto & { id: string; }) => Promise<Result<AddressDto, HttpError>>'.
```
#### 2) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS2322: Type 'Mock<Promise<Result<Address | undefined, Error>>, [id: string], any>' is not assignable to type '(id: string) => Promise<Result<AddressDto, HttpError>>'.
```
#### 3) `tsc-error`
- **Line:** 18
- **Snippet:**
```ts
 error TS2322: Type 'Mock<Promise<Result<Address | undefined, Error>>, [dto: CreateAddressDto], any>' is not assignable to type '(dto: CreateAddressDto) => Promise<Result<AddressDto, HttpError>>'.
```
#### 4) `tsc-error`
- **Line:** 38
- **Snippet:**
```ts
 error TS2322: Type 'Mock<Promise<Result<(Address | undefined)[], Error>>, [], any>' is not assignable to type '() => Promise<Result<Address[], Error>>'.
```
#### 5) `tsc-error`
- **Line:** 62
- **Snippet:**
```ts
 error TS2322: Type 'Mock<Promise<Result<undefined, Error>>, [], any>' is not assignable to type '(id: string) => Promise<Result<void, HttpError>>'.
```

### `src/modules/address/http/__tests__/address.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```

### `src/modules/address/http/controller.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 20
- **Snippet:**
```ts
 error TS2345: Argument of type '{ street: string; city: string; state: string; zipCode: string; country: string; isResidential?: boolean | null | undefined; }' is not assignable to parameter of type 'CreateAddressDto'.
```
#### 2) `tsc-error`
- **Line:** 63
- **Snippet:**
```ts
 error TS2345: Argument of type '{ street?: string | undefined; city?: string | undefined; state?: string | undefined; zipCode?: string | undefined; country?: string | undefined; isResidential?: boolean | null | undefined; id: string; }' is not assignable to parameter of type 'UpdateAddressDto & { id: string; }'.
```

### `src/modules/address/infrastructure/address.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Address'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS2322: Type 'Address | undefined' is not assignable to type 'Address'.
```

### `src/modules/automation-log/application/dtos/automation-log.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2564: Property 'order_id' has no initializer and is not definitely assigned in the constructor.
```
#### 2) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2564: Property 'id' has no initializer and is not definitely assigned in the constructor.
```
#### 3) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS2564: Property 'executed_at' has no initializer and is not definitely assigned in the constructor.
```
#### 4) `tsc-error`
- **Line:** 6
- **Snippet:**
```ts
 error TS2564: Property 'message' has no initializer and is not definitely assigned in the constructor.
```
#### 5) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2564: Property 'status' has no initializer and is not definitely assigned in the constructor.
```
#### 6) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2564: Property 'action' has no initializer and is not definitely assigned in the constructor.
```

### `src/modules/automation-log/application/dtos/create-automation-log.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 14
- **Snippet:**
```ts
 error TS2564: Property 'message' has no initializer and is not definitely assigned in the constructor.
```
#### 2) `tsc-error`
- **Line:** 17
- **Snippet:**
```ts
 error TS2564: Property 'executed_at' has no initializer and is not definitely assigned in the constructor.
```
#### 3) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2564: Property 'status' has no initializer and is not definitely assigned in the constructor.
```
#### 4) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2564: Property 'order_id' has no initializer and is not definitely assigned in the constructor.
```
#### 5) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS2564: Property 'action' has no initializer and is not definitely assigned in the constructor.
```

### `src/modules/automation-log/application/use-cases/create-automation-log.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 16
- **Snippet:**
```ts
 error TS18048: 'automationLogResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/utils/result' or its corresponding type declarations.
```
#### 3) `tsc-error`
- **Line:** 6
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/errors/http-error' or its corresponding type declarations.
```
#### 4) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```
#### 5) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```
#### 6) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(automationLogResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/automation-log/application/use-cases/delete-automation-log.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/utils/result' or its corresponding type declarations.
```
#### 2) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/errors/http-error' or its corresponding type declarations.
```

### `src/modules/automation-log/application/use-cases/get-automation-log.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/errors/http-error' or its corresponding type declarations.
```
#### 2) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/utils/result' or its corresponding type declarations.
```

### `src/modules/automation-log/application/use-cases/update-automation-log.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedAutomationLogResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/utils/result' or its corresponding type declarations.
```
#### 4) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2307: Cannot find module '../../../../../core/errors/http-error' or its corresponding type declarations.
```
#### 5) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'AutomationLog | undefined' is not assignable to parameter of type 'AutomationLog'.
```
#### 6) `error-message-passed`
- **Line:**         return failure(HttpError.internalServerError(updatedAutomationLogResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/automation-log/infrastructure/automation-log.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 16
- **Snippet:**
```ts
 error TS2322: Type 'AutomationLog | undefined' is not assignable to type 'AutomationLog'.
```
#### 2) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'AutomationLog'.
```

### `src/modules/automation-log/presentation/http/__tests__/automation-log.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 44
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<(AutomationLog | undefined)[], HttpError>' is not assignable to parameter of type 'Result<AutomationLogDto[], HttpError>'.
```

### `src/modules/automation-log/presentation/http/__tests__/automation-log.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 13

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'OrderItem'.
```
#### 2) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS7031: Binding element 'max' implicitly has an 'any' type.
```
#### 3) `tsc-error`
- **Line:** 53
- **Snippet:**
```ts
 error TS2554: Expected 1-3 arguments, but got 0.
```

### `src/modules/courier/application/use-cases/create-courier.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 16
- **Snippet:**
```ts
 error TS2345: Argument of type 'CourierCreationError | undefined' is not assignable to parameter of type 'string | undefined'.
```
#### 2) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```
#### 3) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```

### `src/modules/courier/application/use-cases/update-courier.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedCourierResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'Courier | undefined' is not assignable to parameter of type 'Courier'.
```
#### 4) `error-message-passed`
- **Line:**         return failure(HttpError.internalServerError(updatedCourierResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/courier/http/__tests__/courier.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 7

#### 1) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```

### `src/modules/courier/http/controller.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 69
- **Snippet:**
```ts
 error TS2345: Argument of type '{ name?: string | undefined; phone?: string | undefined; email?: string | undefined; vehicle?: string | null | undefined; isAvailable?: boolean | undefined; }' is not assignable to parameter of type 'UpdateCourierDto'.
```
#### 2) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2345: Argument of type '{ name: string; phone: string; email: string; vehicle?: string | null | undefined; isAvailable?: boolean | undefined; }' is not assignable to parameter of type 'CreateCourierDto'.
```

### `src/modules/courier/http/routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 9
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/courier/infrastructure/courier.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Courier'.
```
#### 2) `tsc-error`
- **Line:** 12
- **Snippet:**
```ts
 error TS2322: Type 'string | null | undefined' is not assignable to type 'string | null'.
```
#### 3) `tsc-error`
- **Line:** 13
- **Snippet:**
```ts
 error TS2322: Type 'boolean | undefined' is not assignable to type 'boolean'.
```
#### 4) `tsc-error`
- **Line:** 34
- **Snippet:**
```ts
 error TS2322: Type 'Courier | undefined' is not assignable to type 'Courier'.
```

### `src/modules/customer-address/application/use-cases/create-customer-address.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 16
- **Snippet:**
```ts
 error TS18048: 'customerAddressResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | undefined' is not assignable to parameter of type 'CustomerAddress'.
```
#### 3) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'customerAddress' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | null' is not assignable to parameter of type 'CustomerAddress'.
```
#### 5) `error-message-passed`
- **Line:**       return failure(HttpError.badRequest(customerAddressResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/customer-address/application/use-cases/list-customer-addresses.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 12
- **Snippet:**
```ts
 error TS2416: Property 'execute' in type 'ListCustomerAddressesUseCase' is not assignable to the same property in base type 'UseCase<string, CustomerAddressDto[]>'.
```

### `src/modules/customer-address/application/use-cases/update-customer-address.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 32
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | null' is not assignable to parameter of type 'CustomerAddress'.
```
#### 2) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS18048: 'updatedCustomerAddress' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'CustomerAddress | undefined' is not assignable to parameter of type 'CustomerAddress'.
```
#### 4) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedCustomerAddressResult.error' is possibly 'undefined'.
```
#### 5) `error-message-passed`
- **Line:**         return failure(HttpError.badRequest(updatedCustomerAddressResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/customer-address/domain/customer-address.entity.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS2322: Type 'Address | undefined' is not assignable to type 'Address'.
```
#### 2) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS2322: Type 'boolean | undefined' is not assignable to type 'boolean'.
```

### `src/modules/customer-address/http/__tests__/customer-address.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```
#### 2) `tsc-error`
- **Line:** 81
- **Snippet:**
```ts
 error TS2322: Type 'Address | undefined' is not assignable to type 'Address'.
```
#### 3) `tsc-error`
- **Line:** 58
- **Snippet:**
```ts
 error TS2353: Object literal may only specify known properties, and 'is_active' does not exist in type 'IUserProps'.
```
#### 4) `tsc-error`
- **Line:** 95
- **Snippet:**
```ts
 error TS2322: Type 'CustomerAddress | undefined' is not assignable to type 'CustomerAddress'.
```
#### 5) `tsc-error`
- **Line:** 65
- **Snippet:**
```ts
 error TS2322: Type 'User | undefined' is not assignable to type 'User'.
```

### `src/modules/customer-address/http/controller.ts`
**Categories:** , tsc-error
**Occurrences:** 9

#### 1) `tsc-error`
- **Line:** 95
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 96
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 33
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 32
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 64
- **Snippet:**
```ts
 error TS2339: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
```
#### 6) `tsc-error`
- **Line:** 115
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 7) `tsc-error`
- **Line:** 116
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 8) `tsc-error`
- **Line:** 75
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 9) `tsc-error`
- **Line:** 74
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```

### `src/modules/customer-address/infrastructure/customer-address.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 17
- **Snippet:**
```ts
 error TS2322: Type 'CustomerAddress | undefined' is not assignable to type 'CustomerAddress'.
```
#### 2) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Address'.
```

### `src/modules/delivery-status/application/dtos/create-delivery-status.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2564: Property 'delivery_id' has no initializer and is not definitely assigned in the constructor.
```
#### 2) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS2564: Property 'status' has no initializer and is not definitely assigned in the constructor.
```

### `src/modules/delivery-status/application/use-cases/create-delivery-status.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 20
- **Snippet:**
```ts
 error TS18048: 'deliveryStatusResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryStatus | undefined' is not assignable to parameter of type 'DeliveryStatus'.
```
#### 3) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(deliveryStatusResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/delivery-status/application/use-cases/get-delivery-status.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2322: Type 'DeliveryStatus | null' is not assignable to type 'Result<DeliveryStatus | null, HttpError>'.
```

### `src/modules/delivery-status/application/use-cases/list-delivery-statuses.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2739: Type 'DeliveryStatus[]' is missing the following properties from type 'Result<DeliveryStatus[], HttpError>': success, isSuccess, isFailure
```

### `src/modules/delivery-status/application/use-cases/update-delivery-status.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS2345: Argument of type 'Error | undefined' is not assignable to parameter of type 'string | undefined'.
```
#### 2) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryStatus | undefined' is not assignable to parameter of type 'DeliveryStatus'.
```
#### 3) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryStatus | undefined' is not assignable to parameter of type 'DeliveryStatus'.
```

### `src/modules/delivery-status/http/__tests__/delivery-status.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 8

#### 1) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 3) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery-status/infrastructure/delivery-status.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DeliveryStatus'.
```

### `src/modules/delivery-status/infrastructure/prisma-delivery-status.repository.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 8

#### 1) `tsc-error`
- **Line:** 55
- **Snippet:**
```ts
 error TS2416: Property 'delete' in type 'PrismaDeliveryStatusRepository' is not assignable to the same property in base type 'IDeliveryStatusRepository'.
```
#### 2) `tsc-error`
- **Line:** 38
- **Snippet:**
```ts
 error TS2416: Property 'save' in type 'PrismaDeliveryStatusRepository' is not assignable to the same property in base type 'IDeliveryStatusRepository'.
```
#### 3) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2416: Property 'findById' in type 'PrismaDeliveryStatusRepository' is not assignable to the same property in base type 'IDeliveryStatusRepository'.
```
#### 4) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2416: Property 'findAll' in type 'PrismaDeliveryStatusRepository' is not assignable to the same property in base type 'IDeliveryStatusRepository'.
```
#### 5) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(error.message));
- **Snippet:**
```ts

```

### `src/modules/delivery-status/presentation/http/presenters/delivery-status.presenter.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 10
- **Snippet:**
```ts
 error TS2339: Property 'created_at' does not exist on type 'DeliveryStatus'.
```

### `src/modules/delivery-window/application/use-cases/create-delivery-window.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2322: Type 'Result<DeliveryWindow | undefined, HttpError>' is not assignable to type 'Result<DeliveryWindow, HttpError>'.
```
#### 2) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS18048: 'deliveryWindowResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow | undefined' is not assignable to parameter of type 'DeliveryWindow'.
```
#### 4) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(deliveryWindowResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/delivery-window/application/use-cases/update-delivery-window.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS18048: 'updatedDeliveryWindowResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow | undefined' is not assignable to parameter of type 'DeliveryWindow'.
```
#### 3) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2322: Type 'Result<DeliveryWindow | undefined, HttpError>' is not assignable to type 'Result<DeliveryWindow, HttpError>'.
```
#### 4) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(updatedDeliveryWindowResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/delivery-window/http/__tests__/delivery-window.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 12

#### 1) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2353: Object literal may only specify known properties, and 'id' does not exist in type 'DeliveryWindowProps'.
```
#### 2) `tsc-error`
- **Line:** 140
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<DeliveryWindow | undefined, HttpError>' is not assignable to parameter of type 'Result<DeliveryWindow, HttpError>'.
```
#### 3) `tsc-error`
- **Line:** 142
- **Snippet:**
```ts
 error TS18048: 'mockDeliveryWindow' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 162
- **Snippet:**
```ts
 error TS18048: 'mockDeliveryWindow' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 119
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<DeliveryWindow | undefined, HttpError>' is not assignable to parameter of type 'Result<DeliveryWindow, HttpError>'.
```
#### 6) `tsc-error`
- **Line:** 39
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow | undefined' is not assignable to parameter of type 'DeliveryWindow'.
```
#### 7) `tsc-error`
- **Line:** 135
- **Snippet:**
```ts
 error TS18048: 'mockDeliveryWindow' is possibly 'undefined'.
```
#### 8) `tsc-error`
- **Line:** 109
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<(DeliveryWindow | undefined)[], Error>' is not assignable to parameter of type 'Result<DeliveryWindow[], Error>'.
```
#### 9) `tsc-error`
- **Line:** 74
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<DeliveryWindow | undefined, HttpError>' is not assignable to parameter of type 'Result<DeliveryWindow, HttpError>'.
```
#### 10) `tsc-error`
- **Line:** 123
- **Snippet:**
```ts
 error TS18048: 'mockDeliveryWindow' is possibly 'undefined'.
```
#### 11) `tsc-error`
- **Line:** 120
- **Snippet:**
```ts
 error TS18048: 'mockDeliveryWindow' is possibly 'undefined'.
```

### `src/modules/delivery-window/http/__tests__/delivery-window.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ServiceZone'.
```

### `src/modules/delivery-window/http/controller.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 63
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow | undefined' is not assignable to parameter of type 'DeliveryWindow'.
```
#### 2) `tsc-error`
- **Line:** 40
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow[] | undefined' is not assignable to parameter of type 'DeliveryWindow[]'.
```
#### 3) `tsc-error`
- **Line:** 51
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow | undefined' is not assignable to parameter of type 'DeliveryWindow'.
```
#### 4) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'DeliveryWindow | undefined' is not assignable to parameter of type 'DeliveryWindow'.
```

### `src/modules/delivery-window/infrastructure/delivery-window.mapper.ts`
**Categories:** , legacy-success-guard, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 29
- **Snippet:**
```ts
 error TS2322: Type 'DeliveryWindow | undefined' is not assignable to type 'DeliveryWindow'.
```
#### 2) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DeliveryWindow'.
```
#### 3) `legacy-success-guard`
- **Line:**     if (result.success) {
- **Snippet:**
```ts

```

### `src/modules/delivery-window/presentation/mappers/delivery-window.mapper.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DeliveryWindow'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS2322: Type 'DeliveryWindow | undefined' is not assignable to type 'DeliveryWindow'.
```
#### 3) `error-message-passed`
- **Line:**       throw new Error(result.error.message);
- **Snippet:**
```ts

```

### `src/modules/delivery/application/dtos/create-delivery.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/application/dtos/delivery.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/application/dtos/update-delivery.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/application/use-cases/create-delivery.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2345: Argument of type 'Delivery | undefined' is not assignable to parameter of type 'Delivery'.
```
#### 2) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS2345: Argument of type 'Delivery | undefined' is not assignable to parameter of type 'Delivery'.
```
#### 3) `tsc-error`
- **Line:** 20
- **Snippet:**
```ts
 error TS2345: Argument of type 'Error | undefined' is not assignable to parameter of type 'string | undefined'.
```

### `src/modules/delivery/application/use-cases/update-delivery.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 32
- **Snippet:**
```ts
 error TS2345: Argument of type 'Delivery | undefined' is not assignable to parameter of type 'Delivery'.
```
#### 2) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'Delivery | undefined' is not assignable to parameter of type 'Delivery'.
```
#### 3) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS18048: 'updatedDeliveryResult.error' is possibly 'undefined'.
```
#### 4) `error-message-passed`
- **Line:**         HttpError.internalServerError(updatedDeliveryResult.error.message),
- **Snippet:**
```ts

```

### `src/modules/delivery/domain/delivery.entity.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/http/__tests__/delivery.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/http/__tests__/delivery.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/http/controller.ts`
**Categories:** , tsc-error
**Occurrences:** 10

#### 1) `tsc-error`
- **Line:** 69
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 68
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 36
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 37
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 84
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 6) `tsc-error`
- **Line:** 83
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 7) `tsc-error`
- **Line:** 102
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 8) `tsc-error`
- **Line:** 103
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 9) `tsc-error`
- **Line:** 56
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```
#### 10) `tsc-error`
- **Line:** 55
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```

### `src/modules/delivery/http/dto/create-delivery.schema.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/http/dto/update-delivery.schema.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/infrastructure/__tests__/delivery/prisma-delivery.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 71
- **Snippet:**
```ts
 error TS18048: 'deliveryEntity' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 67
- **Snippet:**
```ts
 error TS2345: Argument of type 'Delivery | undefined' is not assignable to parameter of type 'Delivery'.
```
#### 3) `tsc-error`
- **Line:** 66
- **Snippet:**
```ts
 error TS2345: Argument of type 'Delivery | undefined' is not assignable to parameter of type 'Delivery'.
```
#### 4) `tsc-error`
- **Line:** 6
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```
#### 5) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```
#### 6) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS18048: 'deliveryEntity' is possibly 'undefined'.
```

### `src/modules/delivery/infrastructure/__tests__/prisma-delivery.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```

### `src/modules/delivery/infrastructure/delivery.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```
#### 2) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS2322: Type 'Delivery | undefined' is not assignable to type 'Delivery'.
```

### `src/modules/driver-location/application/use-cases/create-driver-location.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(driverLocationResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/driver-location/http/__tests__/driver-location.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 104
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocation, Error>'.
```
#### 2) `tsc-error`
- **Line:** 45
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocation, Error>'.
```

### `src/modules/driver-location/http/__tests__/driver-location.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 8

#### 1) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VehicleType'.
```
#### 3) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```

### `src/modules/driver-location/http/controller.ts`
**Categories:** , tsc-error
**Occurrences:** 12

#### 1) `tsc-error`
- **Line:** 61
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocationDto, HttpError>'.
```
#### 2) `tsc-error`
- **Line:** 60
- **Snippet:**
```ts
 error TS2551: Property 'isSuccess' does not exist on type 'Result<DriverLocationDto, HttpError>'. Did you mean 'success'?
```
#### 3) `tsc-error`
- **Line:** 63
- **Snippet:**
```ts
 error TS2339: Property 'error' does not exist on type 'Result<DriverLocationDto, HttpError>'.
```
#### 4) `tsc-error`
- **Line:** 41
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocationDto | null, HttpError>'.
```
#### 5) `tsc-error`
- **Line:** 40
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocationDto | null, HttpError>'.
```
#### 6) `tsc-error`
- **Line:** 46
- **Snippet:**
```ts
 error TS2339: Property 'error' does not exist on type 'Result<DriverLocationDto | null, HttpError>'.
```
#### 7) `tsc-error`
- **Line:** 39
- **Snippet:**
```ts
 error TS2551: Property 'isSuccess' does not exist on type 'Result<DriverLocationDto | null, HttpError>'. Did you mean 'success'?
```
#### 8) `tsc-error`
- **Line:** 77
- **Snippet:**
```ts
 error TS2339: Property 'error' does not exist on type 'Result<void, HttpError>'.
```
#### 9) `tsc-error`
- **Line:** 74
- **Snippet:**
```ts
 error TS2551: Property 'isSuccess' does not exist on type 'Result<void, HttpError>'. Did you mean 'success'?
```
#### 10) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2551: Property 'isSuccess' does not exist on type 'Result<DriverLocationDto, HttpError>'. Did you mean 'success'?
```
#### 11) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocationDto, HttpError>'.
```
#### 12) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2339: Property 'error' does not exist on type 'Result<DriverLocationDto, HttpError>'.
```

### `src/modules/driver-location/infrastructure/driver-location.mapper.ts`
**Categories:** , legacy-success-guard, tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DriverLocation'.
```
#### 2) `legacy-success-guard`
- **Line:**     if (result.success) {
- **Snippet:**
```ts

```

### `src/modules/driver-location/presentation/mappers/driver-location.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DriverLocation'.
```
#### 2) `tsc-error`
- **Line:** 34
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Result<DriverLocation, Error>'.
```
#### 3) `tsc-error`
- **Line:** 36
- **Snippet:**
```ts
 error TS2339: Property 'error' does not exist on type 'Result<DriverLocation, Error>'.
```
#### 4) `tsc-error`
- **Line:** 33
- **Snippet:**
```ts
 error TS2551: Property 'isSuccess' does not exist on type 'Result<DriverLocation, Error>'. Did you mean 'success'?
```

### `src/modules/notification/application/use-cases/create-notification.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 2) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 3) `tsc-error`
- **Line:** 20
- **Snippet:**
```ts
 error TS18048: 'notificationResult.error' is possibly 'undefined'.
```
#### 4) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(notificationResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/notification/application/use-cases/delete-notification.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 22
- **Snippet:**
```ts
 error TS2322: Type 'Notification | null' is not assignable to type 'Result<null, HttpError>'.
```
#### 2) `tsc-error`
- **Line:** 13
- **Snippet:**
```ts
 error TS2339: Property 'isSuccess' does not exist on type 'Notification'.
```
#### 3) `tsc-error`
- **Line:** 14
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Notification'.
```

### `src/modules/notification/application/use-cases/get-notification.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 7

#### 1) `tsc-error`
- **Line:** 17
- **Snippet:**
```ts
 error TS2339: Property 'isSuccess' does not exist on type 'Notification'.
```
#### 2) `tsc-error`
- **Line:** 18
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Notification'.
```
#### 3) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2322: Type 'Notification | null' is not assignable to type 'Result<NotificationDto | null, HttpError>'.
```
#### 4) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Notification'.
```

### `src/modules/notification/application/use-cases/update-notification.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 11

#### 1) `tsc-error`
- **Line:** 20
- **Snippet:**
```ts
 error TS2339: Property 'isSuccess' does not exist on type 'Notification'.
```
#### 2) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Notification'.
```
#### 3) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Notification'.
```
#### 4) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2339: Property 'value' does not exist on type 'Notification'.
```
#### 5) `tsc-error`
- **Line:** 43
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 6) `tsc-error`
- **Line:** 41
- **Snippet:**
```ts
 error TS2345: Argument of type 'Notification | undefined' is not assignable to parameter of type 'Notification'.
```
#### 7) `tsc-error`
- **Line:** 46
- **Snippet:**
```ts
 error TS2322: Type 'Notification | null' is not assignable to type 'Result<NotificationDto, HttpError>'.
```

### `src/modules/notification/infrastructure/notification.mapper.ts`
**Categories:** , legacy-success-guard, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2322: Type 'Notification | undefined' is not assignable to type 'Notification'.
```
#### 2) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Notification'.
```
#### 3) `legacy-success-guard`
- **Line:**     if (result.success) {
- **Snippet:**
```ts

```

### `src/modules/notification/infrastructure/prisma-notification.repository.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 8

#### 1) `tsc-error`
- **Line:** 22
- **Snippet:**
```ts
 error TS2416: Property 'findAll' in type 'PrismaNotificationRepository' is not assignable to the same property in base type 'INotificationRepository'.
```
#### 2) `tsc-error`
- **Line:** 45
- **Snippet:**
```ts
 error TS2416: Property 'delete' in type 'PrismaNotificationRepository' is not assignable to the same property in base type 'INotificationRepository'.
```
#### 3) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2416: Property 'findById' in type 'PrismaNotificationRepository' is not assignable to the same property in base type 'INotificationRepository'.
```
#### 4) `tsc-error`
- **Line:** 31
- **Snippet:**
```ts
 error TS2416: Property 'save' in type 'PrismaNotificationRepository' is not assignable to the same property in base type 'INotificationRepository'.
```
#### 5) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(error.message));
- **Snippet:**
```ts

```

### `src/modules/notification/presentation/http/__tests__/notification.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 46
- **Snippet:**
```ts
 error TS2345: Argument of type '{ success: true; value: any; }' is not assignable to parameter of type 'Result<NotificationDto, HttpError> | Promise<Result<NotificationDto, HttpError>>'.
```
#### 2) `tsc-error`
- **Line:** 98
- **Snippet:**
```ts
 error TS2345: Argument of type '{ success: true; value: any; }' is not assignable to parameter of type 'Result<NotificationDto | null, HttpError> | Promise<Result<NotificationDto | null, HttpError>>'.
```
#### 3) `tsc-error`
- **Line:** 141
- **Snippet:**
```ts
 error TS2345: Argument of type '{ success: true; value: undefined; }' is not assignable to parameter of type 'Result<null, HttpError> | Promise<Result<null, HttpError>>'.
```
#### 4) `tsc-error`
- **Line:** 72
- **Snippet:**
```ts
 error TS2345: Argument of type '{ success: true; value: any; }' is not assignable to parameter of type 'Result<NotificationDto, HttpError> | Promise<Result<NotificationDto, HttpError>>'.
```
#### 5) `tsc-error`
- **Line:** 122
- **Snippet:**
```ts
 error TS2345: Argument of type '{ success: true; value: any; }' is not assignable to parameter of type 'Result<NotificationDto, HttpError> | Promise<Result<NotificationDto, HttpError>>'.
```

### `src/modules/notification/presentation/http/__tests__/notification.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 8

#### 1) `tsc-error`
- **Line:** 9
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 3) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'User'.
```

### `src/modules/notification/presentation/http/notification.controller.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 47
- **Snippet:**
```ts
 error TS18048: 'result.error' is possibly 'undefined'.
```

### `src/modules/order-promotion/__tests__/order-promotion.usecase.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'User'.
```

### `src/modules/order-promotion/application/use-cases/create-order-promotion.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 19
- **Snippet:**
```ts
 error TS18048: 'orderPromotionResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderPromotion | undefined' is not assignable to parameter of type 'OrderPromotion'.
```
#### 3) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(orderPromotionResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/order-promotion/application/use-cases/update-order-promotion.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderPromotion | undefined' is not assignable to parameter of type 'OrderPromotion'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedOrderPromotionResult.error' is possibly 'undefined'.
```
#### 3) `error-message-passed`
- **Line:**         return failure(HttpError.internalServerError(updatedOrderPromotionResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/order-promotion/infrastructure/order-promotion.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 18
- **Snippet:**
```ts
 error TS18048: 'orderPromotionResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 20
- **Snippet:**
```ts
 error TS2322: Type 'OrderPromotion | undefined' is not assignable to type 'OrderPromotion'.
```
#### 3) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'OrderPromotion'.
```

### `src/modules/order-promotion/presentation/http/__tests__/order-promotion.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```

### `src/modules/order-promotion/presentation/http/__tests__/order-promotion.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/order-promotion/presentation/http/order-promotion.routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/order/application/use-cases/create-order.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 45
- **Snippet:**
```ts
 error TS2322: Type 'Result<Order | undefined, HttpError>' is not assignable to type 'Result<Order, HttpError>'.
```
#### 2) `tsc-error`
- **Line:** 43
- **Snippet:**
```ts
 error TS2345: Argument of type 'Order | undefined' is not assignable to parameter of type 'Order'.
```
#### 3) `tsc-error`
- **Line:** 34
- **Snippet:**
```ts
 error TS2322: Type 'OrderItem[] | undefined' is not assignable to type 'OrderItem[]'.
```
#### 4) `tsc-error`
- **Line:** 39
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderCreationError | undefined' is not assignable to parameter of type 'string | undefined'.
```
#### 5) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2345: Argument of type 'OrderCreationError | undefined' is not assignable to parameter of type 'string | undefined'.
```
#### 6) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS18048: 'orderItems' is possibly 'undefined'.
```

### `src/modules/order/application/use-cases/update-order.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS2322: Type 'Result<Order | undefined, HttpError>' is not assignable to type 'Result<Order, HttpError>'.
```
#### 2) `tsc-error`
- **Line:** 33
- **Snippet:**
```ts
 error TS2345: Argument of type 'Order | undefined' is not assignable to parameter of type 'Order'.
```
#### 3) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS18048: 'updatedOrderResult.error' is possibly 'undefined'.
```
#### 4) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(updatedOrderResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/order/infrastructure/__tests__/prisma-order.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Product'.
```
#### 2) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'OrderStatus'.
```

### `src/modules/order/infrastructure/order.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 37
- **Snippet:**
```ts
 error TS2322: Type 'unknown[] | undefined' is not assignable to type 'OrderItem[]'.
```
#### 2) `tsc-error`
- **Line:** 49
- **Snippet:**
```ts
 error TS2322: Type 'Order | undefined' is not assignable to type 'Order'.
```
#### 3) `tsc-error`
- **Line:** 19
- **Snippet:**
```ts
 error TS7006: Parameter 'item' implicitly has an 'any' type.
```
#### 4) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'OrderStatus'.
```

### `src/modules/order/infrastructure/prisma-order.repository.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 59
- **Snippet:**
```ts
 error TS7006: Parameter 'tx' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 31
- **Snippet:**
```ts
 error TS7006: Parameter 'tx' implicitly has an 'any' type.
```

### `src/modules/order/presentation/http/__tests__/order.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 7

#### 1) `tsc-error`
- **Line:** 79
- **Snippet:**
```ts
 error TS2322: Type 'OrderItem | undefined' is not assignable to type 'OrderItem'.
```
#### 2) `tsc-error`
- **Line:** 155
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<Order | undefined, HttpError>' is not assignable to parameter of type 'Result<Order, HttpError>'.
```
#### 3) `tsc-error`
- **Line:** 108
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<Order | undefined, HttpError>' is not assignable to parameter of type 'Result<Order, HttpError>'.
```
#### 4) `tsc-error`
- **Line:** 92
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<Order | undefined, HttpError>' is not assignable to parameter of type 'Result<Order, HttpError>'.
```
#### 5) `tsc-error`
- **Line:** 130
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<Order | undefined, HttpError>' is not assignable to parameter of type 'Result<Order, HttpError>'.
```
#### 6) `tsc-error`
- **Line:** 119
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<(Order | undefined)[], HttpError>' is not assignable to parameter of type 'Result<Order[], HttpError>'.
```
#### 7) `tsc-error`
- **Line:** 166
- **Snippet:**
```ts
 error TS2345: Argument of type 'Result<Order | undefined, HttpError>' is not assignable to parameter of type 'Result<Order, HttpError>'.
```

### `src/modules/order/presentation/http/__tests__/order.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'OrderStatus'.
```

### `src/modules/payment/application/dtos/payment.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```

### `src/modules/payment/application/dtos/update-payment.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```

### `src/modules/payment/application/use-cases/create-payment.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 44
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 2) `tsc-error`
- **Line:** 42
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 3) `tsc-error`
- **Line:** 37
- **Snippet:**
```ts
 error TS18048: 'paymentResult.error' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentMethod'.
```
#### 5) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(paymentResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/payment/application/use-cases/update-payment.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedPaymentResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 4) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(updatedPaymentResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/payment/application/use-cases/verify-payment.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```

### `src/modules/payment/domain/payment.entity.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```

### `src/modules/payment/infrastructure/__tests__/prisma-payment.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```

### `src/modules/payment/infrastructure/payment.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2322: Type 'Payment | undefined' is not assignable to type 'Payment'.
```
#### 2) `tsc-error`
- **Line:** 26
- **Snippet:**
```ts
 error TS18048: 'paymentResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```
#### 4) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentMethod'.
```
#### 5) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Payment'.
```

### `src/modules/payment/presentation/http/__tests__/payment.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 77
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 2) `tsc-error`
- **Line:** 60
- **Snippet:**
```ts
 error TS2345: Argument of type 'Payment | undefined' is not assignable to parameter of type 'Payment'.
```
#### 3) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'PaymentStatus'.
```

### `src/modules/payment/presentation/http/__tests__/payment.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 12

#### 1) `tsc-error`
- **Line:** 7
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'OrderStatus'.
```
#### 3) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```

### `src/modules/product-image/application/use-cases/create-product-image.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 29
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 2) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS18048: 'productImageResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 4) `tsc-error`
- **Line:** 32
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProductImage, HttpError>' is not assignable to type 'Result<ProductImageDto, HttpError>'.
```
#### 5) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2307: Cannot find module '../dtos/create-product-image.dto' or its corresponding type declarations.
```
#### 6) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(productImageResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/product-image/application/use-cases/find-all-product-image.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProductImage[], HttpError>' is not assignable to type 'Result<ProductImageDto[], HttpError>'.
```

### `src/modules/product-image/application/use-cases/get-product-image.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProductImage | null, HttpError>' is not assignable to type 'Result<ProductImageDto | null, HttpError>'.
```

### `src/modules/product-image/application/use-cases/update-product-image.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 7

#### 1) `tsc-error`
- **Line:** 39
- **Snippet:**
```ts
 error TS18048: 'updatedImageResult.error' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 49
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProductImage, HttpError>' is not assignable to type 'Result<ProductImageDto, HttpError>'.
```
#### 3) `tsc-error`
- **Line:** 45
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 4) `tsc-error`
- **Line:** 6
- **Snippet:**
```ts
 error TS2307: Cannot find module '../dtos/update-product-image.dto' or its corresponding type declarations.
```
#### 5) `tsc-error`
- **Line:** 19
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProductImage | null, HttpError>' is not assignable to type 'Result<ProductImageDto, HttpError>'.
```
#### 6) `tsc-error`
- **Line:** 52
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 7) `error-message-passed`
- **Line:**         HttpError.internalServerError(updatedImageResult.error.message),
- **Snippet:**
```ts

```

### `src/modules/product-image/infrastructure/prisma-product-image.repository.ts`
**Categories:** , error-message-passed
**Occurrences:** 6

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(error.message));
- **Snippet:**
```ts

```

### `src/modules/product-image/infrastructure/product-image.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 16
- **Snippet:**
```ts
 error TS2322: Type 'ProductImage | undefined' is not assignable to type 'ProductImage'.
```
#### 2) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ProductImage'.
```

### `src/modules/product-image/presentation/http/__tests__/product-image.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 8

#### 1) `tsc-error`
- **Line:** 111
- **Snippet:**
```ts
 error TS18048: 'productImage' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 89
- **Snippet:**
```ts
 error TS18048: 'productImage' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 114
- **Snippet:**
```ts
 error TS18048: 'productImage' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 81
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 5) `tsc-error`
- **Line:** 167
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 6) `tsc-error`
- **Line:** 107
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 7) `tsc-error`
- **Line:** 130
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProductImage | undefined' is not assignable to parameter of type 'ProductImage'.
```
#### 8) `tsc-error`
- **Line:** 137
- **Snippet:**
```ts
 error TS18048: 'productImage' is possibly 'undefined'.
```

### `src/modules/product-image/presentation/http/__tests__/product-image.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 15

#### 1) `tsc-error`
- **Line:** 68
- **Snippet:**
```ts
 error TS2353: Object literal may only specify known properties, and 'product_id' does not exist in type '{ body: { product_id: string; url: string; sort_order?: number | undefined; }; }'.
```
#### 2) `tsc-error`
- **Line:** 10
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 3) `tsc-error`
- **Line:** 121
- **Snippet:**
```ts
 error TS2353: Object literal may only specify known properties, and 'url' does not exist in type '{ body: { product_id?: string | undefined; url?: string | undefined; sort_order?: number | undefined; }; }'.
```
#### 4) `tsc-error`
- **Line:** 129
- **Snippet:**
```ts
 error TS2339: Property 'url' does not exist on type '{ body: { product_id?: string | undefined; url?: string | undefined; sort_order?: number | undefined; }; }'.
```
#### 5) `tsc-error`
- **Line:** 78
- **Snippet:**
```ts
 error TS2339: Property 'url' does not exist on type '{ body: { product_id: string; url: string; sort_order?: number | undefined; }; }'.
```
#### 6) `tsc-error`
- **Line:** 77
- **Snippet:**
```ts
 error TS2339: Property 'product_id' does not exist on type '{ body: { product_id: string; url: string; sort_order?: number | undefined; }; }'.
```
#### 7) `tsc-error`
- **Line:** 9
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 8) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ProductImage'.
```

### `src/modules/product/application/use-cases/create-product.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 31
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 2) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS18048: 'productResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 29
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 4) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(productResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/product/application/use-cases/update-product.usecase.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 2) `tsc-error`
- **Line:** 23
- **Snippet:**
```ts
 error TS18048: 'updatedProductResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 30
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 4) `error-message-passed`
- **Line:**         return failure(HttpError.internalServerError(updatedProductResult.error.message));
- **Snippet:**
```ts

```

### `src/modules/product/infrastructure/__tests__/product/prisma-product.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 68
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 2) `tsc-error`
- **Line:** 73
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 3) `tsc-error`
- **Line:** 72
- **Snippet:**
```ts
 error TS2345: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'.
```
#### 4) `tsc-error`
- **Line:** 71
- **Snippet:**
```ts
 error TS18048: 'productEntity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 27
- **Snippet:**
```ts
 error TS18048: 'productEntity' is possibly 'undefined'.
```

### `src/modules/product/infrastructure/product.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Product'.
```
#### 2) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS18048: 'productResult.error' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 24
- **Snippet:**
```ts
 error TS2322: Type 'Product | undefined' is not assignable to type 'Product'.
```

### `src/modules/product/presentation/http/__tests__/product.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 91
- **Snippet:**
```ts
 error TS18048: 'product' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 88
- **Snippet:**
```ts
 error TS18048: 'product' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 104
- **Snippet:**
```ts
 error TS18048: 'product' is possibly 'undefined'.
```

### `src/modules/product/presentation/http/__tests__/product.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/product/presentation/http/routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/promotion/application/use-cases/create-promotion.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 25
- **Snippet:**
```ts
 error TS18048: 'promotion' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 35
- **Snippet:**
```ts
 error TS2345: Argument of type 'Promotion | undefined' is not assignable to parameter of type 'Promotion'.
```
#### 3) `tsc-error`
- **Line:** 41
- **Snippet:**
```ts
 error TS2322: Type 'Result<Promotion | undefined, Error>' is not assignable to type 'Result<Promotion, Error>'.
```

### `src/modules/promotion/application/use-cases/update-promotion.usecase.ts`
**Categories:** , tsc-error
**Occurrences:** 5

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```
#### 2) `tsc-error`
- **Line:** 59
- **Snippet:**
```ts
 error TS2322: Type 'Result<Promotion | undefined, Error>' is not assignable to type 'Result<Promotion, Error>'.
```
#### 3) `tsc-error`
- **Line:** 31
- **Snippet:**
```ts
 error TS18048: 'promotion' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 49
- **Snippet:**
```ts
 error TS2345: Argument of type 'Promotion | undefined' is not assignable to parameter of type 'Promotion'.
```
#### 5) `tsc-error`
- **Line:** 43
- **Snippet:**
```ts
 error TS18048: 'promotion' is possibly 'undefined'.
```

### `src/modules/promotion/domain/promotion.entity.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```

### `src/modules/promotion/infrastructure/mappers/promotion.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Promotion'.
```

### `src/modules/promotion/infrastructure/prisma-promotion.repository.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 51
- **Snippet:**
```ts
 error TS2322: Type 'Result<unknown[] | undefined, Error>' is not assignable to type 'Result<Promotion[], Error>'.
```
#### 2) `tsc-error`
- **Line:** 37
- **Snippet:**
```ts
 error TS2322: Type 'Result<Promotion | undefined, Error>' is not assignable to type 'Result<Promotion, Error>'.
```
#### 3) `tsc-error`
- **Line:** 65
- **Snippet:**
```ts
 error TS2322: Type 'Result<Promotion | undefined, Error>' is not assignable to type 'Result<Promotion, Error>'.
```
#### 4) `tsc-error`
- **Line:** 21
- **Snippet:**
```ts
 error TS2322: Type 'Result<Promotion | undefined, Error>' is not assignable to type 'Result<Promotion, Error>'.
```

### `src/modules/promotion/infrastructure/promotion.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```

### `src/modules/promotion/presentation/http/__tests__/promotion.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 5
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```

### `src/modules/promotion/presentation/http/__tests__/promotion.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 4
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```

### `src/modules/promotion/presentation/http/dto/create-promotion.schema.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```

### `src/modules/promotion/presentation/http/dto/update-promotion.schema.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
```

### `src/modules/proof-of-delivery/infrastructure/__tests__/prisma-proof-of-delivery.repository.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 103
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProofOfDelivery | undefined' is not assignable to parameter of type 'Partial<ProofOfDelivery>'.
```
#### 2) `tsc-error`
- **Line:** 41
- **Snippet:**
```ts
 error TS2345: Argument of type 'ProofOfDelivery | undefined' is not assignable to parameter of type 'ProofOfDelivery'.
```

### `src/modules/proof-of-delivery/infrastructure/prisma-proof-of-delivery.repository.ts`
**Categories:** , tsc-error
**Occurrences:** 14

#### 1) `tsc-error`
- **Line:** 63
- **Snippet:**
```ts
 error TS2345: Argument of type 'Error | undefined' is not assignable to parameter of type 'Error'.
```
#### 2) `tsc-error`
- **Line:** 65
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProofOfDelivery | undefined, Error>' is not assignable to type 'Result<ProofOfDelivery, Error>'.
```
#### 3) `tsc-error`
- **Line:** 67
- **Snippet:**
```ts
 error TS18046: 'error' is of type 'unknown'.
```
#### 4) `tsc-error`
- **Line:** 101
- **Snippet:**
```ts
 error TS18046: 'error' is of type 'unknown'.
```
#### 5) `tsc-error`
- **Line:** 32
- **Snippet:**
```ts
 error TS2345: Argument of type 'Error | undefined' is not assignable to parameter of type 'Error'.
```
#### 6) `tsc-error`
- **Line:** 36
- **Snippet:**
```ts
 error TS18046: 'error' is of type 'unknown'.
```
#### 7) `tsc-error`
- **Line:** 34
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProofOfDelivery | undefined, Error>' is not assignable to type 'Result<ProofOfDelivery, Error>'.
```
#### 8) `tsc-error`
- **Line:** 99
- **Snippet:**
```ts
 error TS2322: Type 'Result<ProofOfDelivery | undefined, Error>' is not assignable to type 'Result<ProofOfDelivery, Error>'.
```
#### 9) `tsc-error`
- **Line:** 97
- **Snippet:**
```ts
 error TS2345: Argument of type 'Error | undefined' is not assignable to parameter of type 'Error'.
```
#### 10) `tsc-error`
- **Line:** 113
- **Snippet:**
```ts
 error TS18046: 'error' is of type 'unknown'.
```

### `src/modules/proof-of-delivery/infrastructure/proof-of-delivery.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ProofOfDelivery'.
```
#### 2) `tsc-error`
- **Line:** 33
- **Snippet:**
```ts
 error TS2694: Namespace '"/app/node_modules/.prisma/client/default".Prisma' has no exported member 'ProofOfDeliveryCreateInput'.
```

### `src/modules/proof-of-delivery/presentation/http/__tests__/proof-of-delivery.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/proof-of-delivery/presentation/http/routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 8
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/service-zone/infrastructure/service-zone.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 28
- **Snippet:**
```ts
 error TS2694: Namespace '"/app/node_modules/.prisma/client/default".Prisma' has no exported member 'ServiceZoneCreateInput'.
```
#### 2) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ServiceZone'.
```

### `src/modules/shipping-rate/application/use-cases/create-shipping-rate.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(shippingRateResult.error?.message));
- **Snippet:**
```ts

```

### `src/modules/shipping-rate/application/use-cases/update-shipping-rate.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(updatedShippingRateResult.error?.message));
- **Snippet:**
```ts

```

### `src/modules/shipping-rate/infrastructure/shipping-rate.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ShippingRate'.
```

### `src/modules/shipping-rate/presentation/http/__tests__/shipping-rate.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 6

#### 1) `tsc-error`
- **Line:** 159
- **Snippet:**
```ts
 error TS18048: 'entity' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 131
- **Snippet:**
```ts
 error TS18048: 'entity' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 132
- **Snippet:**
```ts
 error TS18048: 'entity' is possibly 'undefined'.
```
#### 4) `tsc-error`
- **Line:** 160
- **Snippet:**
```ts
 error TS18048: 'entity' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 93
- **Snippet:**
```ts
 error TS18048: 'entity' is possibly 'undefined'.
```
#### 6) `tsc-error`
- **Line:** 94
- **Snippet:**
```ts
 error TS18048: 'entity' is possibly 'undefined'.
```

### `src/modules/shipping-rate/presentation/http/__tests__/shipping-rate.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'ShippingRate'.
```

### `src/modules/shipping-rate/presentation/http/shipping-rate.routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 9
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/user/application/dtos/create-user.dto.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/user/application/use-cases/create-user.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(userResult.error?.message));
- **Snippet:**
```ts

```

### `src/modules/user/domain/user.entity.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 3
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/user/http/__tests__/user.controller.spec.ts`
**Categories:** , error-message-passed, tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```
#### 2) `error-message-passed`
- **Line:**       expect(response.body.message).toBe('Not found');
- **Snippet:**
```ts

```
#### 3) `error-message-passed`
- **Line:**       expect(response.body.message).toBe('Creation failed');
- **Snippet:**
```ts

```

### `src/modules/user/http/dto/create-user.schema.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 2
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/user/infrastructure/user.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 2

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/user/presentation/http/__tests__/user.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 14
- **Snippet:**
```ts
 error TS7006: Parameter 'next' implicitly has an 'any' type.
```
#### 2) `tsc-error`
- **Line:** 11
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/vendor-outlet/application/use-cases/create-vendor-outlet.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(new VendorOutletCreationError(error.message));
- **Snippet:**
```ts

```

### `src/modules/vendor-outlet/application/use-cases/delete-vendor-outlet.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(new Error(error.message));
- **Snippet:**
```ts

```

### `src/modules/vendor-outlet/application/use-cases/get-vendor-outlet.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(new Error(error.message));
- **Snippet:**
```ts

```

### `src/modules/vendor-outlet/application/use-cases/list-vendor-outlets.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(new Error(error.message));
- **Snippet:**
```ts

```

### `src/modules/vendor-outlet/application/use-cases/update-vendor-outlet.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(new Error(error.message));
- **Snippet:**
```ts

```

### `src/modules/vendor-outlet/http/__tests__/vendor-outlet.controller.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 15

#### 1) `tsc-error`
- **Line:** 172
- **Snippet:**
```ts
 error TS18048: 'vendor' is possibly 'undefined'.
```
#### 2) `tsc-error`
- **Line:** 128
- **Snippet:**
```ts
 error TS2345: Argument of type 'VendorOutlet | undefined' is not assignable to parameter of type 'VendorOutlet'.
```
#### 3) `tsc-error`
- **Line:** 95
- **Snippet:**
```ts
 error TS2345: Argument of type 'Vendor | undefined' is not assignable to parameter of type 'Vendor'.
```
#### 4) `tsc-error`
- **Line:** 98
- **Snippet:**
```ts
 error TS18048: 'vendor' is possibly 'undefined'.
```
#### 5) `tsc-error`
- **Line:** 186
- **Snippet:**
```ts
 error TS18048: 'vendor' is possibly 'undefined'.
```
#### 6) `tsc-error`
- **Line:** 185
- **Snippet:**
```ts
 error TS18048: 'outlet' is possibly 'undefined'.
```
#### 7) `tsc-error`
- **Line:** 181
- **Snippet:**
```ts
 error TS2345: Argument of type 'VendorOutlet | undefined' is not assignable to parameter of type 'VendorOutlet'.
```
#### 8) `tsc-error`
- **Line:** 107
- **Snippet:**
```ts
 error TS2345: Argument of type 'VendorOutlet | undefined' is not assignable to parameter of type 'VendorOutlet'.
```
#### 9) `tsc-error`
- **Line:** 109
- **Snippet:**
```ts
 error TS18048: 'outlet' is possibly 'undefined'.
```
#### 10) `tsc-error`
- **Line:** 150
- **Snippet:**
```ts
 error TS2345: Argument of type 'VendorOutlet | undefined' is not assignable to parameter of type 'VendorOutlet'.
```
#### 11) `tsc-error`
- **Line:** 152
- **Snippet:**
```ts
 error TS18048: 'outlet' is possibly 'undefined'.
```
#### 12) `tsc-error`
- **Line:** 169
- **Snippet:**
```ts
 error TS2345: Argument of type 'Vendor | undefined' is not assignable to parameter of type 'Vendor'.
```
#### 13) `tsc-error`
- **Line:** 130
- **Snippet:**
```ts
 error TS18048: 'outlet' is possibly 'undefined'.
```
#### 14) `tsc-error`
- **Line:** 111
- **Snippet:**
```ts
 error TS18048: 'outlet' is possibly 'undefined'.
```
#### 15) `tsc-error`
- **Line:** 112
- **Snippet:**
```ts
 error TS18048: 'vendor' is possibly 'undefined'.
```

### `src/modules/vendor-outlet/http/__tests__/vendor-outlet.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 4

#### 1) `tsc-error`
- **Line:** 78
- **Snippet:**
```ts
 error TS2322: Type 'Vendor | undefined' is not assignable to type 'Vendor'.
```
#### 2) `tsc-error`
- **Line:** 55
- **Snippet:**
```ts
 error TS2353: Object literal may only specify known properties, and 'is_active' does not exist in type 'IUserProps'.
```
#### 3) `tsc-error`
- **Line:** 94
- **Snippet:**
```ts
 error TS2322: Type 'VendorOutlet | undefined' is not assignable to type 'VendorOutlet'.
```
#### 4) `tsc-error`
- **Line:** 62
- **Snippet:**
```ts
 error TS2322: Type 'User | undefined' is not assignable to type 'User'.
```

### `src/modules/vendor-outlet/http/routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 10
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/vendor-outlet/infrastructure/vendor-outlet.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'VendorOutlet'.
```

### `src/modules/vendor/application/use-cases/create-vendor.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(vendorResult.error?.message));
- **Snippet:**
```ts

```

### `src/modules/vendor/application/use-cases/update-vendor.usecase.ts`
**Categories:** , error-message-passed
**Occurrences:** 1

#### 1) `error-message-passed`
- **Line:**       return failure(HttpError.internalServerError(updatedVendorResult.error?.message));
- **Snippet:**
```ts

```

### `src/modules/vendor/http/__tests__/vendor.integration.spec.ts`
**Categories:** , tsc-error
**Occurrences:** 3

#### 1) `tsc-error`
- **Line:** 61
- **Snippet:**
```ts
 error TS2322: Type 'User | undefined' is not assignable to type 'User'.
```
#### 2) `tsc-error`
- **Line:** 77
- **Snippet:**
```ts
 error TS18048: 'vendorResult.value' is possibly 'undefined'.
```
#### 3) `tsc-error`
- **Line:** 54
- **Snippet:**
```ts
 error TS2353: Object literal may only specify known properties, and 'is_active' does not exist in type 'IUserProps'.
```

### `src/modules/vendor/http/routes.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 9
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'UserRole'.
```

### `src/modules/vendor/infrastructure/vendor.mapper.ts`
**Categories:** , tsc-error
**Occurrences:** 1

#### 1) `tsc-error`
- **Line:** 1
- **Snippet:**
```ts
 error TS2305: Module '"@prisma/client"' has no exported member 'Vendor'.
```
