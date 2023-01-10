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
    CareplanActivityCreateModel,
    CareplanActivitySearchFilters,
    CareplanActivitySearchResults
} from '../../../domain.types/careplan/careplan.activity.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { AssetHelper } from '../assets/asset.helper';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanActivityService {

    //#region Models

    CareplanActivity = CareplanActivityModel.Model;

    Careplan = CareplanModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: CareplanActivityCreateModel) => {
        try {
            var record = await this.CareplanActivity.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create careplan activity!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.CareplanActivity.findOne({
                where : {
                    id : id
                },
                include : [
                    {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve careplan activity!', error);
        }
    }

    getRegistrationActivities = async (careplanId: uuid) => {
        const records = await this.CareplanActivity.findAll({
            where : {
                CareplanId             : careplanId,
                IsRegistrationActivity : true
            }
        });
        return records;
    }

    getScheduledActivities = async (careplanId: uuid) => {
        const records = await this.CareplanActivity.findAll({
            where : {
                CareplanId             : careplanId,
                IsRegistrationActivity : false,
            }
        });
        var sorted = records.sort((a,b) => a.Day - b.Day);
        return sorted;
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.CareplanActivity.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of careplan activity!', error);
        }
    }

    search = async (filters: CareplanActivitySearchFilters): Promise < CareplanActivitySearchResults > => {
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

            const foundResults = await this.CareplanActivity.findAndCountAll(search);
            const searchResults: CareplanActivitySearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search careplan activity records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.CareplanActivity.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update careplan activity!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update careplan activity!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.CareplanActivity.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete careplan activity!', error);
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
        if (filters.IsRegistrationActivity) {
            search.where['IsRegistrationActivity'] = filters.IsRegistrationActivity;
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
