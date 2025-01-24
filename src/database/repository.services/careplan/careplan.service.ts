import { CareplanModel } from '../../models/careplan/careplan.model';
import { CareplanCategoryModel } from '../../models/careplan/careplan.category.model';
import { UserModel } from '../../models/user/user.model';
import { ErrorHandler } from '../../../common/error.handler';
import { CareplanCreateModel } from '../../../domain.types/careplan/careplan.domain.types';
import { CareplanDto, CareplanSearchFilters, CareplanSearchResults } from '../../../domain.types/careplan/careplan.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Op } from 'sequelize';
import { CareplanActivityModel } from '../../../database/models/careplan/careplan.activity.model';
import { CheckupModel } from '../../models/assets/checkup.model';
import { ConsultationModel } from '../../models/assets/consultation.model';
import { ExerciseModel } from '../../models/assets/exercise.model';
import { InfographicsModel } from '../../models/assets/infographics.model';
import { PriorityModel } from '../../models/assets/priority.model';
import { ReflectionModel } from '../../models/assets/reflection.model';
import { VideoModel } from '../../models/assets/video.model';
import { WebNewsfeedModel } from '../../models/assets/web.newsfeed.model';
import { WordPowerModel } from '../../models/assets/word.power.model';
import { WebLinkModel } from '../../models/assets/web.link.model';
import { ReminderModel } from '../../models/assets/reminder.model';
import { PhysiotherapyModel } from '../../models/assets/physiotherapy.model';
import { NutritionModel } from '../../models/assets/nutrition.model';
import { ActionPlanModel } from '../../models/assets/action.plan.model';
import { AnimationModel } from '../../models/assets/animation.model';
import { AppointmentModel } from '../../models/assets/appointment.model';
import { ArticleModel } from '../../models/assets/article.model';
import { AssessmentModel } from '../../models/assets/assessment.model';
import { AudioModel } from '../../models/assets/audio.model';
import { BiometricsModel } from '../../models/assets/biometrics.model';
import { ChallengeModel } from '../../models/assets/challenge.model';
import { GoalModel } from '../../models/assets/goal.model';
import { MeditationModel } from '../../models/assets/meditation.model';
import { MessageModel } from '../../models/assets/message.model';
import { MedicationModel } from '../../models/assets/medication.model';
import { AssetType } from '../../../domain.types/assets/asset.types';
import { TimeHelper } from '../../../common/time.helper';
import { DateStringFormat } from '../../../domain.types/miscellaneous/time.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanService {

    //#region Models

    Careplan = CareplanModel.Model;

    CareplanCategory = CareplanCategoryModel.Model;

    User = UserModel.Model;

    CareplanActivity = CareplanActivityModel.Model;

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
    //#endregion

    create = async (createModel: CareplanCreateModel): Promise<CareplanDto> => {
        try {
            var record = await this.Careplan.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create care plan!', error);
        }
    };

    getById = async (id): Promise<CareplanDto> => {
        try {
            var record = await this.Careplan.findOne({
                where : {
                    id : id
                },
                include : [{
                    model    : this.CareplanCategory,
                    required : false,
                    as       : 'Category',
                    //through: { attributes: [] }
                }
                ]
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve care plan!', error);
        }
    };

    exists = async (code): Promise<uuid> => {
        try {
            const record = await this.Careplan.findOne(
                {
                    where : {
                        Code : code
                    }
                }
            );
            return record.id;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of care plan!', error);
        }
    };

    search = async (filters: CareplanSearchFilters): Promise<CareplanSearchResults> => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.Code) {
                search.where['Code'] = filters.Code;
            }
            if (filters.CategoryId) {
                search.where['CategoryId'] = filters.CategoryId;
            }
            if (filters.Name) {
                search.where['Name'] =
                 {
                     [Op.like] : '%' + filters.Name + '%'
                 };
            }
            if (filters.Version) {
                search.where['Version'] = filters.Version;
            }
            if (filters.OwnerUserId) {
                search.where['OwnerUserId'] = filters.OwnerUserId;
            }
            if (filters.Tags) {
                search.where['Tags'] = filters.Tags;
            }
            if (filters.IsActive) {
                search.where['IsActive'] = filters.IsActive;
            }
            const includeCareplanCategoryAsCategory = {
                model    : this.CareplanCategory,
                required : false,
                as       : 'Category',
                where    : {}
            };
            //if (filters.Xyz != undefined) {
            //    includeCareplanCategory.where['Xyz'] = filters.Xyz;
            //}
            search.include.push(includeCareplanCategoryAsCategory);

            //Sorting
            let orderByColumn = 'CreatedAt';
            if (filters.OrderBy) {
                orderByColumn = filters.OrderBy;
            }
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [
                [orderByColumn, order]
            ];

            if (filters.OrderBy) {
                //In case the order-by attribute is on associated model
                //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
            }

            //Pagination
            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const foundResults = await this.Careplan.findAndCountAll(search);
            const searchResults: CareplanSearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : foundResults.rows.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : foundResults.rows,
            };

            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search care plan records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Careplan.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update care plan!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update care plan!', error);
        }
    };

    delete = async (id) => {
        try {
            var result = await this.Careplan.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete care plan!', error);
        }
    };

    readCareplanObjToExport = async (careplanId: uuid) => {
        var careplan = await this.getById(careplanId);
        if (!careplan) {
            return null;
        }
        var careplanActivities = await this.getCareplanActivitiesForExport(careplanId);
        var { assets, activities } = await this.getcareplanActivitiesWithAssetsForExport(careplanActivities);
        var carepalnObj = {
            CareplanId         : careplan.id,
            Code               : careplan.Code,
            Name               : careplan.Name,
            Description        : careplan.Description,
            Tags               : careplan.Tags,
            Version            : careplan.Version,
            CareplanCategory   : careplan.Category,
            CareplanActivities : activities,
            Assets             : assets
        };
        return carepalnObj;
    };

    getCareplanActivitiesForExport = async (careplanId: uuid) => {
        try {
            var activities = await this.CareplanActivity.findAll({
                where : {
                    CareplanId : careplanId
                }
            });
            return activities;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve care plan activities!', error);
        }
    };

    getcareplanActivitiesWithAssetsForExport = async (carepalnActivities) => {
        try {
            var assets = [];
            var activities = [];
            var index = 0;
            for await (var carepalnActivity of carepalnActivities) {
                const { AssetType, AssetId } = carepalnActivity;
                index++;
                const model = this.assetModelMap[AssetType];
                var asset = await model.findOne({ where: { id: AssetId } });
                const sequence = index.toString().padStart(4, '0');
                asset.AssetCode = `${TimeHelper.getDateString(new Date(), DateStringFormat.YYYY_MM_DD)}-${sequence}`;
                assets.push(asset);
                activities.push({
                    CarepalnActivity : carepalnActivity,
                    Asset            : asset
                });
            }
            return { assets, activities };
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve assets!', error);
        }
    };

}
///////////////////////////////////////////////////////////////////////////////////////////////
