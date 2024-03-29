import {
    AssessmentService
} from '../../../database/repository.services/assets/assessment.service';
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
    AssessmentValidator as validator
} from './assessment.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    AssessmentCreateModel,
    AssessmentUpdateModel,
    AssessmentSearchFilters,
    AssessmentSearchResults
} from '../../../domain.types/assets/assessment.domain.types';
import { AssetHelper } from '../../../database/repository.services/assets/asset.helper';
import { NeedleService } from '../../../common/needle.service';

///////////////////////////////////////////////////////////////////////////////////////

export class AssessmentControllerDelegate {

    //#region member variables and constructors

    _service: AssessmentService = null;

    constructor() {
        this._service = new AssessmentService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        requestBody  = await this.updateAssessmentId(requestBody);
        var createModel: AssessmentCreateModel = this.getCreateModel(requestBody);
        var record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create assessment!', 400);
        }
        record = await AssetHelper.updateAssetCode(record, this._service);
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Assessment with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: AssessmentSearchFilters = this.getSearchFilters(query);
        var searchResults: AssessmentSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Assessment with id ' + id.toString() + ' cannot be found!');
        }
        let updateModel: AssessmentUpdateModel = this.getUpdateModel(requestBody);
        // First find in reancare that template is present or not then update the code otherwise don't update
        if (updateModel.ReferenceTemplateCode) {
            updateModel = await this.updateAssessmentId(updateModel);
        }
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update assessment!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Assessment with id ' + id.toString() + ' cannot be found!');
        }
        const assessmentDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : assessmentDeleted
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
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var assetCategory = query.assetCategory ? query.assetCategory : null;
        if (assetCategory != null) {
            filters['AssetCategory'] = assetCategory;
        }
        var template = query.template ? query.template : null;
        if (template != null) {
            filters['Template'] = template;
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

    getUpdateModel = (requestBody): AssessmentUpdateModel => {

        const updateModel: AssessmentUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'Template')) {
            updateModel.Template = requestBody.Template;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }
        if (Helper.hasProperty(requestBody, 'Version')) {
            updateModel.Version = requestBody.Version;
        }
        if (Helper.hasProperty(requestBody, 'ReferenceTemplateCode')) {
            updateModel.ReferenceTemplateCode = requestBody.ReferenceTemplateCode;
            requestBody = this.updateAssessmentId(requestBody);
        }
        return updateModel;
    };

    getCreateModel = (requestBody): AssessmentCreateModel => {
        return {
            AssetCode             : requestBody.AssetCode ? requestBody.AssetCode : null,
            Name                  : requestBody.Name ? requestBody.Name : null,
            Description           : requestBody.Description ? requestBody.Description : null,
            Template              : requestBody.Template ? requestBody.Template : '{}',
            ReferenceTemplateCode : requestBody.ReferenceTemplateCode ? requestBody.ReferenceTemplateCode : null,
            ReferenceTemplateId   : requestBody.ReferenceTemplateId ? requestBody.ReferenceTemplateId : null,
            Tags                  : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
            Version               : requestBody.Version ? requestBody.Version : 'V1',
            OwnerUserId           : requestBody.OwnerUserId
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                    : record.id,
            AssetCode             : record.AssetCode,
            Name                  : record.Name,
            Description           : record.Description,
            AssetCategory         : record.AssetCategory,
            Template              : record.Template,
            ReferenceTemplateCode : record.ReferenceTemplateCode,
            ReferenceTemplateId   : record.ReferenceTemplateId,
            OwnerUserId           : record.OwnerUserId,
            Tags                  : JSON.parse(record.Tags),
            Version               : record.Version
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                    : record.id,
            AssetCode             : record.AssetCode,
            Name                  : record.Name,
            Description           : record.Description,
            AssetCategory         : record.AssetCategory,
            Template              : record.Template,
            ReferenceTemplateCode : record.ReferenceTemplateCode,
            ReferenceTemplateId   : record.ReferenceTemplateId,
            OwnerUserId           : record.OwnerUserId,
            Tags                  : JSON.parse(record.Tags),
            Version               : record.Version,
            CreatedAt             : record.CreatedAt,
        };
    };

    updateAssessmentId = async (requestBody) => {

        if (requestBody.ReferenceTemplateCode) {
            const templateCode = requestBody.ReferenceTemplateCode;
            const apiURL = `/clinical/assessment-templates/search?displayCode=${templateCode}`;
            const serachResults = await NeedleService.needleRequestForREAN("get", apiURL);
            const items = serachResults.Data.AssessmentTemplateRecords.Items;
            if (items.length !== 0) {
                requestBody.ReferenceTemplateId = items[0].id;
            }
        }
        return requestBody;
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
