import { ParticipantService } from '../../../database/repository.services/enrollment/participant.service';
import { ErrorHandler } from '../../../common/error.handler';
import { ApiError } from '../../../common/api.error';
import { ParticipantValidator as validator } from './participant.validator';
import {
    ParticipantDto,
    ParticipantSearchFilters,
    ParticipantSearchResults,
    ParticipantModel
} from '../../../domain.types/enrollment/participant.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { UserHelper } from '../../../api/user.helper';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantControllerDelegate {

    //#region member variables and constructors

    _service: ParticipantService = null;

    constructor() {
        this._service = new ParticipantService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        const birthDate = requestBody.BirthDate ? Date.parse(requestBody.BirthDate) : null;

        const participantCreateModel: ParticipantModel = {
            Prefix                 : requestBody.Prefix ? requestBody.Prefix : 'Mr',
            FirstName              : requestBody.FirstName ? requestBody.FirstName : null,
            LastName               : requestBody.LastName ? requestBody.LastName : null,
            CountryCode            : requestBody.CountryCode ? requestBody.CountryCode : '+91',
            Phone                  : requestBody.Phone ? requestBody.Phone : null,
            Email                  : requestBody.Email ? requestBody.Email : null,
            Country                : requestBody.Country ? requestBody.Country : null,
            ParticipantReferenceId : requestBody.ParticipantReferenceId ? requestBody.ParticipantReferenceId : null,
            Gender                 : requestBody.Gender ? requestBody.Gender : 'Male',
            BirthDate              : new Date(birthDate),
        };

        await UserHelper.getValidParticipantCreateModel(requestBody);

        const record: ParticipantDto = await this._service.create(participantCreateModel);
        if (record === null) {
            throw new ApiError('Unable to create participant!', 400);
        }

        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record: ParticipantDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: ParticipantSearchFilters = this.getSearchFilters(query);
        var searchResults: ParticipantSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record: ParticipantDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: ParticipantModel =
            await UserHelper.getValidParticipantUpdateModel(record, requestBody);
        const updated: ParticipantDto = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Participant!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record: ParticipantDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Participant with id ' + id.toString() + ' cannot be found!');
        }
        const userDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    getSearchFilters = (query) => {
        var filters = {};
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
        var participantReferenceId = query.participantReferenceId ? query.participantReferenceId : null;
        if (participantReferenceId != null) {
            filters['ParticipantReferenceId'] = participantReferenceId;
        }
        var gender = query.gender ? query.gender : null;
        if (gender != null) {
            filters['Gender'] = gender;
        }
        var country = query.country ? query.country : null;
        if (country != null) {
            filters['Country'] = country;
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
            id                     : record.id,
            DisplayId              : record.DisplayId,
            Prefix                 : record.Prefix,
            FirstName              : record.FirstName,
            LastName               : record.LastName,
            ParticipantReferenceId : record.ParticipantReferenceId,
            CountryCode            : record.CountryCode,
            Phone                  : record.Phone,
            Email                  : record.Email,
            Gender                 : record.Gender,
            BirthDate              : record.BirthDate,
            Country                : record.Country,
            AddedByUserId          : record.AddedByUserId,
            LastUpdatedByUserId    : record.LastUpdatedByUserId
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            DisplayId              : record.DisplayId,
            Prefix                 : record.Prefix,
            FirstName              : record.FirstName,
            LastName               : record.LastName,
            CountryCode            : record.CountryCode,
            Phone                  : record.Phone,
            Email                  : record.Email,
            ParticipantReferenceId : record.ParticipantReferenceId,
            Gender                 : record.Gender,
            BirthDate              : record.BirthDate,
            Country                : record.Country,
        };
    };

}
