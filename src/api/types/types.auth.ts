import {
    AuthOptions,
    RequestType,
    ResourceOwnership,
    ActionScope,
    DefaultAuthOptions
} from '../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class TypesAuth {

    static readonly _baseContext = `Types`;

    static readonly getCareplanCategories: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.CareplanCategories`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Public,
        RequestType : RequestType.GetMany,
    };

    static readonly assetTypes: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.AssetTypes`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Public,
        RequestType : RequestType.GetMany,
    };

    static readonly timeSlots: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.TimeSlots`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Public,
        RequestType : RequestType.GetMany,
    };

}
