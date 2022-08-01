import { ParticipantModel } from '../../models/enrollment/participant.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantService {

    Participant = ParticipantModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Participant.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create participant!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Participant.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve participant!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Participant.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of participant!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.DisplayId) {
                search.where['DisplayId'] = filters.DisplayId;
            }
            if (filters.Prefix) {
                search.where['Prefix'] = filters.Prefix;
            }
            if (filters.FirstName) {
                search.where['FirstName'] = {
                    [Op.like] : '%' + filters.FirstName + '%'
                };
            }
            if (filters.LastName) {
                search.where['LastName'] = {
                    [Op.like] : '%' + filters.LastName + '%'
                };
            }
            if (filters.ParticipantReferenceId) {
                search.where['ParticipantReferenceId'] = {
                    [Op.like] : '%' + filters.ParticipantReferenceId + '%'
                };
            }
            if (filters.Gender) {
                search.where['Gender'] = filters.Gender;
            }
            if (filters.Country) {
                search.where['Country'] = {
                    [Op.like] : '%' + filters.Country + '%'
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

            const foundResults = await this.Participant.findAndCountAll(search);
            const searchResults = {
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search participant records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Participant.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update participant!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update participant!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Participant.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete participant!', error);
        }
    }

    getParticipantWithPhone = async (countryCode, phone) => {
        try {
            const record = await this.Participant.findOne({
                where : {
                    CountryCode : countryCode,
                    Phone       : phone,
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if participant exists with phone!', error);
        }
    };

    getParticipantWithEmail = async (email) => {
        try {
            const record = await this.Participant.findOne({
                where : {
                    Email : email
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if participant exists with email!', error);
        }
    }

}
