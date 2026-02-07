
////////////////////////////////////////////////////////////////////////////////////////////////////////

import { CareplanCategoryCreateModel } from "../careplan/careplan.category.domain.types";
import { uuid } from "../miscellaneous/system.types";

export interface SyncResult {
    AssetsCreated: number;
    AssetsUpdated: number;
    AssetsDeleted: number;
    ActivitiesCreated: number;
    ActivitiesUpdated: number;
    ActivitiesDeleted: number;
}

export interface TargetCareplan {
    id: string;
    Code: string;
    Name: string;
    Description?: string;
    Version?: string;
    IsActive?: boolean;
}

export interface TargetActivity {
    id: string;
    AssetId: string;
    AssetType: string;
    AssetCode: string;
    Day: number;
    TimeSlot: string;
}

export interface CareplanExport {
    id?: uuid;
    Code: string;
    CategoryId: uuid;
    Name: string;
    Description?: string;
    Version?: string;
    OwnerUserId: uuid;
    TenantId?: uuid;
    Tags?: string[];
    IsActive?: boolean;
    Category?:CareplanCategoryCreateModel;
    Assets?:any[];
    CareplanActivities?:any[];
}

export interface AssetExport {
    AssetCode: string;
    AssetType: string;
    Name: string;
    Description: string;
    TenantId: string;
    Tags: string[];
    Version: string;
    [key: string]: any;
}

export interface ActivityExport {
    AssetType: string;
    AssetCode: string;
    Day: number;
    TimeSlot: string;
    Sequence?: number;
    IsRegistrationActivity?: boolean;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
