import {
    AnimationModel
} from '../../models/assets/animation.model';
import {
    FileResourceModel
} from '../../models/file.resource.model';
import {
    UserModel
} from '../../models/user/user.model';

import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    AnimationCreateModel,
    AnimationSearchFilters,
    AnimationSearchResults
} from '../../../domain.types/assets/animation.domain.types';
import {
    Op
} from 'sequelize';
import { Helper } from '../../../common/helper';

///////////////////////////////////////////////////////////////////////////////////////////////

export class AnimationService {

    //#region Models

    Animation = AnimationModel.Model;

    FileResource = FileResourceModel.Model;

    User = UserModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: AnimationCreateModel) => {
        try {
            if (!createModel.AssetCode) {
                const count = await this.Animation.count() + 1;
                createModel.AssetCode = 'Animation-' + count.toString();
                const exists = await this.getByCode(createModel.AssetCode);
                if (exists) {
                    createModel.AssetCode = 'Animation-' + Helper.generateDisplayId();
                }
            }
            var record = await this.Animation.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create animation!', error);
        }
    };

    getById = async (id) => {
        try {
            const record = await this.Animation.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.FileResource,
                    required : false,
                    as       : 'FileResource',
                    //through: { attributes: [] }
                }
                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve animation!', error);
        }
    };

    getByCode = async (code) => {
        try {
            const record = await this.Animation.findOne({
                where : {
                    AssetCode : code
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve action plan!', error);
        }
    };

    exists = async (id): Promise<boolean> => {
        try {
            const record = await this.Animation.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of animation!', error);
        }
    };

    search = async (filters: AnimationSearchFilters): Promise<AnimationSearchResults> => {
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

            const foundResults = await this.Animation.findAndCountAll(search);
            const searchResults: AnimationSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search animation records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Animation.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update animation!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update animation!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.Animation.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete animation!', error);
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
        if (filters.Transcript) {
            search.where['Transcript'] = {
                [Op.like] : '%' + filters.Transcript + '%'
            };
        }
        if (filters.Url) {
            search.where['Url'] = {
                [Op.like] : '%' + filters.Url + '%'
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
        const includeFileResourceAsFileResource = {
            model    : this.FileResource,
            required : false,
            as       : 'FileResource',
            where    : {}
        };
        //if (filters.Xyz != undefined) {
        //    includeFileResource.where['Xyz'] = filters.Xyz;
        //}
        search.include.push(includeFileResourceAsFileResource);

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
