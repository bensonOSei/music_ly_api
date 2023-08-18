/*
  Warnings:

  - Added the required column `name` to the `Spotify` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spotify` ADD COLUMN `name` VARCHAR(191) NOT NULL;
