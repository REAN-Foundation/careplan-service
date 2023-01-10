import { ArticleModel } from '../../models/assets/article.model';
import { FileResourceModel } from '../../models/file.resource.model';
import { UserModel } from '../../models/user/user.model';
import { ErrorHandler } from '../../../common/error.handler';
import {
    ArticleCreateModel,
    ArticleSearchFilters,
    ArticleSearchResults
} from '../../../domain.types/assets/article.domain.types';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ArticleService {

    //#region Models

    Article = ArticleModel.Model;

    FileResource = FileResourceModel.Model;

    User = UserModel.Model;

    //#endregion

    //#region Publics

    create = async (createModel: ArticleCreateModel) => {
        try {
            if (!createModel.AssetCode) {
                const count = await this.Article.count() + 1;
                createModel.AssetCode = 'Article-' + count.toString();
                const exists = await this.getByCode(createModel.AssetCode);
                if (exists) {
                    createModel.AssetCode = 'Article-' + Helper.generateDisplayId();
                }
            }
            var record = await this.Article.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create article!', error);
        }
    };

    getById = async (id) => {
        try {
            const record = await this.Article.findOne({
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve article!', error);
        }
    };

    getByCode = async (code) => {
        try {
            const record = await this.Article.findOne({
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
            const record = await this.Article.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of article!', error);
        }
    };

    search = async (filters: ArticleSearchFilters): Promise<ArticleSearchResults> => {
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

            const foundResults = await this.Article.findAndCountAll(search);
            const searchResults: ArticleSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search article records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Article.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update article!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update article!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.Article.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete article!', error);
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
        if (filters.Summary) {
            search.where['Summary'] = {
                [Op.like] : '%' + filters.Summary + '%'
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
