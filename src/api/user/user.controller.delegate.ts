import { UserService } from '../../database/repository.services/user/user.service';
import { SmsService } from '../../modules/communication/sms.service';
import { UserOtpService } from '../../database/repository.services/user/user.otp.service';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { UserValidator as validator } from './user.validator';
import {
    UserDto,
    UserSearchFilters,
    UserSearchResults,
    UserUpdateModel
} from '../../domain.types/user/user.domain.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { Loader } from '../../startup/loader';
import { UserHelper } from '../user.helper';
import { CurrentUser } from '../../domain.types/miscellaneous/current.user';
import { ConfigurationManager } from '../../config/configuration.manager';

///////////////////////////////////////////////////////////////////////////////////////

export class UserControllerDelegate {

    //#region member variables and constructors

    _service: UserService = null;

    _otpService: UserOtpService = null;

    _smsService: SmsService = null;

    constructor() {
        this._service = new UserService();
        this._otpService = new UserOtpService();
        this._smsService = new SmsService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userCreateModel, password } =
            await UserHelper.getValidUserCreateModel(requestBody);

        const record: UserDto = await this._service.create(userCreateModel);
        if (record === null) {
            throw new ApiError('Unable to create user!', 400);
        }

        // if (requestBody.CurrentUserId && dto.Email) {
        //     sendOnboardingEmail(dto, password)
        // }

        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record: UserDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: UserSearchFilters = this.getSearchFilters(query);
        var searchResults: UserSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record: UserDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: UserUpdateModel = await UserHelper.getValidUserUpdateModel(record, requestBody);
        const updated: UserDto = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update user!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record: UserDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('User with id ' + id.toString() + ' cannot be found!');
        }
        const userDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userDeleted
        };
    };

    loginWithPassword = async (requestBody) => {
        await validator.validateLoginWithPasswordRequest(requestBody);
        const loginModel = await this.getLoginModel(requestBody);
        const sentPassword = loginModel.Password;
        const hashedPassword = loginModel.User.Password;
        const validPassword = Helper.compareHashedPassword(sentPassword, hashedPassword);
        if (!validPassword) {
            ErrorHandler.throwUnauthorizedUserError('Invalid password.');
        }
        const user: UserDto = await this._service.getById(loginModel.User.id);
        const loginSession = await this._service.createUserLoginSession(user.id);
        const currentUser: CurrentUser = this.constructCurrentUser(user, loginSession.id);
        const accessToken = await Loader.Authorizer.generateUserSessionToken(currentUser);
        const expiresIn: number = ConfigurationManager.JwtExpiresIn();
        const validTill = new Date(Date.now() + expiresIn * 1000);
        return {
            User             : currentUser,
            AccessToken      : accessToken,
            SessionValidTill : validTill
        };
    };

    getBySessionId = async (sessionId: uuid) => {
        const { user, session } = await this._service.getBySessionId(sessionId);
        if (user === null || session === null) {
            ErrorHandler.throwNotFoundError('User associated with session ' + sessionId.toString() + ' cannot be found! Session may have expired!');
        }
        const currentUser: CurrentUser = this.constructCurrentUser(user, session.id);
        return currentUser;
    };

    loginWithOtp = async (requestBody) => {
        await validator.validateLoginWithOtpRequest(requestBody);
        const loginModel = await this.getLoginModel(requestBody);
        const latestOtp = await this._otpService.getLatestActiveOtp(loginModel.User.id);
        if (latestOtp == null) {
            ErrorHandler.throwUnauthorizedUserError('Invalid OTP');
        }
        if (latestOtp.ValidTill < new Date()) {
            ErrorHandler.throwUnauthorizedUserError('Otp has expired. Please regenerate OTP again!');
        }
        if (latestOtp.Otp !== loginModel.Otp) {
            ErrorHandler.throwUnauthorizedUserError('Invalid OTP. Please try again!');
        }

        // mark OTP as used
        this._otpService.markAsUsed(latestOtp.id);

        const user = await this._service.getById(loginModel.User.id);
        const loginSession = await this._service.createUserLoginSession(user.id);
        const currentUser: CurrentUser = this.constructCurrentUser(user, loginSession.id);
        const accessToken = await Loader.Authorizer.generateUserSessionToken(currentUser);
        currentUser['ImageUrl'] = user.ImageUrl ?? '';
        const expiresIn: number = ConfigurationManager.JwtExpiresIn();
        const validTill = new Date(Date.now() + expiresIn * 1000);
        return {
            User             : currentUser,
            AccessToken      : accessToken,
            SessionValidTill : validTill
        };
    };

    changePassword = async (requestBody) => {
        await validator.validatePasswordChangeRequest(requestBody);
        const passwordResetModel = await this.getPasswordChangeModel(requestBody);
        const validPassword = Helper.compareHashedPassword(
            passwordResetModel.OldPassword,
            passwordResetModel.User.Password);
        if (!validPassword) {
            ErrorHandler.throwUnauthorizedUserError('Invalid old password!');
        }
        const hashedPassword = Helper.generateHashedPassword(passwordResetModel.NewPassword);

        return await this._service.resetPassword(passwordResetModel.User.id, hashedPassword);
    };

    sendOtp = async (requestBody) => {
        await validator.validateSendOtpRequest(requestBody);
        const countryCode = (typeof requestBody.CountryCode !== undefined) ? requestBody.CountryCode : '+91';
        const phone = (typeof requestBody.Phone !== undefined) ? requestBody.Phone : null;
        const user = await this._service.getUser(countryCode, phone, null, null);
        if (user === null) {
            ErrorHandler.throwNotFoundError('User does not exist!');
        }
        const otp = await this._otpService.create(user.id, requestBody.Purpose ?? 'Login');
        if (otp != null) {
            const appIdentifier = 'LMS';
            const phoneStr = countryCode + '-' + phone;
            const message = `Dear ${user.FirstName}, ${otp.Otp} is OTP for your ${appIdentifier} login and will expire in 10 mins.`;
            const sendStatus = await this._smsService.sendSMS(phoneStr, message);
            if (sendStatus) {
                Logger.instance().log('Otp sent successfully.\n ' + JSON.stringify(otp, null, 2));
            }
            return true;
        }
        return false;
    };

    logout = async (userId, sessionId) => {
        await this._service.invalidateUserLoginSession(sessionId);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    getSearchFilters = (query) => {
        var filters = {};
        var roleId = query.roleId ? query.roleId : null;
        if (roleId != null) {
            filters['RoleId'] = roleId;
        }
        var prefix = query.prefix ? query.prefix : null;
        if (prefix != null) {
            filters['Prefix'] = prefix;
        }
        var firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['FirstName'] = firstName;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['LastName'] = lastName;
        }
        var biocubeId = query.biocubeId ? query.biocubeId : null;
        if (biocubeId != null) {
            filters['BiocubeId'] = biocubeId;
        }
        var gender = query.gender ? query.gender : null;
        if (gender != null) {
            filters['Gender'] = gender;
        }
        var state = query.state ? query.state : null;
        if (state != null) {
            filters['State'] = state;
        }
        var country = query.country ? query.country : null;
        if (country != null) {
            filters['Country'] = country;
        }
        var address = query.address ? query.address : null;
        if (address != null) {
            filters['Address'] = address;
        }
        var addedByUserId = query.addedByUserId ? query.addedByUserId : null;
        if (addedByUserId != null) {
            filters['AddedByUserId'] = addedByUserId;
        }
        var lastUpdatedByUserId = query.lastUpdatedByUserId ? query.lastUpdatedByUserId : null;
        if (lastUpdatedByUserId != null) {
            filters['LastUpdatedByUserId'] = lastUpdatedByUserId;
        }
        return filters;
    };

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            BiocubeId           : record.BiocubeId,
            UserName            : record.UserName,
            RoleId              : record.RoleId,
            Prefix              : record.Prefix,
            FirstName           : record.FirstName,
            LastName            : record.LastName,
            CountryCode         : record.CountryCode,
            Phone               : record.Phone,
            Email               : record.Email,
            Gender              : record.Gender,
            BirthDate           : record.BirthDate,
            State               : record.State,
            Country             : record.Country,
            Address             : record.Address,
            AddedByUserId       : record.AddedByUserId,
            LastUpdatedByUserId : record.LastUpdatedByUserId
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            RoleId      : record.RoleId,
            UserName    : record.UserName,
            Prefix      : record.Prefix,
            FirstName   : record.FirstName,
            LastName    : record.LastName,
            CountryCode : record.CountryCode,
            Phone       : record.Phone,
            Email       : record.Email,
            Gender      : record.Gender,
            BirthDate   : record.BirthDate,
        };
    };

    getLoginModel = async (requestBody) => {

        const countryCode = (typeof requestBody.CountryCode !== 'undefined') ? requestBody.CountryCode : '+91';
        const phone = (typeof requestBody.Phone !== 'undefined') ? requestBody.Phone : null;
        const email = (typeof requestBody.Email !== 'undefined') ? requestBody.Email : null;
        const userName = (typeof requestBody.UserName !== 'undefined') ? requestBody.UserName : null;
        const password = (typeof requestBody.Password !== 'undefined') ? requestBody.Password : null;
        const otp = (typeof requestBody.Otp !== 'undefined') ? requestBody.Otp.toString() : null;

        const user = await this._service.getUser(countryCode, phone, email, userName);
        if (user === null) {
            ErrorHandler.throwNotFoundError('User does not exist!');
        }

        return {
            User      : user,
            LoginRole : user.Role.RoleName,
            Password  : password,
            Otp       : otp
        };
    };

    getPasswordChangeModel = async (requestBody) => {
        const oldPassword = requestBody.OldPassword;
        const newPassword = requestBody.NewPassword;
        const user = await this._service.getById(requestBody.CurrentUserId);
        if (user === null) {
            ErrorHandler.throwNotFoundError('User does not exist!');
        }
        return {
            User        : user,
            OldPassword : oldPassword,
            NewPassword : newPassword,
        };
    };

    constructCurrentUser = (user, sessionId): CurrentUser => {
        return {
            UserId        : user.id,
            UserName      : user.UserName,
            CurrentRoleId : user.RoleId,
            DisplayName   : Helper.constructPersonDisplayName(user.Prefix, user.FirstName, user.LastName),
            SessionId     : sessionId,
            Phone         : user.CountryCode + '-' + user.Phone,
            Email         : user.Email
        };
    };

}
