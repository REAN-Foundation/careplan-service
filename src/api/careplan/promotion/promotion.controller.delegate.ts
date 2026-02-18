
import { CareplanService } from '../../../database/repository.services/careplan/careplan.service';
import { ErrorHandler } from '../../../common/error.handler';
import { ApiError } from '../../../common/api.error';
import { Logger } from '../../../common/logger';
import { CareplanExport } from '../../../domain.types/promotion/promotion.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { PromotionValidator as validator } from './promotion.validator';
import { AssetType } from '../../../domain.types/assets/asset.types';
import { ActionPlanModel } from '../../../database/models/assets/action.plan.model';
import { AnimationModel } from '../../../database/models/assets/animation.model';
import { AppointmentModel } from '../../../database/models/assets/appointment.model';
import { ArticleModel } from '../../../database/models/assets/article.model';
import { AssessmentModel } from '../../../database/models/assets/assessment.model';
import { AudioModel } from '../../../database/models/assets/audio.model';
import { BiometricsModel } from '../../../database/models/assets/biometrics.model';
import { ChallengeModel } from '../../../database/models/assets/challenge.model';
import { CheckupModel } from '../../../database/models/assets/checkup.model';
import { ConsultationModel } from '../../../database/models/assets/consultation.model';
import { ExerciseModel } from '../../../database/models/assets/exercise.model';
import { GoalModel } from '../../../database/models/assets/goal.model';
import { InfographicsModel } from '../../../database/models/assets/infographics.model';
import { MedicationModel } from '../../../database/models/assets/medication.model';
import { MeditationModel } from '../../../database/models/assets/meditation.model';
import { MessageModel } from '../../../database/models/assets/message.model';
import { NutritionModel } from '../../../database/models/assets/nutrition.model';
import { PhysiotherapyModel } from '../../../database/models/assets/physiotherapy.model';
import { PriorityModel } from '../../../database/models/assets/priority.model';
import { ReflectionModel } from '../../../database/models/assets/reflection.model';
import { ReminderModel } from '../../../database/models/assets/reminder.model';
import { VideoModel } from '../../../database/models/assets/video.model';
import { WebLinkModel } from '../../../database/models/assets/web.link.model';
import { WebNewsfeedModel } from '../../../database/models/assets/web.newsfeed.model';
import { WordPowerModel } from '../../../database/models/assets/word.power.model';
import { CareplanActivityModel } from '../../../database/models/careplan/careplan.activity.model';
import AWS from 'aws-sdk';
///////////////////////////////////////////////////////////////////////////////////////

export class PromotionControllerDelegate {

    //#region member variables and constructors

    _careplanService: CareplanService = null;

    private assetModelMap = {
        [AssetType.ActionPlan]    : ActionPlanModel.Model,
        [AssetType.Animation]     : AnimationModel.Model,
        [AssetType.Appointment]   : AppointmentModel.Model,
        [AssetType.Article]       : ArticleModel.Model,
        [AssetType.Assessment]    : AssessmentModel.Model,
        [AssetType.Audio]         : AudioModel.Model,
        [AssetType.Biometrics]    : BiometricsModel.Model,
        [AssetType.Challenge]     : ChallengeModel.Model,
        [AssetType.Checkup]       : CheckupModel.Model,
        [AssetType.Consultation]  : ConsultationModel.Model,
        [AssetType.Exercise]      : ExerciseModel.Model,
        [AssetType.Goal]          : GoalModel.Model,
        [AssetType.Infographics]  : InfographicsModel.Model,
        [AssetType.Medication]    : MedicationModel.Model,
        [AssetType.Meditation]    : MeditationModel.Model,
        [AssetType.Message]       : MessageModel.Model,
        [AssetType.Nutrition]     : NutritionModel.Model,
        [AssetType.Physiotherapy] : PhysiotherapyModel.Model,
        [AssetType.Priority]      : PriorityModel.Model,
        [AssetType.Reflection]    : ReflectionModel.Model,
        [AssetType.Reminder]      : ReminderModel.Model,
        [AssetType.Video]         : VideoModel.Model,
        [AssetType.WebLink]       : WebLinkModel.Model,
        [AssetType.WebNewsfeed]   : WebNewsfeedModel.Model,
        [AssetType.WordPower]     : WordPowerModel.Model,
    };

    private CareplanActivity = CareplanActivityModel.Model;

    constructor() {
        this._careplanService = new CareplanService();
    }

    //#endregion

    promoteFrom = async (request: any) => {
        await validator.validatePromoteFromRequest(request.body);

        const { TenantCode, TargetEnvironment } = request.body;

        const CareplanId = request.params.id;
        let careplan = null;
        careplan = await this._careplanService.getById(CareplanId);
        if (!careplan) {
            ErrorHandler.throwNotFoundError(`Careplan with ID ${CareplanId} not found.`);
        }

        Logger.instance().log(`Exporting careplan ${careplan.Code} for promotion...`);
        const careplanExport: CareplanExport = await this._careplanService.exportForPromotion(careplan);

        const lambdaPayload = {
            TargetEnvironment : TargetEnvironment,
            TenantCode        : TenantCode,
            Careplan          : careplanExport
        };

        Logger.instance().log(`Invoking Lambda with payload for careplan ${careplan.Code}...`);
        Logger.instance().log(`Target Environment: ${TargetEnvironment}`);

        const lambda = new AWS.Lambda({
            region : process.env.AWS_REGION,
        });

        const params: AWS.Lambda.InvocationRequest = {
            FunctionName   : process.env.PROMOTION_LAMBDA_FUNCTION_NAME,
            InvocationType : 'RequestResponse',
            Payload        : JSON.stringify(lambdaPayload),
        };

        const result = await lambda.invoke(params).promise();

        Logger.instance().log(`Lambda invocation completed with status: ${result.StatusCode}`);

        return {
            StatusCode        : result.StatusCode,
            CareplanCode      : careplan.Code,
            CareplanName      : careplan.Name,
            TargetEnvironment : TargetEnvironment,
            Payload           : result.Payload ? JSON.parse(result.Payload as string) : null,
        };
    };

    promoteTo = async (request: any) => {
        const isValidLambdaAuth = validator.validateLambdaAuthHeader(request);
        if (!isValidLambdaAuth) {
            throw new ApiError(401, 'Unauthorized: Invalid Lambda authentication token');
        }
        await validator.validatePromoteToRequest(request.body);

        const { TargetEnvironment, TenantCode, Careplan } = request.body;

        const currentEnv = process.env.NODE_ENV;
        if (TargetEnvironment !== currentEnv) {
            throw new ApiError(400, `Target environment mismatch. Expected: ${currentEnv}, Received: ${TargetEnvironment}`);
        }
        
        Logger.instance().log(`Receiving careplan ${Careplan.Code} for tenant ${TenantCode}...`);

        const searchResult = await this._careplanService.search({ Code: Careplan.Code });
        const existingCareplan = searchResult.Items && searchResult.Items.length > 0
            ? searchResult.Items[0]
            : null;

        if (existingCareplan) {
            Logger.instance().log(`Careplan ${Careplan.Code} exists, syncing...`);
            const result = await this.syncCareplan(existingCareplan.id, Careplan, TenantCode);
            return result;
        }

        Logger.instance().log(`Careplan ${Careplan.Code} does not exist, creating...`);
        return await this.createCareplan(Careplan, TenantCode);
    };

    //#region Private Helper Methods

    private createCareplan = async (careplanData: CareplanExport, tenantCode: string) => {
        try {
            Logger.instance().log(`Getting or creating category ${careplanData.Category?.Type}...`);
            let categoryId: uuid | null = null;
            if (careplanData.Category && careplanData.Category.Type) {
                categoryId = await this._careplanService.getCategoryId(careplanData.Category);
            }

            Logger.instance().log(`Creating careplan ${careplanData.Code}...`);
            const careplanModel = {
                Code        : careplanData.Code,
                CategoryId  : categoryId,
                Name        : careplanData.Name,
                Description : careplanData.Description,
                Version     : careplanData.Version || 'V1',
                Tags        : careplanData.Tags ? JSON.stringify(careplanData.Tags) : JSON.stringify([]),
                IsActive    : careplanData.IsActive !== undefined ? careplanData.IsActive : true,
                TenantCode  : tenantCode,
                OwnerUserId : null,
            };

            const createdCareplan = await this._careplanService.create(careplanModel);

            const assetIdMap = new Map<string, string>();

            if (careplanData.Assets && careplanData.Assets.length > 0) {
                for (const asset of careplanData.Assets) {
                    asset.TenantId = null;
                    asset.TenantCode = tenantCode;
                    Logger.instance().log(`Creating asset ${asset.AssetCode} of type ${asset.AssetType}...`);
                    const createdAsset = await this.createAsset(asset.AssetType, asset);
                    if (createdAsset) {
                        assetIdMap.set(asset.AssetCode, createdAsset.id);
                    }
                }
            }

            if (careplanData.CareplanActivities && careplanData.CareplanActivities.length > 0) {
                for (const activity of careplanData.CareplanActivities) {
                    const assetId = assetIdMap.get(activity.AssetCode);
                    if (assetId) {
                        const activityModel: any = {
                            CareplanId             : createdCareplan.id,
                            AssetId                : assetId,
                            AssetType              : activity.AssetType,
                            Day                    : activity.Day,
                            TimeSlot               : activity.TimeSlot,
                            IsRegistrationActivity : activity.IsRegistrationActivity || false
                        };
                        if (activity.Sequence) {
                            activityModel.Sequence = activity.Sequence;
                        }
                        Logger.instance().log(`Creating activity for asset ${activity.AssetCode} on Day ${activity.Day}...`);
                        await this.CareplanActivity.create(activityModel);
                    } else {
                        Logger.instance().log(`Warning: Asset ${activity.AssetCode} not found in assetIdMap, skipping activity creation.`);
                    }
                }
            }

            Logger.instance().log(`Careplan ${careplanData.Code} created successfully with ID: ${createdCareplan.id}`);

            return {
                action   : 'created',
                careplan : createdCareplan,
                message  : `Careplan ${careplanData.Code} created successfully`
            };
        } catch (error) {
            Logger.instance().error('Error creating careplan in promoteTo', 500, error);
            throw new ApiError(500, `Failed to create careplan: ${error.message}`);
        }
    };

    private syncCareplan = async (careplanId: uuid, careplanData: CareplanExport, tenantCode: string) => {
        try {
            const updateModel = {
                Name        : careplanData.Name,
                Description : careplanData.Description,
                Version     : careplanData.Version,
                Tags        : careplanData.Tags ? JSON.stringify(careplanData.Tags) : undefined,
            };

            await this._careplanService.update(careplanId, updateModel);

            const assetIdMap = new Map<string, string>();

            if (careplanData.Assets && careplanData.Assets.length > 0) {
                for (const asset of careplanData.Assets) {
                    asset.TenantId = null;
                    asset.TenantCode = tenantCode;
                    Logger.instance().log(`Creating/updating asset ${asset.AssetCode} of type ${asset.AssetType}...`);

                    const existingAsset = await this.getAssetByCode(asset.AssetType, asset.AssetCode);
                    if (existingAsset) {
                        await this.updateAsset(asset.AssetType, existingAsset.id, asset);
                        assetIdMap.set(asset.AssetCode, existingAsset.id);
                    } else {
                        const createdAsset = await this.createAsset(asset.AssetType, asset);
                        if (createdAsset) {
                            assetIdMap.set(asset.AssetCode, createdAsset.id);
                        }
                    }
                }
            }

            const existingActivities = await this._careplanService.getCareplanActivitiesForExport(careplanId);

            const existingActivityMap = new Map<string, any>();
            for (const activity of existingActivities) {
                const asset = await this.getAssetById(activity.AssetType, activity.AssetId);
                if (asset && asset.AssetCode) {
                    existingActivityMap.set(asset.AssetCode, {
                        id        : activity.id,
                        AssetId   : activity.AssetId,
                        AssetType : activity.AssetType,
                        AssetCode : asset.AssetCode,
                        Day       : activity.Day,
                        TimeSlot  : activity.TimeSlot
                    });
                }
            }

            Logger.instance().log(`Found ${existingActivityMap.size} existing activities for careplan`);

            const sourceAssetCodes = new Set<string>();
            if (careplanData.CareplanActivities) {
                for (const activity of careplanData.CareplanActivities) {
                    sourceAssetCodes.add(activity.AssetCode);
                }
            }

            if (careplanData.CareplanActivities && careplanData.CareplanActivities.length > 0) {
                for (const activity of careplanData.CareplanActivities) {
                    const assetId = assetIdMap.get(activity.AssetCode);
                    if (assetId) {
                        if (existingActivityMap.has(activity.AssetCode)) {
                            const existingActivity = existingActivityMap.get(activity.AssetCode);
                            Logger.instance().log(`Updating activity for asset ${activity.AssetCode}...`);
                            const updateData: any = {
                                Day                    : activity.Day,
                                TimeSlot               : activity.TimeSlot,
                                IsRegistrationActivity : activity.IsRegistrationActivity || false
                            };
                            if (activity.Sequence) {
                                updateData.Sequence = activity.Sequence;
                            }
                            await this.CareplanActivity.update(updateData, {
                                where : { id: existingActivity.id }
                            });
                        } else {
                            Logger.instance().log(`Creating new activity for asset ${activity.AssetCode}...`);
                            const activityModel: any = {
                                CareplanId             : careplanId,
                                AssetId                : assetId,
                                AssetType              : activity.AssetType,
                                Day                    : activity.Day,
                                TimeSlot               : activity.TimeSlot,
                                IsRegistrationActivity : activity.IsRegistrationActivity || false
                            };
                            if (activity.Sequence) {
                                activityModel.Sequence = activity.Sequence;
                            }
                            await this.CareplanActivity.create(activityModel);
                        }
                    }
                }
            }

            for (const [assetCode, existingActivity] of existingActivityMap) {
                if (!sourceAssetCodes.has(assetCode)) {
                    Logger.instance().log(`Deleting activity for asset ${assetCode} (not in source)...`);
                    await this.CareplanActivity.destroy({
                        where : { id: existingActivity.id }
                    });
                }
            }

            const updatedCareplan = await this._careplanService.getById(careplanId);

            Logger.instance().log(`Careplan ${careplanData.Code} synced successfully`);

            return {
                action   : 'updated',
                careplan : updatedCareplan,
                message  : `Careplan ${careplanData.Code} synced successfully`
            };
        } catch (error) {
            Logger.instance().error('Error syncing careplan in promoteTo', 500, error);
            throw new ApiError(500, `Failed to sync careplan: ${error.message}`);
        }
    };

    private getAssetById = async (assetType: string, assetId: string): Promise<any> => {
        try {
            const model = this.assetModelMap[assetType];
            if (!model) {
                return null;
            }
            return await model.findOne({
                where : { id: assetId }
            });
        } catch (error) {
            Logger.instance().error(`Error getting asset by id ${assetId}`, 500, error);
            return null;
        }
    };

    private createAsset = async (assetType: string, assetData: any): Promise<any> => {
        try {
            const model = this.assetModelMap[assetType];
            if (!model) {
                Logger.instance().log(`Warning: Unknown asset type ${assetType}, skipping.`);
                return null;
            }

            const cleanedData = this.cleanAssetData(assetData);

            const existingAsset = await model.findOne({
                where : { AssetCode: assetData.AssetCode }
            });

            if (existingAsset) {
                Logger.instance().log(`Asset ${assetData.AssetCode} already exists, returning existing asset.`);
                return existingAsset;
            }

            const createdAsset = await model.create(cleanedData);
            return createdAsset;
        } catch (error) {
            Logger.instance().error(`Error creating asset of type ${assetType}`, 500, error);
            throw error;
        }
    };

    private getAssetByCode = async (assetType: string, assetCode: string): Promise<any> => {
        try {
            const model = this.assetModelMap[assetType];
            if (!model) {
                return null;
            }
            return await model.findOne({
                where : { AssetCode: assetCode }
            });
        } catch (error) {
            Logger.instance().error(`Error getting asset by code ${assetCode}`, 500, error);
            return null;
        }
    };

    private updateAsset = async (assetType: string, assetId: string, assetData: any): Promise<void> => {
        try {
            const model = this.assetModelMap[assetType];
            if (!model) {
                return;
            }

            const cleanedData = this.cleanAssetData(assetData);
            await model.update(cleanedData, {
                where : { id: assetId }
            });
        } catch (error) {
            Logger.instance().error(`Error updating asset ${assetId}`, 500, error);
            throw error;
        }
    };

     private cleanAssetData = (data: any): any => {
         const cleaned = { ...data };

         const fieldsToRemove = [
             'AssetType',
             'AssetCategory',
             'DisplayId',
             'id',
             'CreatedAt',
             'UpdatedAt',
             'DeletedAt',
         ];

         for (const field of fieldsToRemove) {
             delete cleaned[field];
         }

         if (cleaned.Tags && Array.isArray(cleaned.Tags)) {
             cleaned.Tags = JSON.stringify(cleaned.Tags);
         }
         if (cleaned.TemplateButtonIds && Array.isArray(cleaned.TemplateButtonIds)) {
             cleaned.TemplateButtonIds = JSON.stringify(cleaned.TemplateButtonIds);
         }
         if (cleaned.TemplateVariables && typeof cleaned.TemplateVariables === 'object') {
             cleaned.TemplateVariables = JSON.stringify(cleaned.TemplateVariables);
         }
         if (cleaned.Metadata && typeof cleaned.Metadata === 'object') {
             cleaned.Metadata = JSON.stringify(cleaned.Metadata);
         }

         return cleaned;
     };

    //#endregion

}
