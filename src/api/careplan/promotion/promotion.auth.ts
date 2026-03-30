import {
    AuthOptions,
    RequestType,
    ResourceOwnership,
    ActionScope,
    DefaultAuthOptions
} from '../../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class PromotionAuth {

    static readonly _baseContext = `Careplan.Promotion`;

    static readonly promotionFrom: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.PromoteFrom`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.CreateOne,
    };

    static readonly promotionTo: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.PromoteTo`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Tenant,
        RequestType : RequestType.CreateOne,
    };

}
