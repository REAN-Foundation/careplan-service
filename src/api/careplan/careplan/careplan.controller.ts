import express from 'express';
import fs from 'fs';
import { ResponseHandler } from '../../../common/response.handler';
import { CareplanControllerDelegate } from './careplan.controller.delegate';
import { BaseController } from '../../base.controller';
import { Helper } from '../../../common/helper';
import { ConfigurationManager } from '../../../config/configuration.manager';
import { TimeHelper } from '../../../common/time.helper';
import { DateStringFormat } from '../../../domain.types/miscellaneous/time.types';
import path from 'path';

///////////////////////////////////////////////////////////////////////////////////////

export class CarePlanController extends BaseController{

    //#region member variables and constructors

    _delegate: CareplanControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new CareplanControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Careplan.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'Care plan added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.GetById', request, response, request.authorizeRequest);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Care plan retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Search', request, response, request.authorizeRequest);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Care plan records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Care plan updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Care plan deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    export = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Export', request, response, request.authorizeRequest);
            const record = await this._delegate.export(request.params.id);
          
            const { filename, sourceFileLocation }
                        = await CarePlanController.storeTemplateToFileLocally(record);
            
            var mimeType = Helper.getMimeType(sourceFileLocation);
            response.setHeader('Content-type', mimeType);
            response.setHeader('Content-disposition', 'attachment; filename=' + filename);
            
            var filestream = fs.createReadStream(sourceFileLocation);
            filestream.pipe(response);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    importFromFile = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.importFromFile', request, response, request.authorizeRequest);
            const record = await this._delegate.import(request);
            const message = 'Care plan imported successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    public static storeTemplateToFileLocally = async (careplanObj) => {
        const name = careplanObj.Name;
        const filename = Helper.strToFilename(name, 'json', '-');
        const tempDownloadFolder = ConfigurationManager.DownloadTemporaryFolder();
        const timestamp = TimeHelper.timestamp(new Date());
        const dateFolder = TimeHelper.getDateString(new Date(), DateStringFormat.YYYY_MM_DD);
        const sourceFolder = path.join(tempDownloadFolder, dateFolder, timestamp);
        const sourceFileLocation = path.join(sourceFolder, filename);

        await fs.promises.mkdir(sourceFolder, { recursive: true });

        const jsonObj = CarePlanController.convertToJson(careplanObj);
        const jsonStr = JSON.stringify(jsonObj, null, 2);
        fs.writeFileSync(sourceFileLocation, jsonStr);
        await Helper.sleep(500);

        return { dateFolder, filename, sourceFileLocation };
    };
    
    public static convertToJson = (CareplanObj):any => {
        var careplan = {
            Name        : CareplanObj.Name,
            Description : CareplanObj.Description,
            Version     : CareplanObj.Version,
            Code        : CareplanObj.Code,
            Tags        : CareplanObj.Tags ? JSON.parse(CareplanObj.Tags) : [],
            IsActive    : CareplanObj.IsActive,
            Category    : {
                Type        : CareplanObj.CareplanCategory.Type,
                Description : CareplanObj.CareplanCategory.Description },
            Assets : CareplanObj.Assets.map(asset => ({
                ...asset.dataValues,
                Tags : Array.isArray(asset.dataValues.Tags) ? asset.dataValues.Tags :
                    (asset.dataValues.Tags ? JSON.parse(asset.dataValues.Tags) : [])
            })),
            CareplanActivities : [],

        };

        for (var activityObj of CareplanObj.CareplanActivities) {
            const activity = CarePlanController.activityToJson(activityObj);
            careplan.CareplanActivities.push(activity);
        }
        return careplan;
    };

    private static activityToJson(activityObj) {
        var activity = {
            AssetType : activityObj.CarepalnActivity.AssetType,
            Day       : activityObj.CarepalnActivity.Day,
            TimeSlot  : activityObj.CarepalnActivity.TimeSlot,
            AssetCode : activityObj.CarepalnActivity.AssetCode,
            DisplayId : activityObj.CarepalnActivity.DisplayId,
        };
        return activity;
    }

}

