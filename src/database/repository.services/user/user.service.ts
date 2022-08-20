import { UserModel } from '../../models/user/user.model';
import { UserLoginSessionModel } from '../../models/user/user.login.session.model';
import { RoleModel } from '../../models/role.model';
import { UserRoleModel } from '../../models/user/user.role.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { passwordStrength } from 'check-password-strength';
import { Helper } from '../../../common/helper';
import { TimeHelper } from '../../../common/time.helper';
import { DurationType } from '../../../domain.types/miscellaneous/time.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserService {

    User = UserModel.Model;

    Role = RoleModel.Model;

    UserRole = UserRoleModel.Model;

    UserLoginSession = UserLoginSessionModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.User.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.User.findOne({
                where : {
                    id : id
                }
            });
            if (record) {
                const userRole = await this.UserRole.findOne({
                    where : {
                        UserId : record.id
                    }
                });
                if (userRole) {
                    const role = await this.Role.findByPk(userRole.RoleId);
                    record['Role'] = role;
                }
            }
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.User.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of user!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.RoleId) {
                search.where['RoleId'] = {
                    [Op.like] : '%' + filters.RoleId + '%'
                };
            }
            if (filters.Prefix) {
                search.where['Prefix'] = filters.Prefix;
            }
            if (filters.FirstName) {
                search.where['FirstName'] = filters.FirstName;
            }
            if (filters.LastName) {
                search.where['LastName'] = filters.LastName;
            }
            if (filters.BiocubeId) {
                search.where['BiocubeId'] = filters.BiocubeId;
            }
            if (filters.Gender) {
                search.where['Gender'] = filters.Gender;
            }
            if (filters.State) {
                search.where['State'] = {
                    [Op.like] : '%' + filters.State + '%'
                };
            }
            if (filters.Country) {
                search.where['Country'] = {
                    [Op.like] : '%' + filters.Country + '%'
                };
            }
            if (filters.Address) {
                search.where['Address'] = {
                    [Op.like] : '%' + filters.Address + '%'
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

            const foundResults = await this.User.findAndCountAll(search);
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search user records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.User.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update user!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update user!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.User.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete user!', error);
        }
    }

    getUserWithPhone = async (countryCode, phone) => {
        try {
            const record = await this.User.findOne({
                where : {
                    CountryCode : countryCode,
                    Phone       : phone,
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if user exists with phone!', error);
        }
    };

    getUserWithEmail = async (email) => {
        try {
            const record = await this.User.findOne({
                where : {
                    Email : email
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if user exists with email!', error);
        }
    }

    getUserWithUserName = async (username) => {
        try {
            const record = await this.User.findOne({
                where : {
                    UserName : username
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check username!', error);
        }
    }

    generateUserNameIfDoesNotExist = async (userName) => {
        var tmpUsername = userName ?? Helper.generateUserName();
        while (await this.getUserWithUserName(tmpUsername) != null) {
            tmpUsername = Helper.generateUserName();
        }
        return tmpUsername;
    }

    getUser = async (
        countryCode,
        phone,
        email,
        userName
    ) => {

        var filters = [];

        if (phone !== null && countryCode !== null) {
            filters.push({
                Phone       : phone,
                CountryCode : countryCode
            });
        }
        else if (email !== null) {
            filters.push({
                Email : { [Op.like]: "%" + email + "%" }
            });
        }
        else if (userName !== null) {
            filters.push({
                UserName : userName
            });
        }
        const user = await this.User.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!user) {
            return null;
        }

        var role = await this.Role.findByPk(user.RoleId);
        user['Role'] = role;

        return user;
    }

    getUserUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'Prefix')) {
            updateModel.Prefix = inputModel.Prefix;
        }
        if (Helper.hasProperty(inputModel, 'FirstName')) {
            updateModel.FirstName = inputModel.FirstName;
        }
        if (Helper.hasProperty(inputModel, 'LastName')) {
            updateModel.LastName = inputModel.LastName;
        }
        if (Helper.hasProperty(inputModel, 'Phone')) {
            updateModel.Phone = inputModel.Phone;
        }
        if (Helper.hasProperty(inputModel, 'Email')) {
            updateModel.Email = inputModel.Email;
        }
        if (Helper.hasProperty(inputModel, 'Password')) {
            updateModel.Password = Helper.hash(inputModel.Password);
        }
        if (Helper.hasProperty(inputModel, 'ImageUrl')) {
            updateModel.ImageUrl = inputModel.ImageUrl;
        }
        if (Helper.hasProperty(inputModel, 'Gender')) {
            updateModel.Gender = inputModel.Gender;
        }
        if (Helper.hasProperty(inputModel, 'BirthDate')) {
            updateModel.BirthDate = inputModel.BirthDate;
        }

        return updateModel;
    }

    createUserLoginSession = async (userId) => {
        try {
            var now = new Date();
            var till = TimeHelper.addDuration(now, 3, DurationType.Day);
            var record = await this.UserLoginSession.create({
                UserId    : userId,
                IsActive  : true,
                StartedAt : now,
                ValidTill : till
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create user login session!', error);
        }
    }

    invalidateUserLoginSession = async (sessionId) => {
        try {
            var record = await this.UserLoginSession.findByPk(sessionId);
            record.IsActive = false;
            await record.save();
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to invalidate user login session!', error);
        }
    }

    isValidUserLoginSession = async (sessionId) => {
        try {
            var record = await this.UserLoginSession.findByPk(sessionId);
            if (record == null) {
                return false;
            }
            if (record.ValidTill < new Date()) {
                return false;
            }
            if (record.IsActive === false) {
                return false;
            }
            return true;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to determine validity of user login session!', error);
        }
    }

    getBySessionId = async (sessionId) => {
        try {
            var session = await this.UserLoginSession.findByPk(sessionId);
            if (session == null) {
                return null;
            }
            if (session.ValidTill < new Date()) {
                return null;
            }
            if (session.IsActive === false) {
                return null;
            }

            var user = await this.User.findOne({
                where : {
                    id : session.UserId
                }
            });

            if (user) {
                const userRole = await this.UserRole.findOne({
                    where : {
                        UserId : session.id
                    }
                });
                if (userRole) {
                    const role = await this.Role.findByPk(userRole.RoleId);
                    user['Role'] = role;
                }
            }
            return user;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve user for the session!', error);
        }
    }

    resetPassword = async (userId, hashedPassword) => {
        try {
            var res = await this.User.update(
                { Password: hashedPassword },
                { where: { id: userId } }
            );
            if (res.length !== 1) {
                throw new Error('Unable to reset password!');
            }

            return true;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to reset password!', error);
        }
    }

    validatePasswordCriteria = (password) => {
        var strength = passwordStrength(password);
        if (strength.length < 8 || strength.contains.length < 4) {
            //Criteria is min 8 characters and contains minimum diversities such as
            //'lowercase', 'uppercase', 'symbol', 'number'
            ErrorHandler.throwInputValidationError(['Password does not match security criteria!']);
        }
    }

}
