import { Model as Role } from '../models/Role';
import { ErrorHandler } from '../../common/error.handler';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class RoleService {

    create = async (createModel) => {
        try {
            return await Role.create(createModel);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create role!', error);
        }
    };

    getById = async (id) => {
        try {
            return await Role.findByPk(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role!', error);
        }
    };

    getByName = async (name) => {
        try {
            return await Role.findOne({ where: { RoleName: { [Op.like]: '%' + name + '%' } } });
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role!', error);
        }
    };

    getAllRoles = async () => {
        try {
            return await Role.findAll();
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await Role.destroy({ where: { id: id } });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to delete role!', error);
        }
    };
    
}
