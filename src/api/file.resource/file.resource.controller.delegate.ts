import { FileResourceService } from '../../database/repository.services/file.resource.service';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { ApiError } from '../../common/api.error';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FileResourceCreateModel } from '../../domain.types/file.resource.domain.types';
import express from 'express';
import * as mime from 'mime-types';
import * as aws from 'aws-sdk';
import { IFileStorageService } from '../../modules/storage/interfaces/file.storage.service.interface';
import { injectable, inject } from 'tsyringe';

///////////////////////////////////////////////////////////////////////////////////////
@injectable()
export class FileResourceControllerDelegate {

    //#region member variables and constructors

    _service: FileResourceService = null;

    constructor( @inject('IFileStorageService') private _storageService: IFileStorageService ) {
        this._service = new FileResourceService();
    }

    //#endregion

    upload = async (request: express.Request) => {
    
        var dateFolder = new Date().toISOString().split('T')[0];
        var originalFilename: string = request.headers['filename'] as string;
        var contentLength = request.headers['content-length'];
        var mimeType = request.headers['mime-type'] ?? mime.lookup(originalFilename);
        var publicResource = request.headers['public'] === 'true' ? true : false;
    
        var timestamp = new Date().getTime().toString();
        var ext = Helper.getFileExtension(originalFilename);
        var filename = originalFilename.replace('.' + ext, "");
        filename = filename.replace(' ', "_");
        filename = filename + '_' + timestamp + '.' + ext;
        var storageKey = 'uploaded/' + dateFolder + '/' + filename;
    
        var key = await this._storageService.upload(request, storageKey);
        if (!key) {
            ErrorHandler.throwInternalServerError(`Unable to upload the file!`);
        }
        var model: FileResourceCreateModel = {
            StorageKey       : storageKey,
            MimeType         : mimeType as string,
            Public           : publicResource,
            OriginalFilename : originalFilename,
            Tags             : request.body.Tags ? JSON.stringify(request.body.Tags) : '[]',
            Size             : contentLength ? parseInt(contentLength) : null,
            UserId           : request.currentUser ? request.currentUser.UserId : null,
        };
        var record = await this._service.create(model);
        if (record === null) {
            throw new ApiError('Unable to create file resource!', 400);
        }

        return this.getEnrichedDto(record);
    }

    download = async (id: uuid, disposition: string, response: express.Response) => {

        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('File resource with id ' + id.toString() + ' cannot be found!');
        }
        var storageKey = record.StorageKey;
        var originalFilename = record.OriginalFilename;
        var mimeType = mime.lookup(originalFilename);
    
        response.setHeader('Content-type', mimeType as string);
        setResponseHeaders(response, originalFilename, disposition);

        var readStream = await this._storageService.download(storageKey);
        if (!readStream) {
            ErrorHandler.throwInternalServerError(`Unable to download the file!`);
        }
        return readStream;
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('File resource with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('File resource with id ' + id.toString() + ' cannot be found!');
        }
        var storageKey = record.StorageKey;
        var s3 = getS3Client();
        const params = {
            Bucket : process.env.STORAGE_BUCKET,
            Key    : storageKey
        };
        await s3.deleteObject(params).promise();
        const fileResourceDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : fileResourceDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id               : record.id,
            StorageKey       : record.StorageKey,
            MimeType         : record.MimeType,
            Public           : record.Public,
            OriginalFilename : record.OriginalFilename,
            Url              : process.env.BASE_URL + `/api/v1/file-resources/download/${record.id}?disposition=attachment`,
            Tags             : record.Tags ? JSON.parse(record.Tags) : [],
            Size             : record.Size,
            UserId           : record.UserId,
            UserName         : record.User ? record.User.FirstName + ' ' + record.User.LastName : ''
        };
    }

    //#endregion

}

///////////////////////////////////////////////////////////////////////////////////////////////

function getS3Client() {
    const s3 = new aws.S3({
        accessKeyId      : process.env.STORAGE_BUCKET_ACCESS_KEY_ID,
        secretAccessKey  : process.env.STORAGE_BUCKET_ACCESS_KEY_SECRET,
        signatureVersion : 'v4',
        region           : process.env.STORAGE_CLOUD_REGION
    });
    return s3;
}

function setResponseHeaders(response, filename, disposition = 'inline') {
    if (disposition === 'inline') {
        response.setHeader('Content-disposition', 'inline');
    }
    else {
        response.setHeader('Content-disposition', 'attachment;filename=' + filename);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////
