-- CreateTable
CREATE TABLE "DeliveryWindow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "cutoff_time" TEXT NOT NULL,
    "zone_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "DeliveryWindow_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "ServiceZone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
