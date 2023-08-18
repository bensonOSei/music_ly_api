/*
  Warnings:

  - Added the required column `access_token` to the `Spotify` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spotify` ADD COLUMN `access_token` VARCHAR(191) NOT NULL;
