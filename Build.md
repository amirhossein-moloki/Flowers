# گزارش اصلاح الگوی `Result` در فایل‌ها

> این سند برای پیگیری وضعیت اصلاح استفاده از کلاس `Result` (جایگزینی `result.success` با Type Guards مانند `isSuccess()`/`isFailure()` و بررسی ایمن `value`/`error`) تهیه شده است. ستون «وضعیت» را با یکی از این‌ها پر کنید: **اصلاح‌شده / اصلاح‌شده / نیاز به بررسی**.

## جدول پیگیری

| مسیر فایل | وضعیت | خلاصه مشکل | خلاصه راه‌حل پیشنهادی |
|---|---|---|---|
| src/modules/user/http/controller.ts | اصلاح‌شده | استفاده از `result.success` و دسترسی ناامن به `value`/`error` | جایگزینی با `if (result.isSuccess() && result.value) { ... }` و شاخه‌ی `isFailure()` برای خطا |
| src/modules/user/presentation/http/user.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/driver-location/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/driver-location/presentation/mappers/driver-location.mapper.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/shipping-rate/presentation/http/shipping-rate.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/product-image/application/use-cases/find-all-product-image.usecase.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/product-image/application/use-cases/get-product-image.usecase.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/product-image/presentation/http/product-image.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/order/presentation/http/order.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/courier/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/automation-log/presentation/http/automation-log.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/address/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/payment/presentation/http/payment.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/vendor/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/product/presentation/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/vendor-outlet/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/service-zone/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/delivery-status/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/__tests__/product-image/prisma-product-image.repository.spec.ts | اصلاح‌شده | همان الگو (assertها/expectها مبتنی بر `success`) | به‌روزرسانی تست‌ها بر اساس `isSuccess()`/`isFailure()` |
| src/modules/__tests__/courier/courier.entity.spec.ts | اصلاح‌شده | همان الگو | همان راه‌حل تستی |
| src/modules/__tests__/address/address.entity.spec.ts | اصلاح‌شده | همان الگو | همان راه‌حل تستی |
| src/modules/__tests__/notification/prisma-notification.repository.spec.ts | اصلاح‌شده | همان الگو | همان راه‌حل تستی |
| src/modules/proof-of-delivery/presentation/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/proof-of-delivery/infrastructure/__tests__/prisma-proof-of-delivery.repository.spec.ts | اصلاح‌شده | همان الگو | همان راه‌حل تستی |
| src/modules/order-promotion/__tests__/order-promotion.usecase.spec.ts | اصلاح‌شده | همان الگو | همان راه‌حل تستی |
| src/modules/order-promotion/presentation/http/order-promotion.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/notification/application/use-cases/get-notification.usecase.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/notification/application/use-cases/delete-notification.usecase.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/notification/application/use-cases/update-notification.usecase.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/notification/presentation/http/notification.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/delivery/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/customer-address/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/delivery-window/http/controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/delivery-window/presentation/mappers/delivery-window.mapper.ts | اصلاح‌شده | همان الگو | همان راه‌حل |
| src/modules/promotion/presentation/http/promotion.controller.ts | اصلاح‌شده | همان الگو | همان راه‌حل |

> **نکته:** در صورت اصلاح هر فایل، ستون «وضعیت» را به **اصلاح‌شده** تغییر دهید و در ستون «خلاصه راه‌حل» توضیح کوتاه commit/PR را اضافه کنید.

---

## توضیحات کامل مشکل و راه‌حل

### مشکل: استفاده نادرست از کلاس `Result` و خطاهای Type Safety
در بسیاری از فایل‌های بالا، از الگوی قدیمی و ناامن `result.success` برای بررسی نتیجه‌ی عملیات استفاده شده است. کلاس `Result` طوری طراحی شده که با استفاده از **type guard**‌های `isSuccess()` و `isFailure()`، کامپایلر TypeScript بداند در هر شاخه‌ی شرطی کدام‌یک از مقادیر `result.value` یا `result.error` قطعاً در دسترس و تعریف شده‌اند. وقتی به‌جای `result.isSuccess()` از `result.success` استفاده می‌شود، این مکانیزم از کار می‌افتد و TypeScript نمی‌تواند نوع را درستی تشخیص دهد؛ در نتیجه با خطاهای نظیر **possibly 'undefined'** هنگام دسترسی به `value`/`error` مواجه می‌شویم.

### راه‌حل: استفاده از Type Guards و بررسی مقدار
- **جایگزینی `result.success` با `result.isSuccess()`:** تمام شرط‌های `if (result.success)` باید با `if (result.isSuccess())` جایگزین شوند.
- **بررسی وجود `value`:** حتی پس از `isSuccess()`، در صورت عدم تضمین قراردادی، قبل از استفاده از `result.value` وجود آن را هم بررسی کنید:

```ts
if (result.isSuccess() && result.value) {
  // استفاده امن از result.value
} else {
  // شاخه خطا یا نبودِ value
  const message = result.error?.message ?? 'Unknown error';
  throw new Error(message);
}
```

- **دسترسی ایمن به `error`:** برای پیام خطا از `result.error?.message` استفاده شود.

### تغییر کلیدی در فایل هسته‌ای `src/core/utils/result.ts`
**مسئله اصلی** در متد `combine` این فایل بود که همه‌ی `value`‌ها را بدون فیلترکردن شکست‌ها برمی‌داشت:

```ts
// قبل از تغییر
const values = results.map((r) => r.value as T);
return this.success(values);
```

**پس از اصلاح پیشنهادی:**

```ts
const successfulResults = results.filter((r) => r.isSuccess());
return this.success(successfulResults.map((r) => r.value as T));
```

این تغییر تضمین می‌کند خروجی `combine` شامل `undefined` ناشی از نتایج ناموفق نباشد.

---

## چک‌لیست کار برای هر فایل
- [ ] همه‌ی شرط‌ها از `success` به `isSuccess()`/`isFailure()` تبدیل شده‌اند
- [ ] دسترسی به `value` فقط پس از بررسی وجود آن انجام می‌شود
- [ ] دسترسی به `error` با `?.message` صورت می‌گیرد
- [ ] تست‌های واحد/یکپارچه به الگوی جدید به‌روزرسانی شده‌اند
- [ ] در صورت نیاز، قرارداد توابع (امضاهای UseCase/Service) درباره‌ی وجود `value`/نوع خطا مستندسازی شده است

---

## الگوی کد پیشنهادی (Controller/UseCase)

```ts
const result = await service.handle(input);

if (result.isFailure()) {
  const status = mapDomainErrorToHttp(result.error);
  throw new HttpException(result.error?.message ?? 'Unknown error', status);
}

if (!result.value) {
  // اگر قرارداد، وجود value را در حالت موفق تضمین نکند
  throw new HttpException('Empty result', HttpStatus.INTERNAL_SERVER_ERROR);
}

return result.value;
```

---

> در صورت تمایل می‌توانم برای هر مسیر فایل، PR Template خودکار و اسکریپت lint-fix (codemod) ارائه کنم تا جایگزینی‌ها یکجا انجام شود.
