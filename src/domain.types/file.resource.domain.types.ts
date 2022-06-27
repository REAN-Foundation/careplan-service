import { uuid } from "./miscellaneous/system.types";

export interface FileResourceCreateModel {
    StorageKey       ?: string;
    MimeType         ?: string;
    OriginalFilename ?: string;
    UserId           ?: uuid;
    Size             ?: number;
    Public           ?: boolean;
    DownloadCount    ?: number;
    Tags             ?: string;
}

export interface FileResourceDto {
    id              : uuid;
    MimeType        : string;
    OriginalFilename: string;
    UserId          : uuid;
    Size            : number;
    Public          : boolean;
    DownloadCount   : number;
    Tags            : string[];
}
