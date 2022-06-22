// import express from 'express';
// import { ApiError } from '../../common/api.error';
// import { ResponseHandler } from '../../common/response.handler';
// import { BloodGroupList, MaritalStatusList, SeverityList } from '../../domain.types/miscellaneous/system.types';
// import { TypesControllerDelegate } from './types.controller.delegate';
// import { Loader } from '../../startup/loader';
// import { BaseController } from '../base.controller';

// ///////////////////////////////////////////////////////////////////////////////////////

// export class TypesController extends BaseController {

//     //#region member variables and constructors

//     _delegate: TypesControllerDelegate = null;

//     constructor() {
//         super();
//         this._delegate = new TypesControllerDelegate();
//     }

//     //#endregion

//     //#region Action methods

//     getRoleTypes = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             await this.setContext('Types.GetPersonRoleTypes', request, response, false);

//             const types = await this._delegate.getPersonRoleTypes();
//             if (types === null || types.length === 0) {
//                 throw new ApiError('Cannot get person role types!'. 400);
//             }

//             ResponseHandler.success(request, response, 'Person role types retrieved successfully!', 200, {
//                 PersonRoleTypes : types,
//             });

//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };
    
//     getBloodGroups = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {

//             await this.setContext('Types.GetBloodGroups', request, response, false);

//             ResponseHandler.success(request, response, 'Blood group types retrieved successfully!', 200, {
//                 BloodGroups : BloodGroupList,
//             });
//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };
    
//     getMaritalStatuses = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {

//             await this.setContext('Types.GetMaritalStatuses', request, response, false);

//             ResponseHandler.success(request, response, 'Marital status types retrieved successfully!', 200, {
//                 MaritalStatuses : MaritalStatusList,
//             });

//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };
    
//     getSeverities = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {

//             await this.setContext('Types.GetSeverities', request, response, false);

//             ResponseHandler.success(request, response, 'Severity types retrieved successfully!', 200, {
//                 Severities : SeverityList,
//             });

//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };

//     getPriorityTypes = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             await this.setContext('HealthPriority.GetPrioritiesTypes', request, response);

//             const priorityTypes = await this._delegate.getPriorityTypes();
//             if (priorityTypes.length === 0) {
//                 throw new ApiError('Cannot fetch priorities types!', 400);
//             }

//             ResponseHandler.success(request, response, 'Fetched priority types successfully!', 201, {
//                 PriorityTypes : priorityTypes,
//             });

//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };
//     //#endregion

// }
