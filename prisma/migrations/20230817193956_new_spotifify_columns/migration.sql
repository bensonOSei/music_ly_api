/*
  Warnings:

  - Changed the type of `expires_in` on the `spotify` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `spotify` ADD COLUMN `initiated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    DROP COLUMN `expires_in`,
    ADD COLUMN `expires_in` DATETIME(3) NOT NULL;
