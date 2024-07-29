'use strict';

import { Helper } from '../common/helper';
import { UserService } from '../database/repository.services/user/user.service';
import { ErrorHandler } from '../common/error.handler';
import { UserCreateModel } from '../domain.types/user/user.domain.types';
import { ParticipantService } from '../database/repository.services/enrollment/participant.service';

////////////////////////////////////////////////////////////////////////

export class UserHelper {

    static getUserCreateModel = (requestBody): UserCreateModel => {

        const birthDate = requestBody.BirthDate ? Date.parse(requestBody.BirthDate) : null;

        return {
            RoleId      : requestBody.RoleId ? requestBody.RoleId : null,
            Prefix      : requestBody.Prefix ? requestBody.Prefix : 'Mr',
            UserName    : requestBody.UserName ? requestBody.UserName : null,
            FirstName   : requestBody.FirstName ? requestBody.FirstName : null,
            LastName    : requestBody.LastName ? requestBody.LastName : null,
            CountryCode : requestBody.CountryCode ? requestBody.CountryCode : '+91',
            Phone       : requestBody.Phone ? requestBody.Phone : null,
            Email       : requestBody.Email ? requestBody.Email : null,
            Gender      : requestBody.Gender ? requestBody.Gender : 'Male',
            BirthDate   : new Date(birthDate),
            Password    : requestBody.Password ? requestBody.Password : null,
        };
    };

    static getValidUserCreateModel = async (requestBody) => {

        const userService = new UserService();

        var password = requestBody.Password;
        if (!password) {
            password = Helper.generatePassword();
        }
        else {
            userService.validatePasswordCriteria(password);
        }
        requestBody.Password = Helper.generateHashedPassword(password);

        //NOTE: please note that we are keeping user-name same as that of biocube id
        var userName = requestBody.UserName;
        if (!userName) {
            userName = await userService.generateUserNameIfDoesNotExist(requestBody.UserName);
        }
        requestBody.UserName = userName;

        requestBody.CountryCode = requestBody.CountryCode ?? "+91";
        var userWithPhone = await userService.getUserWithPhone(requestBody.CountryCode, requestBody.Phone);
        if (userWithPhone) {
            ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.CountryCode} ${requestBody.Phone.toString()} already exists!`);
        }

        var userWithUserName = await userService.getUserWithUserName(requestBody.UserName);
        if (userWithUserName) {
            ErrorHandler.throwDuplicateUserError(`User with user-name/biocube-id ${requestBody.UserName} already exists!`);
        }

        var userWithEmail = await userService.getUserWithEmail(requestBody.Email);
        if (userWithEmail) {
            ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
        }

        var userCreateModel: UserCreateModel = await this.getUserCreateModel(requestBody);
        return { userCreateModel, password };
    };

    static getValidParticipantCreateModel = async (requestBody) => {

        const participantService = new ParticipantService();

        requestBody.CountryCode = requestBody.CountryCode ?? "+91";
        var userWithPhone =
            await participantService.getParticipantWithPhone(requestBody.CountryCode, requestBody.Phone);
        if (userWithPhone) {
            ErrorHandler.throwDuplicateUserError(`Participant with phone ${requestBody.CountryCode} ${requestBody.Phone.toString()} already exists!`);
        }

    };

    static getValidParticipantUpdateModel = async (user, requestBody) => {

        const participantService = new ParticipantService();

        const updateModel: any = {};

        if (Helper.hasProperty(requestBody, 'DisplayId')) {
            updateModel.DisplayId = requestBody.DisplayId;
        }
        if (Helper.hasProperty(requestBody, 'Prefix')) {
            updateModel.Prefix = requestBody.Prefix;
        }
        if (Helper.hasProperty(requestBody, 'FirstName')) {
            updateModel.FirstName = requestBody.FirstName;
        }
        if (Helper.hasProperty(requestBody, 'LastName')) {
            updateModel.LastName = requestBody.LastName;
        }
        if (Helper.hasProperty(requestBody, 'CountryCode') && Helper.hasProperty(requestBody, 'Phone')) {
            var userWithPhone =
                await participantService.getParticipantWithPhone(requestBody.CountryCode, requestBody.Phone);
            if (userWithPhone) {
                ErrorHandler.throwDuplicateUserError(`Other participant with phone ${requestBody.CountryCode} ${requestBody.Phone.toString()} already exists!`);
            }
            updateModel.CountryCode = requestBody.CountryCode;
            updateModel.Phone = requestBody.Phone;
        }
        else if (Helper.hasProperty(requestBody, 'Phone')) {
            var userWithPhone = await participantService.getParticipantWithPhone(user.CountryCode, requestBody.Phone);
            if (userWithPhone && user.id !== userWithPhone.id) {
                ErrorHandler.throwDuplicateUserError(`Other participant with phone ${user.CountryCode} ${requestBody.Phone.toString()} already exists!`);
            }
            updateModel.Phone = requestBody.Phone;
        }
        else if (Helper.hasProperty(requestBody, 'CountryCode')) {
            var userWithCountryCode =
                await participantService.getParticipantWithPhone(requestBody.CountryCode, user.Phone);
            if (userWithCountryCode && user.id !== userWithCountryCode.id) {
                ErrorHandler.throwDuplicateUserError(`Other participant with phone ${requestBody.CountryCode} ${user.Phone.toString()} already exists!`);
            }
            updateModel.CountryCode = requestBody.CountryCode;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            var userWithEmail = await participantService.getParticipantWithEmail(requestBody.Email);
            if (userWithEmail && user.id !== userWithEmail.id) {
                ErrorHandler.throwDuplicateUserError(`Other participant with email ${requestBody.Email} already exists!`);
            }
            updateModel.Email = requestBody.Email;
        }
        if (Helper.hasProperty(requestBody, 'ParticipantReferenceId')) {
            updateModel.ParticipantReferenceId = requestBody.ParticipantReferenceId;
        }
        if (Helper.hasProperty(requestBody, 'Gender')) {
            updateModel.Gender = requestBody.Gender;
        }

        return updateModel;
    };

    static getValidUserUpdateModel = async (user, requestBody) => {

        const userService = new UserService();

        const updateModel: any = {};

        if (Helper.hasProperty(requestBody, 'Prefix')) {
            updateModel.Prefix = requestBody.Prefix;
        }
        if (Helper.hasProperty(requestBody, 'FirstName')) {
            updateModel.FirstName = requestBody.FirstName;
        }
        if (Helper.hasProperty(requestBody, 'LastName')) {
            updateModel.LastName = requestBody.LastName;
        }
        if (Helper.hasProperty(requestBody, 'CountryCode') && Helper.hasProperty(requestBody, 'Phone')) {
            var userWithPhone = await userService.getUserWithPhone(requestBody.CountryCode, requestBody.Phone);
            if (userWithPhone) {
                ErrorHandler.throwDuplicateUserError(`Other user with phone ${requestBody.CountryCode} ${requestBody.Phone.toString()} already exists!`);
            }
            updateModel.CountryCode = requestBody.CountryCode;
            updateModel.Phone = requestBody.Phone;
        }
        else if (Helper.hasProperty(requestBody, 'Phone')) {
            var userWithPhone = await userService.getUserWithPhone(user.CountryCode, requestBody.Phone);
            if (userWithPhone && user.id !== userWithPhone.id) {
                ErrorHandler.throwDuplicateUserError(`Other user with phone ${user.CountryCode} ${requestBody.Phone.toString()} already exists!`);
            }
            updateModel.Phone = requestBody.Phone;
        }
        else if (Helper.hasProperty(requestBody, 'CountryCode')) {
            var userWithCountryCode = await userService.getUserWithPhone(requestBody.CountryCode, user.Phone);
            if (userWithCountryCode && user.id !== userWithCountryCode.id) {
                ErrorHandler.throwDuplicateUserError(`Other user with phone ${requestBody.CountryCode} ${user.Phone.toString()} already exists!`);
            }
            updateModel.CountryCode = requestBody.CountryCode;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            var userWithEmail = await userService.getUserWithEmail(requestBody.Email);
            if (userWithEmail && user.id !== userWithEmail.id) {
                ErrorHandler.throwDuplicateUserError(`Other user with email ${requestBody.Email} already exists!`);
            }
            updateModel.Email = requestBody.Email;
        }
        if (Helper.hasProperty(requestBody, 'BiocubeId') || Helper.hasProperty(requestBody, 'UserName')) {
            var userName = requestBody.BiocubeId ?? requestBody.UserName;
            var userWithUserName = await userService.getUserWithUserName(userName);
            if (userWithUserName && user.id !== userWithUserName.id) {
                ErrorHandler.throwDuplicateUserError(`Other user with user-name/biocube-id ${requestBody.UserName} already exists!`);
            }
            updateModel.BiocubeId = requestBody.BiocubeId;
            updateModel.UserName = requestBody.UserName;
        }
        if (Helper.hasProperty(requestBody, 'Gender')) {
            updateModel.Gender = requestBody.Gender;
        }
        if (Helper.hasProperty(requestBody, 'Password')) {
            updateModel.Password = Helper.generateHashedPassword(requestBody.Password);
        }

        return updateModel;
    };

}
