import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface UserRoleCreateModel {
    UserId ? : uuid;
    RoleId ? : number;
}

export interface UserRoleUpdateModel {
    UserId ? : uuid;
    RoleId ? : number;
}

export interface UserRoleDto {
    id: uuid;
    UserId: uuid;
    RoleId: number;

}

export interface UserRoleSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    RoleId?: number;
}

export interface UserRoleSearchResults extends BaseSearchResults {
    Items: UserRoleDto[];
}
