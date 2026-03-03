import { ActionPlanModel } from '../../models/assets/action.plan.model';
import { AnimationModel } from '../../models/assets/animation.model';
import { AppointmentModel } from '../../models/assets/appointment.model';
import { ArticleModel } from '../../models/assets/article.model';
import { AssessmentModel } from '../../models/assets/assessment.model';
import { AudioModel } from '../../models/assets/audio.model';
import { BiometricsModel } from '../../models/assets/biometrics.model';
import { ChallengeModel } from '../../models/assets/challenge.model';
import { CheckupModel } from '../../models/assets/checkup.model';
import { ConsultationModel } from '../../models/assets/consultation.model';
import { ExerciseModel } from '../../models/assets/exercise.model';
import { GoalModel } from '../../models/assets/goal.model';
import { InfographicsModel } from '../../models/assets/infographics.model';
import { MedicationModel } from '../../models/assets/medication.model';
import { MeditationModel } from '../../models/assets/meditation.model';
import { MessageModel } from '../../models/assets/message.model';
import { NutritionModel } from '../../models/assets/nutrition.model';
import { PhysiotherapyModel } from '../../models/assets/physiotherapy.model';
import { PriorityModel } from '../../models/assets/priority.model';
import { ReflectionModel } from '../../models/assets/reflection.model';
import { ReminderModel } from '../../models/assets/reminder.model';
import { VideoModel } from '../../models/assets/video.model';
import { WebLinkModel } from '../../models/assets/web.link.model';
import { WebNewsfeedModel } from '../../models/assets/web.newsfeed.model';
import { WordPowerModel } from '../../models/assets/word.power.model';
import { ErrorHandler } from '../../../common/error.handler';
import { AssetType, AssetTypeCodePrefixes } from '../../../domain.types/assets/asset.types';
import { Helper } from '../../../common/helper';
import { v4 as uuidv4 } from 'uuid';

///////////////////////////////////////////////////////////////////////////////////////////////

export class AssetHelper {

    //#region Publics

    public static getAsset = async (id: string, assetType: AssetType) => {
        try {

            switch (assetType) {
                case AssetType.ActionPlan: {
                    return await ActionPlanModel.Model.findByPk(id);
                }
                case AssetType.Animation: {
                    return await AnimationModel.Model.findByPk(id);
                }
                case AssetType.Appointment: {
                    return await AppointmentModel.Model.findByPk(id);
                }
                case AssetType.Article: {
                    return await ArticleModel.Model.findByPk(id);
                }
                case AssetType.Assessment: {
                    return await AssessmentModel.Model.findByPk(id);
                }
                case AssetType.Audio: {
                    return await AudioModel.Model.findByPk(id);
                }
                case AssetType.Biometrics: {
                    return await BiometricsModel.Model.findByPk(id);
                }
                case AssetType.Challenge: {
                    return await ChallengeModel.Model.findByPk(id);
                }
                case AssetType.Checkup: {
                    return await CheckupModel.Model.findByPk(id);
                }
                case AssetType.Consultation: {
                    return await ConsultationModel.Model.findByPk(id);
                }
                case AssetType.Exercise: {
                    return await ExerciseModel.Model.findByPk(id);
                }
                case AssetType.Goal: {
                    return await GoalModel.Model.findByPk(id);
                }
                case AssetType.Infographics: {
                    return await InfographicsModel.Model.findByPk(id);
                }
                case AssetType.Medication: {
                    return await MedicationModel.Model.findByPk(id);
                }
                case AssetType.Meditation: {
                    return await MeditationModel.Model.findByPk(id);
                }
                case AssetType.Message: {
                    return await MessageModel.Model.findByPk(id);
                }
                case AssetType.Nutrition: {
                    return await NutritionModel.Model.findByPk(id);
                }
                case AssetType.Physiotherapy: {
                    return await PhysiotherapyModel.Model.findByPk(id);
                }
                case AssetType.Priority: {
                    return await PriorityModel.Model.findByPk(id);
                }
                case AssetType.Reflection: {
                    return await ReflectionModel.Model.findByPk(id);
                }
                case AssetType.Reminder: {
                    return await ReminderModel.Model.findByPk(id);
                }
                case AssetType.Video: {
                    return await VideoModel.Model.findByPk(id);
                }
                case AssetType.WebLink: {
                    return await WebLinkModel.Model.findByPk(id);
                }
                case AssetType.WebNewsfeed: {
                    return await WebNewsfeedModel.Model.findByPk(id);
                }
                case AssetType.WordPower: {
                    return await WordPowerModel.Model.findByPk(id);
                }
                default: {
                    ErrorHandler.throwNotFoundError(`Cannot find the asset type!`);
                }
            }
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve action plan!', error);
        }
    };

    public static generateAssetCode = (assetType: AssetType, assetName: string): string => {

        if (!AssetTypeCodePrefixes[assetType]) {
            ErrorHandler.throwNotFoundError(`This asset type is not handled - ${assetType}`);
        }

        const name = assetName.toUpperCase();

        // Pass 1: extract consonants only (no vowels, no non-alpha)
        let nameSegment = '';
        for (let i = 0; i < name.length; i++) {
            const ch = name.charAt(i);
            if (Helper.isAlpha(ch) && !Helper.isAlphaVowel(ch)) {
                nameSegment += ch;
            }
        }

        // Pass 2: if fewer than 3 consonants, fall back to all alphanumeric chars
        if (nameSegment.length < 3) {
            nameSegment = '';
            for (let i = 0; i < name.length; i++) {
                const ch = name.charAt(i);
                if (/[A-Z0-9]/.test(ch)) {
                    nameSegment += ch;
                }
            }
        }

        // Fixed 6 chars: truncate then right-pad with '0'
        nameSegment = nameSegment.substring(0, 6).padEnd(6, '0');

        // UUID6: first 6 hex chars of UUID v4, uppercase
        const uuid8 = uuidv4().replace(/-/g, '').substring(0, 6).toUpperCase();

        return `${AssetTypeCodePrefixes[assetType]}-${nameSegment}-${uuid8}`;
    };

    public static isNewFormatCode = (code: string): boolean => {
        return /^[A-Z0-9]{4}-[A-Z0-9]{6}-[A-Z0-9]{6}$/.test(code);
    };

    public static updateAssetCode = async (record, service) => {
        if (!record.AssetCode) {
            const assetCode = AssetHelper.generateAssetCode(record.AssetType, record.Name);
            const updated = await service.update(record.id, { AssetCode: assetCode });
            if (updated == null) {
                ErrorHandler.throwInternalServerError('Unable to update asset!');
            }
            return updated;
        }
        return record;
    };

}
