CREATE TABLE `now` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`NAME` text NOT NULL,
	`HOST_NAME` text DEFAULT '',
	`IP` text,
	`MAC` text,
	`HW` text,
	`DATE` text,
	`KNOWN` integer DEFAULT 0,
	`NOW` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `now_ID_unique` ON `now` (`ID`);--> statement-breakpoint
CREATE UNIQUE INDEX `now_IP_unique` ON `now` (`IP`);--> statement-breakpoint
CREATE UNIQUE INDEX `now_MAC_unique` ON `now` (`MAC`);--> statement-breakpoint
CREATE VIEW `hosts` AS select "IP", "HOST_NAME", "NAME" from "now" where ("now"."IP" is not null and "now"."HOST_NAME" is not null and "now"."NAME" is not null);