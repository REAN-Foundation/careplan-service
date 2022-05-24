import {
    WebNewsfeedModel
} from '../models/web.newsfeed.model';
import {
    UserModel
} from '../models/user.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    WebNewsfeedCreateModel,
    WebNewsfeedSearchFilters,
    WebNewsfeedSearchResults
} from '../../domain.types/assets/web.newsfeed.domain.types';
import {
    Op
} from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class WebNewsfeedService {

    //#region Models

    WebNewsfeed = WebNewsfeedModel.Model();

    User = UserModel.Model();


    //#endregion

    //#region Publics

    create = async (createModel: WebNewsfeedCreateModel) => {
        try {
            var record = await this.WebNewsfeed.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create web newsfeed!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.WebNewsfeed.findOne({
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve web newsfeed!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.WebNewsfeed.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of web newsfeed!', error);
        }
    }

    search = async (filters: WebNewsfeedSearchFilters): Promise < WebNewsfeedSearchResults > => {
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

            const foundResults = await this.WebNewsfeed.findAndCountAll(search);
            const searchResults: WebNewsfeedSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search web newsfeed records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.WebNewsfeed.update(updateModel, {
                    where: {
                        id: id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update web newsfeed!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update web newsfeed!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.WebNewsfeed.destroy({
                where: {
                    id: id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete web newsfeed!', error);
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
        if (filters.Name) {
            search.where['Name'] = {
                [Op.like]: '%' + filters.Name + '%'
            }
        }
        if (filters.Description) {
            search.where['Description'] = {
                [Op.like]: '%' + filters.Description + '%'
            }
        }
        if (filters.Url) {
            search.where['Url'] = {
                [Op.like]: '%' + filters.Url + '%'
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