PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`imageUrl` text,
	`UserId` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_Posts`("id", "url", "title", "content", "imageUrl", "UserId", "createdAt", "updatedAt") SELECT "id", "url", "title", "content", "imageUrl", "UserId", "createdAt", "updatedAt" FROM `Posts`;--> statement-breakpoint
DROP TABLE `Posts`;--> statement-breakpoint
ALTER TABLE `__new_Posts` RENAME TO `Posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `Posts_url_unique` ON `Posts` (`url`);