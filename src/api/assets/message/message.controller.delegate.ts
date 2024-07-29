import {
    MessageService
} from '../../../database/repository.services/assets/message.service';
import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    Helper
} from '../../../common/helper';
import {
    ApiError
} from '../../../common/api.error';
import {
    MessageValidator as validator
} from './message.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    MessageCreateModel,
    MessageUpdateModel,
    MessageSearchFilters,
    MessageSearchResults
} from '../../../domain.types/assets/message.domain.types';
import { AssetHelper } from '../../../database/repository.services/assets/asset.helper';

///////////////////////////////////////////////////////////////////////////////////////

export class MessageControllerDelegate {

    //#region member variables and constructors

    _service: MessageService = null;

    constructor() {
        this._service = new MessageService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: MessageCreateModel = this.getCreateModel(requestBody);
        var record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create message!', 400);
        }
        record = await AssetHelper.updateAssetCode(record, this._service);
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Message with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: MessageSearchFilters = this.getSearchFilters(query);
        var searchResults: MessageSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Message with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: MessageUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update message!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Message with id ' + id.toString() + ' cannot be found!');
        }
        const messageDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : messageDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = Helper.getDefaultSearchFilters(query);

        var assetCode = query.assetCode ? query.assetCode : null;
        if (assetCode != null) {
            filters['AssetCode'] = assetCode;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var templateName = query.templateName ? query.templateName : null;
        if (templateName != null) {
            filters['TemplateName'] = templateName;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var category = query.category ? query.category : null;
        if (category != null) {
            filters['Category'] = category;
        }
        var messageType = query.messageType ? query.messageType : null;
        if (messageType != null) {
            filters['MessageType'] = messageType;
        }
        var tags = query.tags ? query.tags : null;
        if (tags != null) {
            filters['Tags'] = tags;
        }
        var version = query.version ? query.version : null;
        if (version != null) {
            filters['Version'] = version;
        }

        return filters;
    };

    getUpdateModel = (requestBody): MessageUpdateModel => {

        const updateModel: MessageUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'TemplateName')) {
            updateModel.TemplateName = requestBody.TemplateName;
        }
        if (Helper.hasProperty(requestBody, 'TemplateVariables')) {
            updateModel.TemplateVariables = JSON.stringify(requestBody.TemplateVariables);
        }
        if (Helper.hasProperty(requestBody, 'TemplateButtonIds')) {
            updateModel.TemplateButtonIds = JSON.stringify(requestBody.TemplateButtonIds);
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'MessageType')) {
            updateModel.MessageType = requestBody.MessageType;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }
        if (Helper.hasProperty(requestBody, 'Url')) {
            updateModel.Url = requestBody.Url;
        }
        if (Helper.hasProperty(requestBody, 'Version')) {
            updateModel.Version = requestBody.Version;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): MessageCreateModel => {
        return {
            AssetCode         : requestBody.AssetCode ? requestBody.AssetCode : null,
            Name              : requestBody.Name ? requestBody.Name : null,
            TemplateName      : requestBody.TemplateName ? requestBody.TemplateName : null,
            TemplateVariables : requestBody.TemplateVariables ?
                JSON.stringify(requestBody.TemplateVariables) as string : JSON.stringify([]),
            TemplateButtonIds : requestBody.TemplateButtonIds ?
                JSON.stringify(requestBody.TemplateButtonIds) as string : JSON.stringify([]),
            Description : requestBody.Description ? requestBody.Description : null,
            MessageType : requestBody.MessageType ? requestBody.MessageType : 'Unknown',
            Tags        : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
            Url         : requestBody.Url ? requestBody.Url : null,
            Version     : requestBody.Version ? requestBody.Version : 'V1',
            OwnerUserId : requestBody.OwnerUserId
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                : record.id,
            AssetCode         : record.AssetCode,
            Name              : record.Name,
            TemplateName      : record.TemplateName,
            TemplateVariables : JSON.parse(record.TemplateVariables),
            TemplateButtonIds : JSON.parse(record.TemplateButtonIds),
            Description       : record.Description,
            AssetCategory     : record.AssetCategory,
            MessageType       : record.MessageType,
            OwnerUserId       : record.OwnerUserId,
            Tags              : JSON.parse(record.Tags),
            Url               : record.Url,
            Version           : record.Version
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                : record.id,
            AssetCode         : record.AssetCode,
            Name              : record.Name,
            TemplateName      : record.TemplateName,
            TemplateVariables : JSON.parse(record.TemplateVariables),
            TemplateButtonIds : JSON.parse(record.TemplateButtonIds),
            Description       : record.Description,
            AssetCategory     : record.AssetCategory,
            MessageType       : record.MessageType,
            OwnerUserId       : record.OwnerUserId,
            Tags              : JSON.parse(record.Tags),
            Url               : record.Url,
            Version           : record.Version,
            CreatedAt         : record.CreatedAt,
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
