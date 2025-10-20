# PHASE 8 – INTEGRATION TEST AUTOMATION PROMPT

This file instructs the AI Agent or CI pipeline to autonomously process and complete all integration tests defined in `INTEGRATION_TEST_PLAN.md`, **without manual module input**.

---

## 🎯 Objective
Execute Phase 8 (Integration & Service Layer Testing) autonomously by reading `INTEGRATION_TEST_PLAN.md`, determining which modules are still pending, generating and executing tests for them in sequence, and updating the plan automatically.

---

## ⚙️ Step-by-Step Workflow

1️⃣ **Read Test Plan**
   - Open `INTEGRATION_TEST_PLAN.md`.
   - Parse the “Module Test Plan” table.
   - Identify the first row where `Status = 🕒 Pending`.

2️⃣ **Implement Integration Tests**
   - For that module `<moduleName>`, create full integration test coverage under:
     ```
     modules/<moduleName>/http/__tests__/<moduleName>.integration.spec.ts
     ```
   - Cover all scenarios listed in the **Integration Test Checklist Template** from the same file:
     - CRUD operations
     - Validation (missing/invalid inputs)
     - Auth and permissions
     - Relations between modules
     - Error handling (404, 401, 409, etc.)
     - Presenter / Output formatting

3️⃣ **Run the Test Suite**
   - Execute the integration test suite.
   - Verify that all tests for `<moduleName>` pass successfully.

4️⃣ **Update Test Plan**
   - Edit the corresponding row in `INTEGRATION_TEST_PLAN.md`.
   - Change `Status` from 🕒 Pending → ✅ Done.
   - Save the updated file.

5️⃣ **Commit Progress**
   - Use the commit message format:
     ```
     test: add integration tests for <moduleName>
     ```

6️⃣ **Continue Automatically**
   - Repeat steps 1–5 for the next module until there are no 🕒 Pending entries left.
   - Do not skip modules or reorder the plan.
   - Stop only when all modules are ✅ Done.

---

## 🔁 Execution Rules

- Process modules **in order (top → bottom)**.
- Never rerun completed modules (✅ Done).
- Automatically resume from the last Pending module if interrupted.
- Log progress after each module:
  - `[RUNNING] module=<moduleName>`
  - `[SUCCESS] module=<moduleName> → Done`
  - `[ALL COMPLETED] All integration tests implemented.`

---

## ✅ Completion Criteria

- All rows in `INTEGRATION_TEST_PLAN.md` marked ✅ Done.
- All integration test files exist and pass successfully.
- Each module’s commit history reflects individual completion.
- A coverage report is generated for all HTTP and UseCase layers.

---

## 🧩 Command Summary

> “Read the file `INTEGRATION_TEST_PLAN.md`.  
> Find the first module with `Status = 🕒 Pending`.  
> Implement and run integration tests for that module based on the checklist.  
> Once tests pass, mark it ✅ Done, commit, and continue to the next.”

---
