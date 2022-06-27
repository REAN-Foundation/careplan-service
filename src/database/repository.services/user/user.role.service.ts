import {
    UserRoleModel
} from '../../models/user/user.role.model';
import {
    UserModel
} from '../../models/user/user.model';
import {
    RoleModel
} from '../../models/role.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    UserRoleCreateModel,
    UserRoleSearchFilters,
    UserRoleSearchResults
} from '../../../domain.types/user/user.role.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserRoleService {

    //#region Models

    UserRole = UserRoleModel.Model;

    User = UserModel.Model;

    Role = RoleModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: UserRoleCreateModel) => {
        try {
            var record = await this.UserRole.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user role!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.UserRole.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user role!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.UserRole.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user role!', error);
        }
    }

    search = async (filters: UserRoleSearchFilters): Promise < UserRoleSearchResults > => {
        try {

            var search = this.getSearchModel(filters);
            var {
                order,
                orderByColumn
            } = this.addSortingToSearch(search, filters);
            var {
                pageIndex,
                limit
            } = this.addPaginationToSearch(search, filters);

            const foundResults = await this.UserRole.findAndCountAll(search);
            const searchResults: UserRoleSearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : foundResults.rows.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : foundResults.rows,
            };

            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search user role records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.UserRole.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update user role!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update user role!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.UserRole.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user role!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };
        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.RoleId) {
            search.where['RoleId'] = filters.RoleId;
        }
        const includeUserAsUser = {
            model    : this.User,
            required : false,
            as       : 'User',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeUserAsUser);
        const includeRoleAsRole = {
            model    : this.Role,
            required : false,
            as       : 'Role',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeRole.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeRoleAsRole);

        return search;
    }

    private addSortingToSearch = (search, filters) => {

        let orderByColumn = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy;
        }
        let order = 'ASC';
        if (filters.Order === 'descending') {
            order = 'DESC';
        }
        search['order'] = [
            [orderByColumn, order]
        ];

        if (filters.OrderBy) {
            //In case the 'order-by attribute' is on associated model
            //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
        }
        return {
            order,
            orderByColumn
        };
    }

    private addPaginationToSearch = (search, filters) => {

        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }
        let offset = 0;
        let pageIndex = 0;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            offset = pageIndex * limit;
        }
        search['limit'] = limit;
        search['offset'] = offset;

        return {
            pageIndex,
            limit
        };
    }

    //#endregion

}
