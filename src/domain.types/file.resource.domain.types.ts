import {
    BaseSearchFilters,
    BaseSearchResults
} from "./miscellaneous/base.search.types";
import {
    uuid
} from "./miscellaneous/system.types";

export interface FileResourceCreateModel {
    FileName ? : string;
    UserId ? : uuid;
    IsPublicResource ? : boolean;
    Tags ? : string;
}

export interface FileResourceUpdateModel {
    FileName ? : string;
    UserId ? : uuid;
    IsPublicResource ? : boolean;
    Tags ? : string;
}

export interface FileResourceDto {
    id: uuid;
    FileName: string;
    UserId: uuid;
    IsPublicResource: boolean;
    Tags: string[];
    MimeType: string;

}

export interface FileResourceSearchFilters extends BaseSearchFilters {
    FileName ? : string;
    IsPublicResource ? : boolean;
    Tags ? : string;
    MimeType ? : string;
}

export interface FileResourceSearchResults extends BaseSearchResults {
    Items: FileResourceDto[];
}