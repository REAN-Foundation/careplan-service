import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export enum MessageType {
    Educational = "Educational",
    Status      = "Status",
    Unknown     = "Unknown"
}

export const MessageTypeList: MessageType[] = [
    MessageType.Educational,
    MessageType.Status,
    MessageType.Unknown,
];

export interface MessageCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    MessageType ? : MessageType;
    Tags ? : string;
    Url ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
}

export interface MessageUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    MessageType ? : MessageType;
    Tags ? : string;
    Url ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
}

export interface MessageDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    AssetCategory: string;
    MessageType: MessageType;
    OwnerUserId: uuid;
    Tags: string[];
    Url: string;
    Version: string;

}

export interface MessageSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Category ? : string;
    MessageType ? : MessageType;
    Tags ? : string;
    Version ? : string;
    CreatedAt ? : Date;
}

export interface MessageSearchResults extends BaseSearchResults {
    Items: MessageDto[];
}
