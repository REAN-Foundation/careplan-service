import {
    AuthOptions,
    RequestType,
    ResourceOwnership,
    ActionScope,
    DefaultAuthOptions
} from '../../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanAuth {

    static readonly _baseContext = `Careplan`;

    static readonly create: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Create`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.CreateOne,
    };

    static readonly update: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Update`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.UpdateOne,
    };

    static readonly delete: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Delete`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.DeleteOne,
    };

    static readonly search: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Search`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.Search,

    };

    static readonly getById: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.GetById`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.GetOne,
    };

    static readonly import: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Import`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.CreateOne,
    };

    static readonly export: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Export`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.GetOne,
    };

    static readonly promote: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Promote`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.UpdateOne,
    };

    static readonly getPromotionStatus: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.GetPromotionStatus`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.GetOne,
    };

}
