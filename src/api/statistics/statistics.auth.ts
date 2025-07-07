import {
    AuthOptions,
    RequestType,
    ResourceOwnership,
    ActionScope,
    DefaultAuthOptions
} from '../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class StatisticsAuth {

    static readonly _baseContext = `Statistics`;

    static readonly search: AuthOptions = {
        ...DefaultAuthOptions,
        Context     : `${this._baseContext}.Search`,
        Ownership   : ResourceOwnership.System,
        ActionScope : ActionScope.Public,
        RequestType : RequestType.Search,
    };

}
