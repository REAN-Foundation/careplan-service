import {
    WordPowerModel
} from '../models/word.power.model';
import {
    UserModel
} from '../models/user.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    WordPowerCreateModel,
    WordPowerSearchFilters,
    WordPowerSearchResults
} from '../../domain.types/assets/word.power.domain.types';
import {
    Op
} from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class WordPowerService {

    //#region Models

    WordPower = WordPowerModel.Model();

    User = UserModel.Model();


    //#endregion

    //#region Publics

    create = async (createModel: WordPowerCreateModel) => {
        try {
            var record = await this.WordPower.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create word power!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.WordPower.findOne({
                where: {
                    id: id
                },
                include: [{
                        model: this.User,
                        required: false,
                        as: 'OwnerUser',
                        //through: { attributes: [] }
                    },

                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve word power!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.WordPower.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of word power!', error);
        }
    }

    search = async (filters: WordPowerSearchFilters): Promise < WordPowerSearchResults > => {
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

            const foundResults = await this.WordPower.findAndCountAll(search);
            const searchResults: WordPowerSearchResults = {
                TotalCount: foundResults.count,
                RetrievedCount: foundResults.rows.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: foundResults.rows,
            };

            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search word power records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.WordPower.update(updateModel, {
                    where: {
                        id: id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update word power!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update word power!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.WordPower.destroy({
                where: {
                    id: id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete word power!', error);
        }
    }

    //#endregion

    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where: {},
            include: []
        };

        if (filters.AssetCode) {
            search.where['AssetCode'] = {
                [Op.like]: '%' + filters.AssetCode + '%'
            }
        }
        if (filters.Word) {
            search.where['Word'] = {
                [Op.like]: '%' + filters.Word + '%'
            }
        }
        if (filters.Description) {
            search.where['Description'] = {
                [Op.like]: '%' + filters.Description + '%'
            }
        }
        if (filters.AdditionalResources) {
            search.where['AdditionalResources'] = {
                [Op.like]: '%' + filters.AdditionalResources + '%'
            }
        }
        if (filters.AssetCategory) {
            search.where['AssetCategory'] = {
                [Op.like]: '%' + filters.AssetCategory + '%'
            }
        }
        if (filters.Tags) {
            search.where['Tags'] = {
                [Op.like]: '%' + filters.Tags + '%'
            }
        }
        if (filters.Version) {
            search.where['Version'] = {
                [Op.like]: '%' + filters.Version + '%'
            }
        }
        const includeUserAsOwnerUser = {
            model: this.User,
            required: false,
            as: 'OwnerUser',
            where: {}
        }
        //if (filters.Xyz != undefined) {
        //    includeUser.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeUserAsOwnerUser);


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