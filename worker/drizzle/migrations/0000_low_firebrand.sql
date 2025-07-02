CREATE TABLE `polls` (
	`id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`poll_type` text DEFAULT 'multiple_choice' NOT NULL,
	`allow_multiple_options` integer DEFAULT false NOT NULL,
	`close_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `polls_id_unique` ON `polls` (`id`);--> statement-breakpoint
CREATE TABLE `poll_options` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`option_text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`poll_option_id` integer NOT NULL,
	`voted_at` integer NOT NULL,
	`voter_ip` text NOT NULL,
	FOREIGN KEY (`poll_option_id`) REFERENCES `poll_options`(`id`) ON UPDATE no action ON DELETE cascade
);
