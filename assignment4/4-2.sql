CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `imagelink` VARCHAR(255) DEFAULT '',
    `message` VARCHAR(255) DEFAULT '',
    `isDeleted` TINYINT(1) DEFAULT 0,
    `createdDate` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `channels` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `created_by` INT NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `capacity` INT NOT NULL,
    `isDeleted` TINYINT(1) DEFAULT 0,
    `createdDate` DATETIME NOT NULL,
    FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chats` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    `channel_id` INT NOT NULL,
    `createdDate` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `follows` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `follower_id` INT NOT NULL,
    `followee_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`followee_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `blocks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `blocker_id` INT NOT NULL,
    `blocked_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    FOREIGN KEY (`blocker_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`blocked_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;