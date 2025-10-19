# CONTROLLER & ROUTE IMPLEMENTATION STATUS

This document is used by the AI agent to **track, build, and verify** controller and route implementations for all project modules.  
Each module must have an HTTP layer (controller, routes, DTO, and presenter) following **Clean Architecture** principles.  
**Always process modules in the exact order they appear in the table (top → bottom).**

---

## 📘 Rules for the AI Agent

1. Read this file to find the target module (or iterate all rows top→bottom).
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
5. **Follow the table order strictly**; do not reorder or skip ahead.

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

## 🧩 CONTROLLER & ROUTE IMPLEMENTATION STATUS TABLE (Ordered)

| # | Module | Controller Status | Route Status | DTO Status | Presenter Status | Notes / Instructions |
|---|---------|------------------|--------------|------------|------------------|----------------------|
| 1 | user | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Add `/me` endpoint with JWT middleware. |
| 2 | vendor | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Only admin can update/delete. |
| 3 | vendor-outlet | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Join with vendor and zone in presenter. |
| 4 | address | ✅ Done | ✅ Done | ✅ Done | ✅ Done | CRUD endpoints for managing address data. |
| 5 | customer-address | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Connects with address module during creation. |
| 6 | service-zone | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Read-only; return GeoJSON. |
| 7 | shipping-rate | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Add `/calculate` endpoint. |
| 8 | courier | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Auth required for write actions. |
| 9 | driver-location | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Endpoint for updating driver coordinates. |
| 10 | delivery-status | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Read-only; return label in presenter. |
| 11 | delivery-window | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Validate time range with Zod. |
| 12 | delivery | ✅ Done | ✅ Done | ✅ Done | ✅ Done | Add `/assign-driver` endpoint. |
| 13 | proof-of-delivery | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add signature upload endpoint. |
| 14 | notification | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add manual trigger endpoint. |
| 15 | product | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | CRUD; filter by vendorId; pagination. |
| 16 | product-image | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Metadata only; upload later. |
| 17 | promotion | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Validate start/end dates. |
| 18 | order-status | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Read-only; display transitions. |
| 19 | order-promotion | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Join with promotion in presenter. |
| 20 | order | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | CRUD + `/confirm` + `/cancel` endpoints. |
| 21 | payment | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Add `/verify` endpoint; use idempotency key. |
| 22 | automation-log | 🕒 Pending | 🕒 Pending | 🕒 Pending | 🕒 Pending | Read-only GET endpoint for logs. |

---

## ✅ Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Fully implemented and tested |
| 🚧 In Progress | Work started, not finished |
| 🕒 Pending | Not started |
| ❌ Blocked | Waiting for dependency or decision |

---

## 💬 Example Command for AI Agent

> “Read the file `CONTROLLER_IMPLEMENTATION_STATUS.md`.  
> Process rows **from top to bottom**.  
> For the current row’s module, if any status column is `Pending`, generate the missing HTTP files (controller, routes, dto, presenter) under `modules/<moduleName>/http/`, then update that row to ✅ Done and commit. Move to the next row.”

---

## 🔁 Automation Notes

- The AI processes **one module at a time in table order**.
- Each update should commit changes with a message like:  
  `feat: implement controller and routes for <moduleName>`
- Once all modules are ✅ Done, the HTTP layer is complete and ready for integration tests.
