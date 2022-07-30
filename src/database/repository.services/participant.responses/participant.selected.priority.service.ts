import {
    ParticipantSelectedPriorityModel
} from '../../models/participant.responses/participant.selected.priority.model';
import {
    ParticipantModel
} from '../../models/enrollment/participant.model';
import {
    CareplanModel
} from '../../models/careplan/careplan.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    ParticipantSelectedPriorityCreateModel,
    ParticipantSelectedPrioritySearchFilters,
    ParticipantSelectedPrioritySearchResults
} from '../../../domain.types/participant.responses/participant.selected.priority.domain.types';
import {
    Op
} from 'sequelize';
import { EnrollmentModel } from '../../models/enrollment/enrollment.model';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedPriorityService {

    //#region Models

    ParticipantSelectedPriority = ParticipantSelectedPriorityModel.Model;

    Enrollment = EnrollmentModel.Model;

    Participant = ParticipantModel.Model;

    Careplan = CareplanModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: ParticipantSelectedPriorityCreateModel) => {
        try {
            var record = await this.ParticipantSelectedPriority.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create participant selected priority!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.ParticipantSelectedPriority.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.Participant,
                    required : false,
                    as       : 'Participant',
                    //through: { attributes: [] }
                }, {
                    model    : this.Careplan,
                    required : false,
                    as       : 'Careplan',
                    //through: { attributes: [] }
                }, {
                    model    : this.Enrollment,
                    required : false,
                    as       : 'Enrollment',
                    //through: { attributes: [] }
                }
                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve participant selected priority!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.ParticipantSelectedPriority.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of participant selected priority!', error);
        }
    }

    search = async (filters: ParticipantSelectedPrioritySearchFilters):
        Promise < ParticipantSelectedPrioritySearchResults > => {
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

            const foundResults = await this.ParticipantSelectedPriority.findAndCountAll(search);
            const searchResults: ParticipantSelectedPrioritySearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search participant selected priority records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.ParticipantSelectedPriority.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update participant selected priority!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update participant selected priority!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.ParticipantSelectedPriority.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete participant selected priority!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.EnrollmentId) {
            search.where['EnrollmentId'] = filters.EnrollmentId;
        }
        if (filters.ParticipantId) {
            search.where['ParticipantId'] = filters.ParticipantId;
        }
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
        if (filters.AssetCode) {
            search.where['AssetCode'] = filters.AssetCode;
        }
        if (filters.StartDate) {
            search.where['StartDate'] = filters.StartDate;
        }
        const includeEnrollmentAsEnrollment = {
            model    : this.Enrollment,
            required : false,
            as       : 'Enrollment',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeEnrollmentAsEnrollment);
        const includeParticipantAsParticipant = {
            model    : this.Participant,
            required : false,
            as       : 'Participant',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeParticipantAsParticipant);
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
