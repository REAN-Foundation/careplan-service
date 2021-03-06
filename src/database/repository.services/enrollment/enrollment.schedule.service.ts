import {
    EnrollmentScheduleModel
} from '../../models/enrollment/enrollment.schedule.model';
import {
    EnrollmentModel
} from '../../models/enrollment/enrollment.model';
import {
    UserModel
} from '../../models/user/user.model';
import {
    CareplanScheduleModel
} from '../../models/careplan/careplan.schedule.model';
import {
    CareplanModel
} from '../../models/careplan/careplan.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    EnrollmentScheduleCreateModel,
    EnrollmentScheduleSearchFilters,
    EnrollmentScheduleSearchResults
} from '../../../domain.types/enrollment/enrollment.schedule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentScheduleService {

    //#region Models

    EnrollmentSchedule = EnrollmentScheduleModel.Model();

    Enrollment = EnrollmentModel.Model();

    User = UserModel.Model();

    CareplanSchedule = CareplanScheduleModel.Model();

    Careplan = CareplanModel.Model();

    //#endregion

    //#region Publics

    create = async (createModel: EnrollmentScheduleCreateModel) => {
        try {
            var record = await this.EnrollmentSchedule.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create enrollment schedule!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.EnrollmentSchedule.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.Enrollment,
                    required : false,
                    as       : 'Enrollment',
                    //through: { attributes: [] }
                }, {
                    model    : this.User,
                    required : false,
                    as       : 'User',
                    //through: { attributes: [] }
                }, {
                    model    : this.CareplanSchedule,
                    required : false,
                    as       : 'CareplanSchedule',
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve enrollment schedule!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.EnrollmentSchedule.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of enrollment schedule!', error);
        }
    }

    search = async (filters: EnrollmentScheduleSearchFilters): Promise < EnrollmentScheduleSearchResults > => {
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

            const foundResults = await this.EnrollmentSchedule.findAndCountAll(search);
            const searchResults: EnrollmentScheduleSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search enrollment schedule records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.EnrollmentSchedule.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update enrollment schedule!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update enrollment schedule!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.EnrollmentSchedule.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete enrollment schedule!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.AssetId) {
            search.where['AssetId'] = filters.AssetId;
        }
        if (filters.AssetType) {
            search.where['AssetType'] = filters.AssetType;
        }
        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId;
        }
        if (filters.TimeSlot) {
            search.where['TimeSlot'] = filters.TimeSlot;
        }
        const includeEnrollmentAsEnrollment = {
            model    : this.Enrollment,
            required : false,
            as       : 'Enrollment',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeEnrollment.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeEnrollmentAsEnrollment);
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
        const includeCareplanScheduleAsCareplanSchedule = {
            model    : this.CareplanSchedule,
            required : false,
            as       : 'CareplanSchedule',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeCareplanSchedule.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeCareplanScheduleAsCareplanSchedule);
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
