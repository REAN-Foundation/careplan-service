import {
    EnrollmentModel
} from '../../models/enrollment/enrollment.model';
import {
    CareplanModel
} from '../../models/careplan/careplan.model';
import {
    ParticipantModel
} from '../../../database/models/enrollment/participant.model';
import {
    ErrorHandler
} from '../../../common/error.handler';

import {
    ParticipantActivityResponseModel
} from '../../../database/models/participant.responses/participant.activity.response.model';
import { EnrollmentTaskModel } from '../../../database/models/enrollment/enrollment.task.model';
import { CareplanCategoryModel } from '../../../database/models/careplan/careplan.category.model';
import { ApiClientModel } from '../../../database/models/api.client.model';
// import { AssetTypeList } from '../../../domain.types/assets/asset.types';
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

///////////////////////////////////////////////////////////////////////////////////////////////

export class StatisticsService {
    
    //#region Models

    Enrollment = EnrollmentModel.Model;

    Careplan = CareplanModel.Model;

    Participant = ParticipantModel.Model;

    ParticipantActivityResponse = ParticipantActivityResponseModel.Model;

    EnrollmentTask = EnrollmentTaskModel.Model;

    CareplanCatrgory = CareplanCategoryModel.Model;

    ApiClient = ApiClientModel.Model;

    ActionPlan = ActionPlanModel.Model;

    Animation = AnimationModel.Model;

    Appointment = AppointmentModel.Model;

    Article = ArticleModel.Model;

    Assessment = AssessmentModel.Model;

    Audio = AudioModel.Model;

    Biometrics = BiometricsModel.Model;

    Challenge = ChallengeModel.Model;

    Checkup = CheckupModel.Model;

    Consultation = ConsultationModel.Model;

    Exercise = ExerciseModel.Model;

    Goal = GoalModel.Model;

    Infographics = InfographicsModel.Model;

    Medication = MedicationModel.Model;

    Meditation = MeditationModel.Model;

    Message = MessageModel.Model;

    Nutrition = NutritionModel.Model;

    Physiotherapy = PhysiotherapyModel.Model;

    Priority = PriorityModel.Model;

    Reflection = ReflectionModel.Model;

    Reminder = ReminderModel.Model;

    Video = VideoModel.Model;

    WebLink = WebLinkModel.Model;

    WebNewsfeed = WebNewsfeedModel.Model;

    WordPower = WordPowerModel.Model;

    //#endregion

        getDashboardStats = async () => {
            try {
                //for careplan stats
                const careplanResults_ = await this.Careplan.findAndCountAll();
                const careplanResults = careplanResults_.rows;
                const accumulativeCareplanDaily = accumlativeData(careplanResults);
                const incrementalCareplanDaily = incrementalData(careplanResults);

                const careplanStatistics = {
                    TotalCareplans   : careplanResults_.count,
                    IncrementalDaily : incrementalCareplanDaily,
                    AccumlativeDaily : accumulativeCareplanDaily,
                    
                };
                
                // for api clients stats
                const apiClientResults_ = await this.ApiClient.findAndCountAll();
                const apiClientResults = apiClientResults_.rows;
                const accumulativeApiClientDaily = accumlativeData(apiClientResults);
                const incrementalApiClientDaily = incrementalData(apiClientResults);
                const apiclientStatistics = {
                    TotalApiClients  : apiClientResults_.count,
                    IncrementalDaily : incrementalApiClientDaily ,
                    AccumlativeDaily : accumulativeApiClientDaily,
  
                };

                // for participant stats
                const participantsResults_ = await this.Participant.findAndCountAll();
                const participantsResults = participantsResults_.rows;
                const accumulativeParticipantDaily = accumlativeData(participantsResults);
                const incrementalParticipantDaily = incrementalData(participantsResults);
                const participantsStatistics = {
                    TotalParticipants : participantsResults_.count,
                    IncrementalDaily  : incrementalParticipantDaily,
                    AccumlativeDaily  : accumulativeParticipantDaily,
                    
                };

                // for enrollment stats
                const enrollmentResults_ = await this.Enrollment.findAndCountAll();
                const enrollmentResults = enrollmentResults_.rows;
                const accumulativeEnrollmentDaily = accumlativeData(enrollmentResults);
                const incrementalEnrollmentDaily = incrementalData(enrollmentResults);
                const enrollmentStatistics = {
                    TotalEnrollments : enrollmentResults_.count,
                    IncrementalDaily : incrementalEnrollmentDaily,
                    AccumlativeDaily : accumulativeEnrollmentDaily
                };

                // for active enrollment stats
                const activeEnrollments = enrollmentResults.filter(x =>x.EndDate.getTime() >= new Date());
                const totalActiveEnrollments = activeEnrollments.length;
                const accumulativeActiveEnrollmentDaily = accumlativeData(activeEnrollments);
                const incrementalActiveEnrollmentDaily = incrementalData(activeEnrollments);
                const activeEnrollmentsStatistics = {
                    TotalActiveEnrollments : totalActiveEnrollments,
                    IncrementalDaily       : accumulativeActiveEnrollmentDaily,
                    AccumlativeDaily       : incrementalActiveEnrollmentDaily,
                };

                // for assets stats
                const actionPlan_ = await this.ActionPlan.findAndCountAll();
                const actionPlan  = actionPlan_.rows;
                // console.log(`Enrollments = ${JSON.stringify(actionPlan)}`);
                const animation_ = await this.Animation.findAndCountAll();
                const animation = animation_.rows;
                const appointment_ = await this.Appointment.findAndCountAll();
                const appointment = appointment_.rows;
                const article_ = await this.Article.findAndCountAll();
                const article = article_.rows;
                const assessment_ = await this.Assessment.findAndCountAll();
                const assessment = assessment_.rows;
                const audio_ = await this.Audio.findAndCountAll();
                const audio = audio_.rows;
                const biometrics_ = await this.Biometrics.findAndCountAll();
                const biometrics = biometrics_.rows;
                const challenge_ = await this.Challenge.findAndCountAll();
                const challenge = challenge_.rows;
                const checkup_ = await this.Checkup.findAndCountAll();
                const checkup = checkup_.rows;
                const consultation_ = await this.Consultation.findAndCountAll();
                const consultation = consultation_.rows;
                const exercise_ = await this.Exercise.findAndCountAll();
                const exercise = exercise_.rows;
                const goal_ = await this.Goal.findAndCountAll();
                const goal  = goal_.rows;
                const infographics_ = await this.Infographics.findAndCountAll();
                const infographics = infographics_.rows;
                const medication_ = await this.Medication.findAndCountAll();
                const medication = medication_.rows;
                const meditation_ = await this.Meditation.findAndCountAll();
                const meditation = meditation_.rows;
                const message_ = await this.Message.findAndCountAll();
                const message = message_.rows;
                const nutrition_ = await this.Nutrition.findAndCountAll();
                const nutrition = nutrition_.rows;
                const physiotherapy_ = await this.Physiotherapy.findAndCountAll();
                const physiotherapy = physiotherapy_.rows;
                const priority_ = await this.Priority.findAndCountAll();
                const priority = priority_.rows;
                const reflection_ = await this.Reflection.findAndCountAll();
                const reflection = reflection_.rows;
                const reminder_ = await this.Reminder.findAndCountAll();
                const reminder = reminder_.rows;
                const video_ = await this.Video.findAndCountAll();
                const video = video_.rows;
                const webLink_ = await this.WebLink.findAndCountAll();
                const webLink = webLink_.rows;
                const webNewsfeed_ = await this.WebNewsfeed.findAndCountAll();
                const webNewsfeed = webNewsfeed_.rows;
                const wordPower_ = await this.WordPower.findAndCountAll();
                const wordPower = wordPower_.rows;

                const assets =
                [...actionPlan,
                    ...animation,
                    ...appointment,
                    ...article,
                    ...assessment,
                    ...audio,
                    ...biometrics,
                    ...challenge,
                    ...checkup,
                    ...consultation,
                    ...exercise,
                    ...goal,
                    ...infographics,
                    ...medication,
                    ...meditation,
                    ...message,
                    ...nutrition,
                    ...physiotherapy,
                    ...priority,
                    ...reflection,
                    ...reminder,
                    ...video,
                    ...webLink,
                    ...webNewsfeed,
                    ...wordPower,
                ] ;
                const totalAssetsCount = (
                    (actionPlan_.count) + (animation_.count) + (appointment_.count) + (article_.count) +
                    (assessment_.count) + (audio_.count) + (biometrics_.count) + (challenge_.count) +
                    (checkup_.count) + (consultation_.count) + (exercise_.count) + (goal_.count) +
                    (medication_.count) + (meditation_.count) +  (message_.count) +
                    (nutrition_.count) + (physiotherapy_.count) + (priority_.count) +
                    (reflection_.count) + (reminder_.count) +  (video_.count) +
                   (webLink_.count) + (webNewsfeed_.count) + (wordPower_.count)
                );

                const accumulativeAssetsDaily = accumlativeData(assets);
                const incrementalAssetsDaily = incrementalData(assets);
                // const assetTypes = AssetTypeList;
                const assetsStatistics = {
                    TotalAssets      : totalAssetsCount,
                    IncrementalDaily : accumulativeAssetsDaily,
                    AccumlativeDaily : incrementalAssetsDaily,
                      
                };

                const dashboardStats = {
                    CareplanStatistics         : careplanStatistics,
                    ApiclientStatistics        : apiclientStatistics,
                    ParticipantStatistics      : participantsStatistics,
                    EnrollmentStatistics       : enrollmentStatistics,
                    ActiveEnrollmentStatistics : activeEnrollmentsStatistics,
                    AssetsStatistics           : assetsStatistics,

                };

                return dashboardStats;

            } catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to search enrollment records!', error);
            }
   
        }

}

const accumlativeData = (retrivedData) => {
    try {
        const createdAtDate: Date[] = [];
        (retrivedData).forEach((item) => {
            createdAtDate.push(new Date(item.CreatedAt));
        });
        const accumulativeDaily: { x: Date; y: number }[] = [];
        const uniqueDate: Date[] = [];
        let flag = 0;
        createdAtDate.forEach((item) => {
            const d = new Date(item);
            d.setUTCHours(0, 0, 0, 0);
            uniqueDate.forEach((j) => {
                const p = new Date(j);
                p.setUTCHours(0, 0, 0, 0);
                if (p.getTime() === d.getTime()) {
                    flag = 1;
                }
            });
            if (flag === 0) {
                uniqueDate.push(d);
                flag = 0;
            }
        });
        uniqueDate.sort((a: Date, b: Date) => {
            return a.getTime() - b.getTime();
        });
        const startDate = new Date(uniqueDate[0]);
        const endDate = new Date(uniqueDate[uniqueDate.length - 1]);
        let count = 0;
        while (startDate.getTime() <= endDate.getTime()) {
            let temp = new Date(startDate);
            createdAtDate.forEach(() => {
                createdAtDate.forEach((i) => {
                    const c = new Date(i);
                    c.setUTCHours(0, 0, 0, 0);
                    if (c.getTime() === temp.getTime()) {
                        count++;
                    }
                });
                accumulativeDaily.push({
                    x : temp,
                    y : count,
                });
                count = 0;
                startDate.setUTCDate(startDate.getUTCDate() + 1);
                temp = new Date(startDate);
                
            });
        }
        return accumulativeDaily;
    }
    catch (err){
        ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', err);
    }
};

const incrementalData = (retrivedData) => {
    try {
        const createdAtDate: Date[] = [];
        (retrivedData).forEach((item) => {
            createdAtDate.push(new Date(item.CreatedAt));
        });
        const incrementalDaily: { x: Date; y: number }[] = [];
        const uniqueDate: Date[] = [];
        let flag = 0;
        createdAtDate.forEach((item) => {
            const d = new Date(item);
            d.setUTCHours(0, 0, 0, 0);
            uniqueDate.forEach((j) => {
                const p = new Date(j);
                p.setUTCHours(0, 0, 0, 0);
                if (p.getTime() === d.getTime()) {
                    flag = 1;
                }
            });
            if (flag === 0) {
                uniqueDate.push(d);
                flag = 0;
            }
        });
        uniqueDate.sort((a: Date, b: Date) => {
            return a.getTime() - b.getTime();
        });
        const start1 = new Date(uniqueDate[0]);
        const end1 = new Date(uniqueDate[uniqueDate.length - 1]);
        let count = 0;
        
        while (start1.getTime() <= end1.getTime()) {
            let temp = new Date(start1);
            createdAtDate.forEach(() => {
                createdAtDate.forEach((i) => {
                    const c = new Date(i);
                    c.setUTCHours(0, 0, 0, 0);
                    if (c.getTime() === temp.getTime()) {
                        count++;
                    }
                });
                incrementalDaily.push({
                    x : temp,
                    y : count,
                });
                const y = count;
                count = y;
                start1.setUTCDate(start1.getUTCDate() + 1);
                temp = new Date(start1);
                
            });
        }
        return incrementalDaily;
    }
    catch (err){
        ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', err);
    }
};
