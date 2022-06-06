import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { UserControllerDelegate } from './user.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class UserController extends BaseController {

    //#region member variables and constructors

    _delegate: UserControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new UserControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('User.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'User added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('User.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'User retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('User.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'User records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('User.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'User updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('User.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'User deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    loginWithPassword = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            this.authorize('User.LoginWithPassword', request, response, false);
            const result = await this._delegate.loginWithPassword(request.body);
            const message = 'User logged in successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    changePassword = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('User.ResetPassword', request, response);
            const result = await this._delegate.changePassword(request.body);
            const message = 'Password reset successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    loginWithOtp = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            this.authorize('User.LoginWithOtp', request, response, false);
            const result = await this._delegate.loginWithOtp(request.body);
            const message = 'User logged in successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    sendOtp = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            this.authorize('User.SendOtp', request, response, false);
            const result = await this._delegate.sendOtp(request.body);
            const message = 'Otp sent successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    logout = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            this.authorize('User.Logout', request, response);
            const userId = request.currentUser.UserId;
            const sessionId = request.currentUser.SessionId;
            const result = await this._delegate.logout(userId, sessionId);
            const message = 'User logged out successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
