
import axios, { AxiosInstance } from 'axios';
import { PromotionTargetConfig } from '../../config/promotion.config';
import { Logger } from '../../common/logger';
import { ErrorHandler } from '../../common/error.handler';
import { TenantDto } from '../../domain.types/tenants/tenant.dto';

////////////////////////////////////////////////////////////////////////////////////////////////////////

export class TargetApiClient {

    private httpClient: AxiosInstance;

    private reanCareHttpClient: AxiosInstance;

    private accessToken: string | null = null;

    constructor(private config: PromotionTargetConfig) {
        this.httpClient = axios.create({
            baseURL : config.ApiUrl,
            timeout : 60000,
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        this.reanCareHttpClient = axios.create({
            baseURL : config.ReanCareApiUrl,
            timeout : 30000,
            headers : {
                'Content-Type' : 'application/json',
                'x-api-key'    : config.ApiKey
            }
        });
    }

    //#region Authentication

    async authenticate(): Promise<string> {
        try {
            const response = await this.reanCareHttpClient.post('/users/login-with-password', {
                UserName    : this.config.UserName,
                Password    : this.config.Password,
                LoginRoleId : this.config.LoginRoleId
            });

            this.accessToken = response.data.Data.AccessToken;
            Logger.instance().log('Successfully authenticated with reancare service');
            return this.accessToken;
        } catch (error) {
            Logger.instance().error('Reancare Authentication failed', 500, error);
            ErrorHandler.throwInternalServerError(`Reancare Authentication failed: ${error.message}`);
        }
    }

    private getAuthHeaders() {
        if (!this.accessToken) {
            throw new Error('Not authenticated. Call authenticate() first.');
        }
        return {
            Authorization : `Bearer ${this.accessToken}`
        };
    }

    //#endregion

    //#region Careplan APIs

    async searchCareplanByCode(code: string): Promise<any | null> {
        try {
            const response = await this.httpClient.get('/api/v1/careplans/search', {
                params  : { code },
                headers : this.getAuthHeaders()
            });
            const items = response.data.Data?.Items || [];
            return items.length > 0 ? items[0] : null;
        } catch (error) {
            Logger.instance().error('Failed to search careplan by code', 500, error);
            ErrorHandler.throwInternalServerError(`Failed to search careplan by code: ${error.message}`);
        }
    }

    async createCareplan(data: any): Promise<any> {
        Logger.instance().log(`Creating careplan /api/v1/careplans with data: ${JSON.stringify(data)}`);
        const response = await this.httpClient.post(
            '/api/v1/careplans',
            data,
            { headers: this.getAuthHeaders() }
        );
        return response.data.Data;
    }

    async updateCareplan(careplanId: string, data: any): Promise<any> {
        try {
            Logger.instance().log(`Updating careplan /api/v1/careplans/${careplanId} with data: ${JSON.stringify(data)}`);
            const response = await this.httpClient.put(
                `/api/v1/careplans/${careplanId}`,
                data,
                { headers: this.getAuthHeaders() }
            );
            return response.data.Data;
        } catch (error) {
            Logger.instance().error(`Failed to update careplan ID ${careplanId}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to update careplan ID ${careplanId}: ${error.message}`);
        }
    }

    getActiveTenants = async (): Promise<TenantDto[]> => {
        try {

            Logger.instance().log('Getting active tenants /api/v1/tenants/search in target environment...');
            const response = await this.reanCareHttpClient.get('tenants/active', {
                headers : this.getAuthHeaders()
            });
            return response.data.Data?.Tenants || [];
        } catch (error) {
            Logger.instance().error('Failed to get active tenants', 500, error);
            ErrorHandler.throwInternalServerError(`Failed to get active tenants: ${error.message}`);
        }
    };

    async searchCategoryByType(type: string): Promise<any | null> {
        Logger.instance().log(`Searching for category with Type /api/v1/careplan-categories/search/${type} in target environment...`);
        const response = await this.httpClient.get('/api/v1/careplan-categories/search', {
            params  : { type },
            headers : this.getAuthHeaders()
        });
        const items = response.data.Data?.Items || [];
        return items.length > 0 ? items[0] : null;
    }

    async createCategory(data: { Type: string; Description?: string }): Promise<any> {
        Logger.instance().log(`Creating category /api/v1/careplan-categories with data: ${JSON.stringify(data)}`);
        const response = await this.httpClient.post(
            '/api/v1/careplan-categories',
            data,
            { headers: this.getAuthHeaders() }
        );
        return response.data.Data;
    }

    async getOrCreateCategory(category: { Type: string; Description?: string }): Promise<string> {
        const existingCategory = await this.searchCategoryByType(category.Type);
        if (existingCategory) {
            return existingCategory.id;
        }

        const createdCategory = await this.createCategory({
            Type        : category.Type,
            Description : category.Description || ''
        });
        return createdCategory.id;
    }

    //#endregion

    //#region Activity APIs

    async searchActivitiesByCareplan(careplanId: string): Promise<any[]> {
        try {
            Logger.instance().log(`Searching for activities for careplan ID /api/v1/careplan-activities/search/${careplanId} in target environment...`);
            const response = await this.httpClient.get('/api/v1/careplan-activities/search', {
                params  : { careplanId, itemsPerPage: 1000 },
                headers : this.getAuthHeaders()
            });
            return response.data.Data?.Items || [];
        } catch (error) {
            Logger.instance().error(`Failed to search activities for careplan ID ${careplanId}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to search activities for careplan ID ${careplanId}: ${error.message}`);
        }
    }

    async createActivity(data: any): Promise<any> {
        try {
            Logger.instance().log(`Creating careplan activity /api/v1/careplan-activities with data: ${JSON.stringify(data)}`);
            const response = await this.httpClient.post(
                '/api/v1/careplan-activities',
                data,
                { headers: this.getAuthHeaders() }
            );
            return response.data.Data;
        } catch (error) {
            Logger.instance().error('Failed to create careplan activity', 500, error);
            ErrorHandler.throwInternalServerError(`Failed to create careplan activity: ${error.message}`);
        }
    }

    async updateActivity(activityId: string, data: any): Promise<any> {
        try {
            Logger.instance().log(`Updating careplan activity /api/v1/careplan-activities/${activityId} with data: ${JSON.stringify(data)}`);
            const response = await this.httpClient.put(
                `/api/v1/careplan-activities/${activityId}`,
                data,
                { headers: this.getAuthHeaders() }
            );
            return response.data.Data;
        } catch (error) {
            Logger.instance().error(`Failed to update careplan activity ID ${activityId}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to update careplan activity ID ${activityId}: ${error.message}`);
        }
    }

    async deleteActivity(activityId: string): Promise<void> {
        Logger.instance().log(`Deleting careplan activity /api/v1/careplan-activities/${activityId} in target environment...`);
        await this.httpClient.delete(
            `/api/v1/careplan-activities/${activityId}`,
            { headers: this.getAuthHeaders() }
        );
    }

    //#endregion

    //#region Asset APIs

    async searchAssetByCode(assetType: string, assetCode: string): Promise<any | null> {
        const endpoint = this.getAssetEndpoint(assetType);

        Logger.instance().log(`Searching for asset with Code /api/v1/assets/${endpoint}/search?assetCode=${assetCode} in target environment...`);
        const response = await this.httpClient.get(`/api/v1/assets/${endpoint}/search`, {
            params  : { assetCode },
            headers : this.getAuthHeaders()
        });
        const items = response.data.Data?.Items || [];
        return items.length > 0 ? items[0] : null;
    }

    async createAsset(assetType: string, data: any): Promise<any> {
        try {
            const endpoint = this.getAssetEndpoint(assetType);
            Logger.instance().log(`Creating asset of type /api/v1/assets/${endpoint} with data: ${JSON.stringify(data)}`);
            if (assetType === 'Assessment' && data.ReferenceTemplateCode) {
                const assessment = await this.getAssessment(data.ReferenceTemplateCode);
                data.ReferenceTemplateId = assessment.id;
            }
            const cleanedData = this.cleanAssetData(data);
            Logger.instance().log(`Creating asset of type /api/v1/assets/${endpoint} with data: ${JSON.stringify(cleanedData)}`);
            const response = await this.httpClient.post(
                `/api/v1/assets/${endpoint}`,
                cleanedData,
                { headers: this.getAuthHeaders() }
            );
            return response.data.Data;
        } catch (error) {
            Logger.instance().error(`Failed to create asset of type ${assetType}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to create asset of type ${assetType}: ${error.message}`);
        }
    }

    async updateAsset(assetType: string, assetId: string, data: any): Promise<any> {
        try {
            const endpoint = this.getAssetEndpoint(assetType);
            Logger.instance().log(`Updating asset of type /api/v1/assets/${endpoint}/${assetId} with data: ${JSON.stringify(data)}`);
            if (assetType === 'Assessment' && data.ReferenceTemplateCode) {
                const assessment = await this.getAssessment(data.ReferenceTemplateCode);
                data.ReferenceTemplateId = assessment.id;
            }
            const cleanedData = this.cleanAssetData(data);
            const response = await this.httpClient.put(
                `/api/v1/assets/${endpoint}/${assetId}`,
                cleanedData,
                { headers: this.getAuthHeaders() }
            );
            return response.data.Data;
        } catch (error) {
            Logger.instance().error(`Failed to update asset ID ${assetId} of type ${assetType}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to update asset ID ${assetId} of type ${assetType}: ${error.message}`);
        }
    }

    private async getAssessment(templateCode: string): Promise<any> {
        try {
            Logger.instance().log(`Getting assessment template by code /api/v1//clinical/assessment-templates/search?displayCode=${templateCode} in target environment...`);
            const response = await this.reanCareHttpClient.get('/clinical/assessment-templates/search', {
                params  : { displayCode: templateCode },
                headers : this.getAuthHeaders()
            });
            const items = response.data.Data?.Items || [];
            if (items.length === 0) {
                throw new Error(`Assessment template with code ${templateCode} not found in target environment.`);
            }
            return items[0];
        } catch (error) {
            Logger.instance().error(`Failed to get assessment template by code ${templateCode}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to get assessment template by code ${templateCode}: ${error.message}`);
        }
    }

    private cleanAssetData(data: any): any {
        const cleaned = { ...data };
        const fieldsToRemove = [
            'AssetType',
            'AssetCategory',
            'DisplayId',
            'id',
            'CreatedAt',
            'UpdatedAt',
            'DeletedAt',
            'TemplateButtonIds'
        ];

        for (const field of fieldsToRemove) {
            delete cleaned[field];
        }
        Logger.instance().log(`Cleaned asset data: ${JSON.stringify(cleaned)}`);
        return cleaned;
    }

    async getAssetById(assetType: string, assetId: string): Promise<any> {
        try {
            const endpoint = this.getAssetEndpoint(assetType);
            Logger.instance().log(`Getting asset by ID /api/v1/assets/${endpoint}/${assetId} in target environment...`);
            const response = await this.httpClient.get(
                `/api/v1/assets/${endpoint}/${assetId}`,
                { headers: this.getAuthHeaders() }
            );
            return response.data.Data;
        } catch (error) {
            Logger.instance().error(`Failed to get asset ID ${assetId} of type ${assetType}`, 500, error);
            ErrorHandler.throwInternalServerError(`Failed to get asset ID ${assetId} of type ${assetType}: ${error.message}`);
        }
    }

    //#endregion

    //#region Helpers

    private getAssetEndpoint(assetType: string): string {
        const endpointMap: Record<string, string> = {
            'Action plan'   : 'action-plans',
            'Animation'     : 'animations',
            'Appointment'   : 'appointments',
            'Article'       : 'articles',
            'Assessment'    : 'assessments',
            'Audio'         : 'audios',
            'Biometrics'    : 'biometrics',
            'Challenge'     : 'challenges',
            'Checkup'       : 'checkups',
            'Consultation'  : 'consultations',
            'Exercise'      : 'exercises',
            'Goal'          : 'goals',
            'Infographics'  : 'infographics',
            'Medication'    : 'medications',
            'Meditation'    : 'meditations',
            'Message'       : 'messages',
            'Nutrition'     : 'nutritions',
            'Physiotherapy' : 'physiotherapies',
            'Priority'      : 'priorities',
            'Reflection'    : 'reflections',
            'Reminder'      : 'reminders',
            'Video'         : 'videos',
            'Web link'      : 'web-links',
            'Web newsfeed'  : 'web-newsfeeds',
            'Word power'    : 'word-powers'
        };
        return endpointMap[assetType] || assetType.toLowerCase().replace(' ', '-') + 's';
    }

    //#endregion

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
