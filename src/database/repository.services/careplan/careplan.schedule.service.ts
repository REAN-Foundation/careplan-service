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
    CareplanScheduleCreateModel,
    CareplanScheduleSearchFilters,
    CareplanScheduleSearchResults
} from '../../../domain.types/careplan/careplan.schedule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanScheduleService {

    //#region Models

    CareplanSchedule = CareplanScheduleModel.Model();

    Careplan = CareplanModel.Model();

    //#endregion

    //#region Publics

    create = async (createModel: CareplanScheduleCreateModel) => {
        try {
            var record = await this.CareplanSchedule.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create careplan schedule!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.CareplanSchedule.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.Careplan,
                    required : false,
                    as       : 'Careplan',
                    //through: { attributes: [] }
                },

                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve careplan schedule!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.CareplanSchedule.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of careplan schedule!', error);
        }
    }

    search = async (filters: CareplanScheduleSearchFilters): Promise < CareplanScheduleSearchResults > => {
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

            const foundResults = await this.CareplanSchedule.findAndCountAll(search);
            const searchResults: CareplanScheduleSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search careplan schedule records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.CareplanSchedule.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update careplan schedule!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update careplan schedule!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.CareplanSchedule.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete careplan schedule!', error);
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
        if (filters.Day) {
            search.where['Day'] = filters.Day;
        }
        if (filters.TimeSlot) {
            search.where['TimeSlot'] = filters.TimeSlot;
        }
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
