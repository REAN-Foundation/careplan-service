import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";
import { NotificationChannel } from "../general/notification.channel.types";

///////////////////////////////////////////////////////////////////////

export interface WhatsAppConfig {
    TemplateName: string;
    TemplateLanguage?: string;
    FlowToken?: string;
    FlowActionData?: Record<string, any>;
}

export type GenericChannelConfig = Record<string, any>;

export type ChannelConfigs = {
    [NotificationChannel.WhatsApp]?: WhatsAppConfig;
    [NotificationChannel.Telegram]?: GenericChannelConfig;
    [NotificationChannel.Email]?: GenericChannelConfig;
    [NotificationChannel.SMS]?: GenericChannelConfig;
    [NotificationChannel.WebPush]?: GenericChannelConfig;
    [NotificationChannel.MobilePush]?: GenericChannelConfig;
    [NotificationChannel.Webhook]?: GenericChannelConfig;
    [NotificationChannel.Slack]?: GenericChannelConfig;
    [NotificationChannel.WhatsappWati]?: GenericChannelConfig;
    [NotificationChannel.WhatsappMeta]?: GenericChannelConfig;
};

export interface Metadata {
    Type: string;
    Channels?: ChannelConfigs;
}

export interface AssessmentCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Template ? : string;
    ReferenceTemplateCode ? : string;
    ReferenceTemplateId ? : string;
    Tags ? : string;
    Version ? : string;
    Metadata ? : string;
    OwnerUserId?: uuid;
    TenantId?: uuid;
}

export interface AssessmentUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Template ? : string;
    ReferenceTemplateCode ? : string;
    ReferenceTemplateId ? : string;
    Tags ? : string;
    Version ? : string;
    Metadata ? : string;
    OwnerUserId?: uuid;
    TenantId?: uuid;
}

export interface AssessmentDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    AssetCategory: string;
    Template: string;
    ReferenceTemplateCode : string;
    ReferenceTemplateId? : string;
    OwnerUserId: uuid;
    TenantId: uuid;
    Tags: string[];
    Version: string;
    Metadata: string;

}

export interface AssessmentSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AssetCategory ? : string;
    Template ? : string;
    TenantId?: uuid;
    Tags ? : string;
    Version ? : string;
    Metadata ? : string;
    CreatedAt ? : Date;
}

export interface AssessmentSearchResults extends BaseSearchResults {
    Items: AssessmentDto[];
}
