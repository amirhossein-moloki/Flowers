# INTEGRATION TEST PLAN

This document defines detailed integration testing tasks for each module in the project.  
The AI Agent or CI process must **read this file sequentially (top → bottom)** and complete each module’s integration tests before moving to the next.

---

## ✅ Integration Testing Rules

1. For each module:
   - Generate integration tests under `modules/<moduleName>/http/__tests__/`.
   - Test all HTTP routes and middleware behavior.
   - Validate controller → useCase → repository flow.
   - Handle validation, auth, and error responses.
2. When all test cases pass, mark the module as ✅ Done.
3. Commit each completion with:
   ```
   test: add integration tests for <moduleName>
   ```
4. Continue automatically to the next Pending module.

---

## 🧠 Integration Test Checklist Template (for each module)

| Test Type | Description | Must Cover |
|------------|-------------|-------------|
| CRUD Operations | Verify create, read, update, delete flows | 200/201/204/404 |
| Validation | Missing or invalid inputs | 400/422 |
| Auth | Missing or invalid tokens | 401/403 |
| Relations | Links to other modules | Proper FK behavior |
| Errors | Conflict, NotFound, etc. | Consistent structure |
| Output | Presenter formatting | JSON structure & fields |

---

## 🧩 Module Test Plan

| # | Module | Status | Notes / Dependencies |
|---|---------|---------|----------------------|
| 1 | user | ✅ Done | Needs `/me` and auth tests |
| 2 | vendor | 🕒 Pending | Admin-only actions |
| 3 | vendor-outlet | 🕒 Pending | Joins vendor & zone |
| 4 | address | 🕒 Pending | CRUD only |
| 5 | customer-address | 🕒 Pending | Must link to address |
| 6 | service-zone | 🕒 Pending | Read-only |
| 7 | shipping-rate | 🕒 Pending | Includes `/calculate` test |
| 8 | courier | 🕒 Pending | Auth + create/update driver |
| 9 | driver-location | 🕒 Pending | Update endpoint test |
| 10 | delivery-status | 🕒 Pending | Label verification only |
| 11 | delivery-window | 🕒 Pending | Validate time range |
| 12 | delivery | 🕒 Pending | Includes `/assign-driver` |
| 13 | proof-of-delivery | 🕒 Pending | Signature upload test |
| 14 | notification | 🕒 Pending | Manual trigger endpoint |
| 15 | product | 🕒 Pending | CRUD + vendorId filter |
| 16 | product-image | 🕒 Pending | Metadata validation |
| 17 | promotion | 🕒 Pending | Date range validation |
| 18 | order-status | 🕒 Pending | Read-only flow |
| 19 | order-promotion | 🕒 Pending | Promotion join validation |
| 20 | order | 🕒 Pending | CRUD + confirm/cancel |
| 21 | payment | 🕒 Pending | Verify + idempotency key |
| 22 | automation-log | 🕒 Pending | Read-only endpoint |

---

## 🔁 Example Agent Command

> “Read `INTEGRATION_TEST_PLAN.md`.  
> Find the first module where `Status = Pending`.  
> For that module, create and execute all required integration tests (based on checklist).  
> If tests pass, update the module’s row to ✅ Done and commit the change.  
> Then proceed automatically to the next Pending module.”

---
