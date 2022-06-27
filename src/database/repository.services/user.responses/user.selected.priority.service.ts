import {
    UserSelectedPriorityModel
} from '../../models/user.responses/user.selected.priority.model';
import {
    UserModel
} from '../../models/user/user.model';
import {
    CareplanModel
} from '../../models/careplan/careplan.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    UserSelectedPriorityCreateModel,
    UserSelectedPrioritySearchFilters,
    UserSelectedPrioritySearchResults
} from '../../../domain.types/user.responses/user.selected.priority.domain.types';
import {
    Op
} from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedPriorityService {

    //#region Models

    UserSelectedPriority = UserSelectedPriorityModel.Model;

    User = UserModel.Model;

    Careplan = CareplanModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: UserSelectedPriorityCreateModel) => {
        try {
            var record = await this.UserSelectedPriority.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user selected priority!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.UserSelectedPriority.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.User,
                    required : false,
                    as       : 'User',
                    //through: { attributes: [] }
                }, {
                    model    : this.Careplan,
                    required : false,
                    as       : 'Careplan',
                    //through: { attributes: [] }
                },

                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user selected priority!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.UserSelectedPriority.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user selected priority!', error);
        }
    }

    search = async (filters: UserSelectedPrioritySearchFilters): Promise < UserSelectedPrioritySearchResults > => {
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

            const foundResults = await this.UserSelectedPriority.findAndCountAll(search);
            const searchResults: UserSelectedPrioritySearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search user selected priority records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.UserSelectedPriority.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update user selected priority!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update user selected priority!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.UserSelectedPriority.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user selected priority!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.Name) {
            search.where['Name'] = {
                [Op.like] : '%' + filters.Name + '%'
            };
        }
        if (filters.Description) {
            search.where['Description'] = {
                [Op.like] : '%' + filters.Description + '%'
            };
        }
        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId;
        }
        if (filters.AssetId) {
            search.where['AssetId'] = filters.AssetId;
        }
        if (filters.AssetType) {
            search.where['AssetType'] = filters.AssetType;
        }
        if (filters.StartDate) {
            search.where['StartDate'] = filters.StartDate;
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
        const includeCareplanAsCareplan = {
            model    : this.Careplan,
            required : false,
            as       : 'Careplan',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeCareplan.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeCareplanAsCareplan);

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
