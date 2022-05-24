import {
    UserSelectedActionPlanModel
} from '../models/user.responses/user.selected.action.plan.model';
import {
    UserModel
} from '../models/user.model';
import {
    CareplanModel
} from '../models/careplan.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    UserSelectedActionPlanCreateModel,
    UserSelectedActionPlanSearchFilters,
    UserSelectedActionPlanSearchResults
} from '../../domain.types/user.response/user.selected.action.plan.domain.types';
import {
    Op
} from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedActionPlanService {

    //#region Models

    UserSelectedActionPlan = UserSelectedActionPlanModel.Model();

    User = UserModel.Model();

    Careplan = CareplanModel.Model();


    //#endregion

    //#region Publics

    create = async (createModel: UserSelectedActionPlanCreateModel) => {
        try {
            var record = await this.UserSelectedActionPlan.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user selected action plan!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.UserSelectedActionPlan.findOne({
                where: {
                    id: id
                },
                include: [{
                        model: this.User,
                        required: false,
                        as: 'User',
                        //through: { attributes: [] }
                    }, {
                        model: this.Careplan,
                        required: false,
                        as: 'Careplan',
                        //through: { attributes: [] }
                    },

                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user selected action plan!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.UserSelectedActionPlan.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user selected action plan!', error);
        }
    }

    search = async (filters: UserSelectedActionPlanSearchFilters): Promise < UserSelectedActionPlanSearchResults > => {
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

            const foundResults = await this.UserSelectedActionPlan.findAndCountAll(search);
            const searchResults: UserSelectedActionPlanSearchResults = {
                TotalCount: foundResults.count,
                RetrievedCount: foundResults.rows.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: foundResults.rows,
            };

            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search user selected action plan records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.UserSelectedActionPlan.update(updateModel, {
                    where: {
                        id: id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update user selected action plan!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update user selected action plan!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.UserSelectedActionPlan.destroy({
                where: {
                    id: id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user selected action plan!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where: {},
            include: []
        };

        if (filters.Name) {
            search.where['Name'] = {
                [Op.like]: '%' + filters.Name + '%'
            }
        }
        if (filters.Description) {
            search.where['Description'] = {
                [Op.like]: '%' + filters.Description + '%'
            }
        }
        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId
        }
        if (filters.AssetId) {
            search.where['AssetId'] = filters.AssetId
        }
        if (filters.AssetType) {
            search.where['AssetType'] = filters.AssetType
        }
        if (filters.AdditionalDetails) {
            search.where['AdditionalDetails'] = {
                [Op.like]: '%' + filters.AdditionalDetails + '%'
            }
        }
        if (filters.StartDate) {
            search.where['StartDate'] = filters.StartDate
        }
        if (filters.EndDate) {
            search.where['EndDate'] = filters.EndDate
        }
        if (filters.ProgressStatus) {
            search.where['ProgressStatus'] = filters.ProgressStatus
        }
        const includeUserAsUser = {
            model: this.User,
            required: false,
            as: 'User',
            where: {}
        }
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeUserAsUser);
        const includeCareplanAsCareplan = {
            model: this.Careplan,
            required: false,
            as: 'Careplan',
            where: {}
        }
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