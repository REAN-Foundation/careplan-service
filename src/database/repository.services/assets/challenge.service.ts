import {
    ChallengeModel
} from '../../models/assets/challenge.model';
import {
    UserModel
} from '../../models/user/user.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    ChallengeCreateModel,
    ChallengeSearchFilters,
    ChallengeSearchResults
} from '../../../domain.types/assets/challenge.domain.types';
import {
    Op
} from 'sequelize';
import { Helper } from '../../../common/helper';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ChallengeService {

    //#region Models

    Challenge = ChallengeModel.Model;

    User = UserModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: ChallengeCreateModel) => {
        try {
            if (!createModel.AssetCode) {
                const count = await this.Challenge.count() + 1;
                createModel.AssetCode = 'Challenge-' + count.toString();
                const exists = await this.getByCode(createModel.AssetCode);
                if (exists) {
                    createModel.AssetCode = 'Challenge-' + Helper.generateDisplayId();
                }
            }
            var record = await this.Challenge.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create challenge!', error);
        }
    };

    getByCode = async (code) => {
        try {
            const record = await this.Challenge.findOne({
                where : {
                    AssetCode : code
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve action plan!', error);
        }
    };

    getById = async (id) => {
        try {
            const record = await this.Challenge.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve challenge!', error);
        }
    };

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.Challenge.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of challenge!', error);
        }
    };

    search = async (filters: ChallengeSearchFilters): Promise < ChallengeSearchResults > => {
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

            const foundResults = await this.Challenge.findAndCountAll(search);
            const searchResults: ChallengeSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search challenge records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Challenge.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update challenge!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update challenge!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.Challenge.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete challenge!', error);
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
