-- AlterTable
ALTER TABLE `asset_action_plans` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_animations` MODIFY `Transcript` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_appointments` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_articles` MODIFY `Summary` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_assessments` MODIFY `Description` text NULL,
MODIFY `Template` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_audio` MODIFY `Transcript` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_biometrics` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_challenges` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_checkups` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_consultations` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_exercises` MODIFY `Description` text NULL,
MODIFY `RecommendedDurationMin` int NULL DEFAULT 15,
MODIFY `Tags` text NULL;
-- AlterTable
ALTER TABLE `asset_goals` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_infographics` MODIFY `Description` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_medications` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_meditations` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_messages` MODIFY `Name` text NOT NULL,
MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Url` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1',
MODIFY `TemplateName` text NOT NULL,
MODIFY `TemplateVariables` text NULL,
MODIFY `TemplateButtonIds` text NULL;
-- AlterTable
ALTER TABLE `asset_nutritions` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_physiotherapy` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_priorities` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_reflections` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_reminders` MODIFY `Description` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_video` MODIFY `Transcript` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_web_links` MODIFY `Description` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_web_newsfeeds` MODIFY `Description` text NULL,
MODIFY `Url` text NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `asset_word_power` MODIFY `Description` text NULL,
MODIFY `AdditionalResources` text NOT NULL,
MODIFY `Tags` text NULL,
MODIFY `Version` varchar(128) NULL DEFAULT 'V1';
-- AlterTable
ALTER TABLE `careplan_activities` MODIFY `AssetId` char(36) NULL;
-- AlterTable
ALTER TABLE `careplans` MODIFY `Description` text NULL,
MODIFY `Tags` text NOT NULL;
-- AlterTable
ALTER TABLE `file_resources` MODIFY `StorageKey` text NULL,
MODIFY `Tags` text NOT NULL;
-- AlterTable
ALTER TABLE `participant_activity_responses` MODIFY `Response` text NOT NULL;
-- AlterTable
ALTER TABLE `selected_action_plans` MODIFY `Description` text NOT NULL,
MODIFY `AdditionalDetails` text NULL;
-- AlterTable
ALTER TABLE `selected_goals` MODIFY `Description` text NOT NULL,
MODIFY `AdditionalDetails` text NULL;
-- AlterTable
ALTER TABLE `selected_priorities` MODIFY `Description` text NOT NULL;
