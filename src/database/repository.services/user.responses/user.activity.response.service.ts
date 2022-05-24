import {
    UserActivityResponseModel
} from '../../models/user.responses/user.activity.response.model';
import {
    UserModel
} from '../models/user.model';
import {
    EnrollmentScheduleModel
} from '../../models/enrollment/enrollment.schedule.model';
import {
    CareplanScheduleModel
} from '../models/careplan.schedule.model';
import {
    CareplanModel
} from '../models/careplan.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    UserActivityResponseCreateModel,
    UserActivityResponseSearchFilters,
    UserActivityResponseSearchResults
} from '../../../domain.types/user.responses/user.activity.response.domain.types';
import {
    Op
} from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserActivityResponseService {

    //#region Models

    UserActivityResponse = UserActivityResponseModel.Model();

    User = UserModel.Model();

    EnrollmentSchedule = EnrollmentScheduleModel.Model();

    CareplanSchedule = CareplanScheduleModel.Model();

    Careplan = CareplanModel.Model();


    //#endregion

    //#region Publics

    create = async (createModel: UserActivityResponseCreateModel) => {
        try {
            var record = await this.UserActivityResponse.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user activity response!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.UserActivityResponse.findOne({
                where: {
                    id: id
                },
                include: [{
                        model: this.User,
                        required: false,
                        as: 'User',
                        //through: { attributes: [] }
                    }, {
                        model: this.EnrollmentSchedule,
                        required: false,
                        as: 'EnrollmentSchedule',
                        //through: { attributes: [] }
                    }, {
                        model: this.CareplanSchedule,
                        required: false,
                        as: 'CareplanSchedule',
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user activity response!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.UserActivityResponse.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user activity response!', error);
        }
    }

    search = async (filters: UserActivityResponseSearchFilters): Promise < UserActivityResponseSearchResults > => {
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

            const foundResults = await this.UserActivityResponse.findAndCountAll(search);
            const searchResults: UserActivityResponseSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search user activity response records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.UserActivityResponse.update(updateModel, {
                    where: {
                        id: id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update user activity response!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update user activity response!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.UserActivityResponse.destroy({
                where: {
                    id: id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user activity response!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where: {},
            include: []
        };

        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId
        }
        if (filters.AssetId) {
            search.where['AssetId'] = filters.AssetId
        }
        if (filters.AssetType) {
            search.where['AssetType'] = filters.AssetType
        }
        if (filters.Response) {
            search.where['Response'] = {
                [Op.like]: '%' + filters.Response + '%'
            }
        }
        if (filters.TimeResponded) {
            search.where['TimeResponded'] = filters.TimeResponded
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
        const includeEnrollmentScheduleAsEnrollmentSchedule = {
            model: this.EnrollmentSchedule,
            required: false,
            as: 'EnrollmentSchedule',
            where: {}
        }
        //if (filters.Xyz != undefined) {
        //    includeEnrollmentSchedule.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeEnrollmentScheduleAsEnrollmentSchedule);
        const includeCareplanScheduleAsCareplanSchedule = {
            model: this.CareplanSchedule,
            required: false,
            as: 'CareplanSchedule',
            where: {}
        }
        //if (filters.Xyz != undefined) {
        //    includeCareplanSchedule.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeCareplanScheduleAsCareplanSchedule);
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