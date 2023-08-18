-- CreateTable
CREATE TABLE `Spotify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` VARCHAR(191) NOT NULL,
    `spotify_id` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
