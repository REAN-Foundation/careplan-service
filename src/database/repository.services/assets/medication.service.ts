import {
    MedicationModel
} from '../../models/assets/medication.model';
import {
    UserModel
} from '../../models/user/user.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    MedicationCreateModel,
    MedicationSearchFilters,
    MedicationSearchResults
} from '../../../domain.types/assets/medication.domain.types';
import {
    Op
} from 'sequelize';
import { Helper } from '../../../common/helper';

///////////////////////////////////////////////////////////////////////////////////////////////

export class MedicationService {

    //#region Models

    Medication = MedicationModel.Model;

    User = UserModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: MedicationCreateModel) => {
        try {
            if (!createModel.AssetCode) {
                const count = await this.Medication.count() + 1;
                createModel.AssetCode = 'Medication-' + count.toString();
                const exists = await this.getByCode(createModel.AssetCode);
                if (exists) {
                    createModel.AssetCode = 'Medication-' + Helper.generateDisplayId();
                }
            }
            var record = await this.Medication.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create medication!', error);
        }
    };

    getById = async (id) => {
        try {
            const record = await this.Medication.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve medication!', error);
        }
    };

    getByCode = async (code) => {
        try {
            const record = await this.Medication.findOne({
                where : {
                    AssetCode : code
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve action plan!', error);
        }
    };

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.Medication.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of medication!', error);
        }
    };

    search = async (filters: MedicationSearchFilters): Promise < MedicationSearchResults > => {
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

            const foundResults = await this.Medication.findAndCountAll(search);
            const searchResults: MedicationSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search medication records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Medication.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update medication!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update medication!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.Medication.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete medication!', error);
        }
    };

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.AssetCode) {
            search.where['AssetCode'] = {
                [Op.like] : '%' + filters.AssetCode + '%'
            };
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
        if (filters.AssetCategory) {
            search.where['AssetCategory'] = {
                [Op.like] : '%' + filters.AssetCategory + '%'
            };
        }
        if (filters.Tags) {
            search.where['Tags'] = {
                [Op.like] : '%' + filters.Tags + '%'
            };
        }
        if (filters.Version) {
            search.where['Version'] = {
                [Op.like] : '%' + filters.Version + '%'
            };
        }

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
