import {
    EnrollmentTaskModel
} from '../../models/enrollment/enrollment.task.model';
import {
    EnrollmentModel
} from '../../models/enrollment/enrollment.model';
import {
    ParticipantModel
} from '../../models/enrollment/participant.model';
import {
    CareplanActivityModel
} from '../../models/careplan/careplan.activity.model';
import {
    CareplanModel
} from '../../models/careplan/careplan.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    EnrollmentTaskCreateModel,
    EnrollmentTaskSearchFilters,
    EnrollmentTaskSearchResults
} from '../../../domain.types/enrollment/enrollment.task.domain.types';
import { AssetHelper } from '../assets/asset.helper';
import { Op } from 'sequelize';
///////////////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentTaskService {

    //#region Models

    EnrollmentTask = EnrollmentTaskModel.Model;

    Enrollment = EnrollmentModel.Model;

    Participant = ParticipantModel.Model;

    CareplanActivity = CareplanActivityModel.Model;

    Careplan = CareplanModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: EnrollmentTaskCreateModel) => {
        try {
            var record = await this.EnrollmentTask.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create enrollment schedule!', error);
        }
    };

    getById = async (id) => {
        try {
            const record = await this.EnrollmentTask.findOne({
                where : {
                    id : id
                },
                include : [
                    {
                        model    : this.Enrollment,
                        required : false,
                        as       : 'Enrollment',
                    //through: { attributes: [] }
                    }, {
                        model    : this.Participant,
                        required : false,
                        as       : 'Participant',
                    //through: { attributes: [] }
                    }, {
                        model    : this.CareplanActivity,
                        required : false,
                        as       : 'CareplanActivity',
                    //through: { attributes: [] }
                    }, {
                        model    : this.Careplan,
                        required : false,
                        as       : 'Careplan',
                    //through: { attributes: [] }
                    },
                ]
            });
            const asset = await AssetHelper.getAsset(record.AssetId, record.AssetType);
            record.Asset = asset;
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve enrollment schedule!', error);
        }
    };

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.EnrollmentTask.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of enrollment schedule!', error);
        }
    };

    search = async (filters: EnrollmentTaskSearchFilters): Promise < EnrollmentTaskSearchResults > => {
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

            const foundResults = await this.EnrollmentTask.findAndCountAll(search);
            var searchResults: EnrollmentTaskSearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : foundResults.rows.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : foundResults.rows,
            };

            var items = [];
            for await (var record of searchResults.Items) {
                const asset = await AssetHelper.getAsset(record.AssetId, record.AssetType);
                record.Asset = asset;
                items.push(record);
            }
            searchResults.Items = items;
            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search enrollment schedule records!', error);
        }
    };
    
    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.ParticipantId) {
            search.where['ParticipantId'] = filters.ParticipantId;
        }
        if (filters.AssetId) {
            search.where['AssetId'] = filters.AssetId;
        }
        if (filters.AssetType) {
            search.where['AssetType'] = {
                [Op.like] : '%' + filters.AssetType + '%'
            };
        }
        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId;
        }
        if (filters.TimeSlot) {
            search.where['TimeSlot'] = filters.TimeSlot;
        }
        if (filters.IsRegistrationActivity) {
            search.where['IsRegistrationActivity'] = filters.IsRegistrationActivity;
        }
        if (filters.EnrollmentId) {
            search.where['EnrollmentId'] = filters.EnrollmentId;
        }
        if (filters.ScheduledDate) {
            search.where['ScheduledDate'] = filters.ScheduledDate;
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
            model    : this.Participant,
            required : false,
            as       : 'Participant',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeUserAsUser);
        const includeCareplanActivityAsCareplanActivity = {
            model    : this.CareplanActivity,
            required : false,
            as       : 'CareplanActivity',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeCareplanActivity.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeCareplanActivityAsCareplanActivity);
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
    };

    private addSortingToSearch = (search, filters) => {

        let orderByColumn = 'ScheduledDate';
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
    };

    private addPaginationToSearch = (search, filters) => {

        let limit = 250;
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
    };

    //#endregion

}
