# CONTROLLER & ROUTE IMPLEMENTATION STATUS

This document is used by the AI agent to **track, build, and verify** controller and route implementations for all project modules.  
Each module must have an HTTP layer (controller, routes, DTO, and presenter) following **Clean Architecture** principles.

---

## 📘 Rules for the AI Agent

1. Read this file to find the target module.
2. For the given module:
   - Create or update the following files under `modules/<moduleName>/http/`:
     - `controller.ts`
     - `routes.ts`
     - `dto/` → contains Zod schemas
     - `presenters/` → contains response mappers
   - Use dependency injection (DI Container) to call UseCases from controllers.
   - Validate inputs using Zod DTOs.
   - Return outputs through Presenters.
3. When a module’s HTTP layer is complete, update its status columns to ✅ **Done**.
4. Do not modify unrelated modules.

---

## 📁 Folder Structure Example

```
modules/
  <moduleName>/
    http/
      controller.ts
      routes.ts
      dto/
        create-<moduleName>.schema.ts
        update-<moduleName>.schema.ts
      presenters/
        <moduleName>.presenter.ts
      __tests__/
        <moduleName>.controller.spec.ts
```

---

## 🧩 CONTROLLER & ROUTE IMPLEMENTATION STATUS TABLE

| # | Module | Controller Status | Route Status | DTO Status | Presenter Status | Notes / Instructions |
|---|---------|------------------|---------------|-------------|------------------|----------------------|
| 1 | address | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | CRUD endpoints for managing address data. |
| 2 | automation-log | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Read-only GET endpoint for logs. |
| 3 | courier | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Auth required for write actions. |
| 4 | customer-address | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Connects with address module during creation. |
| 5 | delivery | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add `/assign-driver` endpoint. |
| 6 | delivery-status | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Read-only; return label in presenter. |
| 7 | delivery-window | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Validate time range with Zod. |
| 8 | driver-location | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Endpoint for updating driver coordinates. |
| 9 | notification | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add manual trigger endpoint. |
| 10 | order | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | CRUD + `/confirm` + `/cancel` endpoints. |
| 11 | order-promotion | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Join with promotion in presenter. |
| 12 | order-status | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Read-only; display transitions. |
| 13 | payment | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add `/verify` endpoint; use idempotency key. |
| 14 | product | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | CRUD; filter by vendorId; pagination. |
| 15 | product-image | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Metadata only; upload later. |
| 16 | promotion | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Validate start/end dates. |
| 17 | proof-of-delivery | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add signature upload endpoint. |
| 18 | service-zone | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Read-only; return GeoJSON. |
| 19 | shipping-rate | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add `/calculate` endpoint. |
| 20 | user | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add `/me` endpoint with JWT middleware. |
| 21 | vendor | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Only admin can update/delete. |
| 22 | vendor-outlet | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Join with vendor and zone in presenter. |

---

## ✅ Status Legend

| Symbol | Meaning |
|--------|----------|
| ✅ Done | Fully implemented and tested |
| 🚧 In Progress | Work started, not finished |
| 🕒 Pending | Not started |
| ❌ Blocked | Waiting for dependency or decision |

---

## 💬 Example Command for AI Agent

> “Read the file `CONTROLLER_IMPLEMENTATION_STATUS.md`.  
> Find the row where `Module = product`.  
> For that module, if any status column is `Pending`, generate the missing HTTP files (controller, routes, dto, presenter) in `modules/product/http/` and update the file so that their status becomes ✅ Done.”

---

## 🔁 Automation Notes

- The AI can process one module at a time.
- Each update should commit changes with a message like:  
  `feat: implement controller and routes for <moduleName>`
- Once all modules are ✅ Done, the HTTP layer is complete and ready for integration tests.
