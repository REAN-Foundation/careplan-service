import { RolePrivilegeModel } from '../models/role.privilege.model';
import { ErrorHandler } from '../../common/error.handler';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class RolePrivilegeService {

    RolePrivilege = RolePrivilegeModel.Model;

    create = async (createModel) => {
        try {
            return await this.RolePrivilege.create(createModel);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create role privilege!', error);
        }
    };

    getById = async (id) => {
        try {
            return await this.RolePrivilege.findByPk(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role privilege!', error);
        }
    };

    getPrivilegesForRole = async (roleId) => {
        try {
            const rolePrivileges = await this.RolePrivilege.findAll({
                where : {
                    RoleId : roleId,
                },
            });
            return rolePrivileges.map((x) => x.Privilege);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role privileges!', error);
        }
    };

    hasPrivilegeForRole = async (roleId, privilege) => {
        try {
            const rolePrivileges = await this.RolePrivilege.findAll({
                where : {
                    RoleId    : roleId,
                    Privilege : { [Op.like]: '%' + privilege + '%' },
                },
            });
            return rolePrivileges.length > 0;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to validate role and privilege!', error);
        }
    };
    
}
