import {
    ParticipantSelectedActionPlanModel
} from '../../models/participant.responses/participant.selected.action.plan.model';
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
    ParticipantSelectedActionPlanCreateModel,
    ParticipantSelectedActionPlanSearchFilters,
    ParticipantSelectedActionPlanSearchResults
} from '../../../domain.types/participant.responses/participant.selected.action.plan.domain.types';
import {
    Op
} from 'sequelize';
import { EnrollmentModel } from '../../models/enrollment/enrollment.model';
import { ParticipantSelectedGoalModel } from '../../models/participant.responses/participant.selected.goal.model';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedActionPlanService {

    //#region Models

    ParticipantSelectedActionPlan = ParticipantSelectedActionPlanModel.Model;

    Enrollment = EnrollmentModel.Model;

    Participant = ParticipantModel.Model;

    ParticipantSelectedGoal = ParticipantSelectedGoalModel.Model;

    Careplan = CareplanModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: ParticipantSelectedActionPlanCreateModel) => {
        try {
            var record = await this.ParticipantSelectedActionPlan.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to get participant selected action plan!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.ParticipantSelectedActionPlan.findOne({
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
                }, {
                    model    : this.ParticipantSelectedGoal,
                    required : false,
                    as       : 'SelectedGoal',
                    //through: { attributes: [] }
                }

                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve participant selected action plan!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.ParticipantSelectedActionPlan.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of participant selected action plan!', error);
        }
    }

    search = async (filters: ParticipantSelectedActionPlanSearchFilters):
        Promise < ParticipantSelectedActionPlanSearchResults > => {
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

            const foundResults = await this.ParticipantSelectedActionPlan.findAndCountAll(search);
            const searchResults: ParticipantSelectedActionPlanSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search participant selected action plan records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.ParticipantSelectedActionPlan.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update participant selected action plan!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update participant selected action plan!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.ParticipantSelectedActionPlan.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete participant selected action plan!', error);
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
        if (filters.GoalId) {
            search.where['GoalId'] = filters.GoalId;
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
        if (filters.AdditionalDetails) {
            search.where['AdditionalDetails'] = {
                [Op.like] : '%' + filters.AdditionalDetails + '%'
            };
        }
        if (filters.StartDate) {
            search.where['StartDate'] = filters.StartDate;
        }
        if (filters.EndDate) {
            search.where['EndDate'] = filters.EndDate;
        }
        if (filters.ProgressStatus) {
            search.where['ProgressStatus'] = filters.ProgressStatus;
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
        const includeGoalAsGoal = {
            model    : this.ParticipantSelectedGoal,
            required : false,
            as       : 'SelectedGoal',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeGoalAsGoal);
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
