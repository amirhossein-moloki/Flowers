/*
  Warnings:

  - Added the required column `vehicle_type` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Delivery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "courier_id" TEXT NOT NULL,
    "status_id" TEXT,
    "vehicle_type" TEXT NOT NULL,
    "assigned_at" DATETIME NOT NULL,
    "delivered_at" DATETIME,
    "expected_delivery_date" DATETIME NOT NULL,
    "actual_delivery_date" DATETIME,
    "tracking_number" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Delivery" ("actual_delivery_date", "assigned_at", "courier_id", "created_at", "delivered_at", "expected_delivery_date", "id", "order_id", "status_id", "tracking_number", "updated_at") SELECT "actual_delivery_date", "assigned_at", "courier_id", "created_at", "delivered_at", "expected_delivery_date", "id", "order_id", "status_id", "tracking_number", "updated_at" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
CREATE UNIQUE INDEX "Delivery_order_id_key" ON "Delivery"("order_id");
CREATE UNIQUE INDEX "Delivery_tracking_number_key" ON "Delivery"("tracking_number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
