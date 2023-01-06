import { CareplanModel } from '../../models/careplan/careplan.model';
import { CareplanCategoryModel } from '../../models/careplan/careplan.category.model';
import { UserModel } from '../../models/user/user.model';
import { ErrorHandler } from '../../../common/error.handler';
import { CareplanCreateModel } from '../../../domain.types/careplan/careplan.domain.types';
import { CareplanDto, CareplanSearchFilters, CareplanSearchResults } from '../../../domain.types/careplan/careplan.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanService {

    //#region Models

    Careplan = CareplanModel.Model;

    CareplanCategory = CareplanCategoryModel.Model;

    User = UserModel.Model;

    //#endregion

    create = async (createModel: CareplanCreateModel): Promise<CareplanDto> => {
        try {
            var record = await this.Careplan.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create care plan!', error);
        }
    }

    getById = async (id): Promise<CareplanDto> => {
        try {
            var record = await this.Careplan.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.CareplanCategory,
                    required : false,
                    as       : 'Category',
                    //through: { attributes: [] }
                }
                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve care plan!', error);
        }
    }

    exists = async (code): Promise<uuid> => {
        try {
            const record = await this.Careplan.findOne(
                {
                    where : {
                        Code : code
                    }
                }
            );
            return record.id;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of care plan!', error);
        }
    }

    search = async (filters: CareplanSearchFilters): Promise<CareplanSearchResults> => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.Code) {
                search.where['Code'] = filters.Code;
            }
            if (filters.CategoryId) {
                search.where['CategoryId'] = filters.CategoryId;
            }
            if (filters.Name) {
                search.where['Name'] =
                 {
                     [Op.like] : '%' + filters.Name + '%'
                 };
            }
            if (filters.Version) {
                search.where['Version'] = filters.Version;
            }
            if (filters.OwnerUserId) {
                search.where['OwnerUserId'] = filters.OwnerUserId;
            }
            if (filters.Tags) {
                search.where['Tags'] = filters.Tags;
            }
            if (filters.IsActive) {
                search.where['IsActive'] = filters.IsActive;
            }
            const includeCareplanCategoryAsCategory = {
                model    : this.CareplanCategory,
                required : false,
                as       : 'Category',
                where    : {}
            };
            //if (filters.Xyz != undefined) {
            //    includeCareplanCategory.where['Xyz'] = filters.Xyz;
            //}
            search.include.push(includeCareplanCategoryAsCategory);

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

            const foundResults = await this.Careplan.findAndCountAll(search);
            const searchResults: CareplanSearchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search care plan records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Careplan.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update care plan!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update care plan!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Careplan.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete care plan!', error);
        }
    }

}
///////////////////////////////////////////////////////////////////////////////////////////////
