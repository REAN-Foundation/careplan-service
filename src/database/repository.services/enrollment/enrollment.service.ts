import {
    EnrollmentModel
} from '../../models/enrollment/enrollment.model';
import {
    CareplanModel
} from '../../models/careplan/careplan.model';
import {
    ParticipantModel
} from '../../../database/models/enrollment/participant.model';
import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    EnrollmentCreateModel,
    EnrollmentSearchFilters,
    EnrollmentSearchResults
} from '../../../domain.types/enrollment/enrollment.domain.types';
import {
    ParticipantActivityResponseModel
} from '../../../database/models/participant.responses/participant.activity.response.model';
import { EnrollmentTaskModel } from '../../../database/models/enrollment/enrollment.task.model';
import { Op } from "sequelize";
import { CareplanCategoryModel } from '../../../database/models/careplan/careplan.category.model';

///////////////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentService {

    //#region Models

    Enrollment = EnrollmentModel.Model;

    Careplan = CareplanModel.Model;

    Participant = ParticipantModel.Model;

    ParticipantActivityResponse = ParticipantActivityResponseModel.Model;

    EnrollmentTask = EnrollmentTaskModel.Model;

    CareplanCatrgory = CareplanCategoryModel.Model;
    //#endregion

    //#region Publics

    create = async (createModel: EnrollmentCreateModel) => {
        try {
            var record = await this.Enrollment.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create enrollment!', error);
        }
    };

    getById = async (id) => {
        try {
            const record = await this.Enrollment.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.Careplan,
                    required : false,
                    as       : 'Careplan',
                    //through: { attributes: [] }
                    include  : [{
                        model    : this.CareplanCatrgory,
                        required : false,
                        as       : 'Category',
                    }
                    ],
                    
                },
                {
                    model    : this.Participant,
                    required : false,
                    as       : 'Participant',
                    //through: { attributes: [] }
                },

                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve enrollment stats!', error);
        }
    };

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.Enrollment.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of enrollment!', error);
        }
    };

    search = async (filters: EnrollmentSearchFilters): Promise < EnrollmentSearchResults > => {
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

            const foundResults = await this.Enrollment.findAndCountAll(search);
            const searchResults: EnrollmentSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search enrollment records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Enrollment.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update enrollment!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update enrollment!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.Enrollment.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete enrollment!', error);
        }
    };

    getEnrollmentStats = async (participantId) => {
        try {
            const totalTasks = await this.EnrollmentTask.findAll({
                where : {
                    ParticipantId : participantId,
                },
            });
            const ongoingTasks = await this.EnrollmentTask.findAll({
                where : {
                    ParticipantId : participantId,
                    ScheduledDate : {
                        [Op.lte] : new Date()
                    }
                },
            });
            
            const completedTask = await this.ParticipantActivityResponse.findAll({
                where : {
                    ParticipantId : participantId,
                },
            });

            const enrollment = await this.Enrollment.findOne({
                where : {
                    ParticipantId : participantId,
                },
            });

            //Calculating current week by enrollment start date
            const currentDate = new Date();
            const startDate = enrollment.StartDate;
            const endDate = enrollment.EndDate;
            const days = Math.floor((currentDate.getTime() - startDate.getTime()) /
                (24 * 60 * 60 * 1000));
            const currentWeek = Math.ceil(days / 7);

            //Calculating no of week by enrollment start date and end date

            const week =  function diff_weeks(startDate:Date, endDate:Date)
            {
                var diff = (startDate.getTime() - endDate.getTime()) / 1000;
                diff /= (60 * 60 * 24 * 7);
                return Math.abs(Math.round(diff));
            };
            const totalWeek = (week(startDate, endDate));
            const record = {
                TolalTask    : totalTasks.length,
                FinishedTask : completedTask.length,
                DelayedTask  : (ongoingTasks.length - completedTask.length),
                UnservedTask : (totalTasks.length -
                    ((ongoingTasks.length - completedTask.length) + completedTask.length)),
                CurrentWeek : currentWeek,
                TotalWeek   : totalWeek
            };
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve enrollment stats!', error);
        }
    };

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.CareplanId) {
            search.where['CareplanId'] = filters.CareplanId;
        }
        if (filters.CareplanName) {
            search.where['CareplanName'] = filters.CareplanName;
        }
        if (filters.ProgressStatus) {
            search.where['ProgressStatus'] = filters.ProgressStatus;
        }
        if (filters.DisplayId) {
            search.where['DisplayId'] = filters.DisplayId;
        }
        if (filters.StartDate) {
            search.where['StartDate'] = filters.StartDate;
        }
        if (filters.EndDate) {
            search.where['EndDate'] = filters.EndDate;
        }

        const includeCareplanAsCareplan = {
            model    : this.Careplan,
            required : true,
            as       : 'Careplan',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeCareplan.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeCareplanAsCareplan);
        const includeParticipantAsParticipant = {
            model    : this.Participant,
            required : true,
            as       : 'Participant',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeParticipantAsParticipant);

        return search;
    };

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
    };

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
    };

    //#endregion

}
