import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface Metadata {
    Type: string;
    TemplateName: string;
    TemplateLanguage?: string;
    FlowToken?: string;
    FlowActionData?: Record<string, any>;
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
