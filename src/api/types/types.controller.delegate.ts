import { RoleService } from "../../database/repository.services/role.service";

export class TypesControllerDelegate {

    //#region member variables and constructors

    _roleService: RoleService = null;

    constructor() {
        this._roleService = new RoleService();
    }

    //#endregion

    getRoleTypes = async () => {
        return await this._roleService.getAllRoles();
    };

}
