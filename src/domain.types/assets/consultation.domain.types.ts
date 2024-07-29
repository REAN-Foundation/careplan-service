import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export enum ConsultationType {
    TeleConsultation  = "Tele-consultation",
    VisitConsultation = "Visit-consultation",
    Other             = "Other"
}

export const ConsultationTypeList: ConsultationType[] = [
    ConsultationType.TeleConsultation,
    ConsultationType.VisitConsultation,
    ConsultationType.Other
];

export interface ConsultationCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ConsultationType ? : ConsultationType;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
}

export interface ConsultationUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ConsultationType ? : ConsultationType;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
}

export interface ConsultationDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    ConsultationType: ConsultationType;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface ConsultationSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ConsultationType ? : ConsultationType;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    CreatedAt ? : Date;
}

export interface ConsultationSearchResults extends BaseSearchResults {
    Items: ConsultationDto[];
}
