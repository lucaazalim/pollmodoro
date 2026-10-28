ALTER TABLE `poll_options` ADD `votes_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
UPDATE `poll_options` SET `votes_count` = (SELECT count(*) FROM `votes` WHERE `votes`.`poll_option_id` = `poll_options`.`id`);
