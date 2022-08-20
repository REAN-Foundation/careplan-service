import {
    ParticipantActivityResponseModel
} from '../../models/participant.responses/participant.activity.response.model';
import {
    ParticipantModel
} from '../../models/enrollment/participant.model';
import {
    EnrollmentTaskModel
} from '../../models/enrollment/enrollment.task.model';
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
    ParticipantActivityResponseCreateModel,
    ParticipantActivityResponseSearchFilters,
    ParticipantActivityResponseSearchResults
} from '../../../domain.types/participant.responses/participant.activity.response.domain.types';
import {
    Op
} from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantActivityResponseService {

    //#region Models

    ParticipantActivityResponse = ParticipantActivityResponseModel.Model;

    Participant = ParticipantModel.Model;

    EnrollmentTask = EnrollmentTaskModel.Model;

    CareplanActivity = CareplanActivityModel.Model;

    Careplan = CareplanModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: ParticipantActivityResponseCreateModel) => {
        try {
            var record = await this.ParticipantActivityResponse.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create participant activity response!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.ParticipantActivityResponse.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.Participant,
                    required : false,
                    as       : 'Participant',
                    //through: { attributes: [] }
                }, {
                    model    : this.EnrollmentTask,
                    required : false,
                    as       : 'EnrollmentTask',
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
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve participant activity response!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.ParticipantActivityResponse.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of participant activity response!', error);
        }
    }

    // eslint-disable-next-line max-len
    search = async (filters: ParticipantActivityResponseSearchFilters): Promise < ParticipantActivityResponseSearchResults > => {
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

            const foundResults = await this.ParticipantActivityResponse.findAndCountAll(search);
            const searchResults: ParticipantActivityResponseSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search participant activity response records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.ParticipantActivityResponse.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update participant activity response!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update participant activity response!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.ParticipantActivityResponse.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete participant activity response!', error);
        }
    }

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
        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId;
        }
        if (filters.AssetId) {
            search.where['AssetId'] = filters.AssetId;
        }
        if (filters.AssetType) {
            search.where['AssetType'] = filters.AssetType;
        }
        if (filters.Response) {
            search.where['Response'] = {
                [Op.like] : '%' + filters.Response + '%'
            };
        }
        if (filters.TimeResponded) {
            search.where['TimeResponded'] = filters.TimeResponded;
        }
        if (filters.ProgressStatus) {
            search.where['ProgressStatus'] = filters.ProgressStatus;
        }
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
        const includeEnrollmentTaskAsEnrollmentTask = {
            model    : this.EnrollmentTask,
            required : false,
            as       : 'EnrollmentTask',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeEnrollmentTask.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeEnrollmentTaskAsEnrollmentTask);
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
