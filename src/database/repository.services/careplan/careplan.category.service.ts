import { CareplanCategoryModel } from '../../models/careplan/careplan.category.model';
import { ErrorHandler } from '../../../common/error.handler';
import { CareplanCategoryCreateModel } from '../../../domain.types/careplan/careplan.category.domain.types';
import { CareplanCategoryDto, CareplanCategorySearchFilters, CareplanCategorySearchResults } from '../../../domain.types/careplan/careplan.category.domain.types';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanCategoryService {

    CareplanCategory = CareplanCategoryModel.Model;

    create = async (createModel: CareplanCategoryCreateModel): Promise < CareplanCategoryDto > => {
        try {
            var record = await this.CareplanCategory.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create careplan category!', error);
        }
    }

    getById = async (id): Promise < CareplanCategoryDto > => {
        try {
            var record = await this.CareplanCategory.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve careplan category!', error);
        }
    }

    exists = async (id): Promise < boolean > => {
        try {
            const record = await this.CareplanCategory.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of careplan category!', error);
        }
    }

    existsByName = async (typeName): Promise < boolean > => {
        try {
            const record = await this.CareplanCategory.findOne({
                where : sequelize.where(sequelize.fn('lower', sequelize.col('Type')), sequelize.fn('lower', typeName))
            });
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of careplan category!', error);
        }
    }

    getCareplanCategories = async (): Promise < string[] > => {
        try {
            const records = await this.CareplanCategory.findAll();
            var categories = records.map(x => x.Type).sort();
            return categories;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to find careplan categories!', error);
        }
    }

    search = async (filters: CareplanCategorySearchFilters): Promise < CareplanCategorySearchResults > => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.Type) {
                search.where['Type'] = {
                    [Op.like] : '%' + filters.Type + '%'
                };
            }

            //Sorting
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
                //In case the order-by attribute is on associated model
                //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
            }

            //Pagination
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

            const foundResults = await this.CareplanCategory.findAndCountAll(search);
            const searchResults: CareplanCategorySearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search careplan category records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.CareplanCategory.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update careplan category!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update careplan category!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.CareplanCategory.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete careplan category!', error);
        }
    }

}
///////////////////////////////////////////////////////////////////////////////////////////////
