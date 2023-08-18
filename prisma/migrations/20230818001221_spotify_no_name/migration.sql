/*
  Warnings:

  - You are about to drop the column `name` on the `spotify` table. All the data in the column will be lost.
  - You are about to drop the column `spotify_id` on the `spotify` table. All the data in the column will be lost.
  - Added the required column `client_secret` to the `Spotify` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spotify` DROP COLUMN `name`,
    DROP COLUMN `spotify_id`,
    ADD COLUMN `client_secret` VARCHAR(191) NOT NULL;
