# فاز ۹: خودکارسازی CI/CD و تعریف دروازه‌های کیفیت (Quality Gates)

## 🎯 هدف
ایجاد یک شبکه‌ی ایمنی خودکار برای جلوگیری از ورود کد معیوب به پروژه و تضمین کیفیت مداوم.  
در پایان این فاز، پروژه باید دارای یک پایپ‌لاین هوشمند باشد که با هر تغییر کد،  
به‌صورت خودکار مراحل **Build → Test → Quality Check → Security Scan → Deploy** را اجرا کرده  
و در صورت پایین بودن کیفیت یا وجود خطا، مانع از Merge یا Deploy شود.

---

## 🧩 جدول تسک‌های فاز ۹

| شماره | عنوان تسک | شرح کامل | معیار پذیرش (Acceptance Criteria) | خروجی مورد انتظار | وابستگی‌ها |
|:--:|:--|:--|:--|:--|:--|
| **9.2** | طراحی معماری پایپ‌لاین CI/CD | طراحی ساختار مرحله‌به‌مرحله‌ی پایپ‌لاین شامل Build, Test, Quality Check, Security Scan, Deploy و تعریف تریگرها (PR, push, schedule). باید دیاگرام ساده و توضیح متنی تولید شود. | دیاگرام و توضیح کامل مراحل پایپ‌لاین. تریگرها و گزارش‌ها مشخص باشند. | `pipeline-architecture.md` + دیاگرام (SVG/PNG) | — |
| **9.3** | تنظیم مرحله Build | تعریف فرایند Build خودکار، شامل دستورات build، متغیرهای محیطی، استراتژی cache و runner مورد استفاده. باید خروجی قابل استقرار تولید شود. | Build موفق روی commit تستی؛ artifact تولید و ذخیره شود. | فایل پیکربندی Build (مثلاً `.github/workflows/build.yml`) + artifact | 9.2 |
| **9.4** | تنظیم مرحله Test | اجرای خودکار تست‌های واحد و integration با گزارش تست و پوشش کد (coverage). در صورت شکست تست‌ها، پایپ‌لاین باید متوقف شود. | گزارش تست (JUnit یا مشابه) و گزارش coverage تولید شود. | `test-report.xml` + `coverage.html` | 9.3 |
| **9.5** | تعریف دروازه‌های کیفیت (Quality Gates) | تعریف قوانین کیفیت شامل پوشش تست ≥ ۸۰٪، عدم وجود خطای بحرانی، lint بدون خطا، و حداقل معیارهای امنیتی. | دروازه‌ها در پایپ‌لاین تعریف شده و در صورت نقض، merge متوقف شود. | فایل پیکربندی Quality Gates + مستند آستانه‌ها | 9.4 |
| **9.6** | پیاده‌سازی ابزارهای بررسی کیفیت | ادغام ابزارهایی مانند SonarQube، CodeQL، ESLint یا Pylint در پایپ‌لاین. اجرای خودکار آن‌ها و ذخیره‌ی نتایج به عنوان artifact. | اجرای موفق ابزارها؛ تولید گزارش و ارتباط با Quality Gates. | پیکربندی ابزارها + گزارش نمونه | 9.5 |
| **9.7** | اضافه‌کردن اسکن امنیتی | افزودن مرحله Security Scan با ابزارهایی مانند Trivy یا Snyk برای بررسی وابستگی‌ها و تصاویر کانتینر. | گزارش آسیب‌پذیری تولید و در صورت وجود سطح بالا، deploy متوقف شود. | `security-scan-report.json` یا HTML مشابه | 9.6 |
| **9.8** | تنظیم مرحله Deploy | استقرار خودکار در محیط staging یا production با مکانیزم rollback. Deploy فقط در صورت عبور از تمام دروازه‌ها انجام شود. | Deploy موفق در staging و rollback تست‌شده. | اسکریپت یا job استقرار + گزارش deploy | 9.7 |
| **9.9** | مدیریت گزارش‌ها و هشدارها | راه‌اندازی اعلان‌های خودکار (Slack, Discord, GitHub Notifications) برای موفقیت یا شکست هر مرحله. نگهداری گزارش‌ها در آرشیو مشخص. | ارسال هشدار تستی موفق؛ ذخیره‌ی گزارش‌ها در آرشیو. | سیستم اعلان و فایل نمونه‌ی گزارش | 9.8 |
| **9.10** | مستندسازی خودکار تنظیمات | تولید خودکار فایل مستندات شامل مراحل پایپ‌لاین، ابزارها، Quality Gates، و دستورالعمل رفع خطاها. باید به‌صورت دوره‌ای به‌روزرسانی شود. | تولید فایل `CI-CD-README.md` شامل تمام اطلاعات بالا. | مستند نهایی در مسیر `/docs` یا `/pipeline-docs` | 9.9 |

---

## ⚙️ دستورالعمل اجرای فاز

1. هر تسک باید به ترتیب عددی انجام شود.  
2. فایل وضعیت تسک‌ها باید به‌صورت خودکار به‌روزرسانی شود تا مشخص شود پروژه در کدام مرحله است.  
3. پس از هر تسک:
   - مقدار `status` از `"pending"` به `"in-progress"` و سپس `"done"` یا `"failed"` تغییر کند.
   - خروجی‌ها در پوشه‌ی `artifacts/` ذخیره شوند.
   - لاگ هر مرحله در `logs/phase9/` ثبت شود.
4. در پایان، فایل مستند نهایی (`CI-CD-README.md`) باید شامل خلاصه‌ی وضعیت و مسیر همه‌ی خروجی‌ها باشد.

---

## 🗂 ساختار پیشنهادی فایل وضعیت (tasks-status.json)

این فایل به هوش مصنوعی کمک می‌کند بداند روی کدام تسک است و وضعیت فاز را دنبال کند.

```json
{
  "pipeline_phase": "phase-9-ci-cd-quality-gates",
  "current_task_id": "9.2",
  "tasks": [
    {
      "id": "9.2",
      "title": "Design CI/CD pipeline architecture",
      "status": "pending",
      "outputs": [],
      "dependencies": []
    },
    {
      "id": "9.3",
      "title": "Setup Build stage",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.2"]
    },
    {
      "id": "9.4",
      "title": "Setup Test stage",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.3"]
    },
    {
      "id": "9.5",
      "title": "Define Quality Gates",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.4"]
    },
    {
      "id": "9.6",
      "title": "Integrate Quality Tools",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.5"]
    },
    {
      "id": "9.7",
      "title": "Add Security Scan",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.6"]
    },
    {
      "id": "9.8",
      "title": "Configure Deploy Stage",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.7"]
    },
    {
      "id": "9.9",
      "title": "Setup Notifications and Reports",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.8"]
    },
    {
      "id": "9.10",
      "title": "Auto-generate CI/CD documentation",
      "status": "pending",
      "outputs": [],
      "dependencies": ["9.9"]
    }
  ],
  "metadata": {
    "last_updated": "2025-10-25T12:00:00+02:00",
    "author": "phase-9-automator"
  }
}
