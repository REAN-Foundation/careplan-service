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
import { TimeHelper } from '../../../common/time.helper';
import { DurationType } from '../../../domain.types/miscellaneous/time.types';

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
            const accumulativeCareplanDaily = statisticsData(careplanResults);
            
            const careplanStatistics = {
                TotalCareplans : careplanResults_.count,
                CareplansDaily : accumulativeCareplanDaily,
                    
            };
                
            // for api clients stats
            const apiClientResults_ = await this.ApiClient.findAndCountAll();
            const apiClientResults = apiClientResults_.rows;
            const accumulativeApiClientDaily = statisticsData(apiClientResults);
            const apiclientStatistics = {
                TotalApiClients : apiClientResults_.count,
                ApiClientsDaily : accumulativeApiClientDaily,
  
            };

            // for participant stats
            const participantsResults_ = await this.Participant.findAndCountAll();
            const participantsResults = participantsResults_.rows;
            const accumulativeParticipantDaily = statisticsData(participantsResults);
            const participantStatistics = {
                TotalParticipants : participantsResults_.count,
                ParticipantsDaily : accumulativeParticipantDaily,
                    
            };

            // for enrollment stats
            const enrollmentResults_ = await this.Enrollment.findAndCountAll();
            const enrollmentResults = enrollmentResults_.rows;
            const accumulativeEnrollmentDaily = statisticsData(enrollmentResults);
               
            const enrollmentStatistics = {
                TotalEnrollments : enrollmentResults_.count,
                EnrollmentsDaily : accumulativeEnrollmentDaily
            };

            // for active enrollment stats
            const activeEnrollments = enrollmentResults.filter(x =>x.EndDate.getTime() >= new Date());
            const totalActiveEnrollments = activeEnrollments.length;
            const accumulativeActiveEnrollmentDaily = statisticsData(activeEnrollments);
            const activeEnrollmentStatistics = {
                TotalActiveEnrollments : totalActiveEnrollments,
                ActiveEnrollmentsDaily : accumulativeActiveEnrollmentDaily,
                
            };

            // for assets stats
            const actionPlan_ = await this.ActionPlan.findAndCountAll();
            const actionPlan  = actionPlan_.rows;
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
                (infographics_.count) + (medication_.count) + (meditation_.count) +  (message_.count) +
                (nutrition_.count) + (physiotherapy_.count) + (priority_.count) +
                (reflection_.count) + (reminder_.count) +  (video_.count) +
                (webLink_.count) + (webNewsfeed_.count) + (wordPower_.count)
            );

            const accumulativeAssetsDaily = statisticsData(assets);
            const assetsStatistics = {
                TotalAssets : totalAssetsCount,
                AssetsDaily : accumulativeAssetsDaily ,
                    
            };
                
            const enrollmentTasks_ = await this.EnrollmentTask.findAndCountAll();
            const enrollmentTasks = enrollmentTasks_.rows;
            const ParticipantActivityResponse_ = await this.ParticipantActivityResponse.findAndCountAll();
            const ParticipantActivityResponse = ParticipantActivityResponse_ .rows;
            const userEngagementDaily = userEngagement(enrollmentTasks,ParticipantActivityResponse);

            const userEngagementSattistics = {
                UserEngagementDaily : userEngagementDaily,
                      
            };

            const dashboardStats = {
                CareplanStatistics         : careplanStatistics,
                ApiclientStatistics        : apiclientStatistics,
                ParticipantStatistics      : participantStatistics,
                EnrollmentStatistics       : enrollmentStatistics,
                ActiveEnrollmentStatistics : activeEnrollmentStatistics,
                AssetsStatistics           : assetsStatistics,
                UserEngagementSattistics   : userEngagementSattistics,
            };

            return dashboardStats;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search enrollment records!', error);
        }
   
    };

}

const statisticsData = (retrievedData) => {
    try {
        const { minDate, maxDate } = getMinMaxDates(retrievedData);
        var d = minDate;
        var itemCounts = [];
        while (d < maxDate)
        {
            var dStart = d;
            var dEnd = TimeHelper.addDuration(d, 24, DurationType.Hour);
            var itemsForDay = retrievedData.filter(x => x.CreatedAt >= dStart && x.CreatedAt < dEnd);
            var incrementalItemCount = itemsForDay.length; //Count for the day
            var itemsTillDay = retrievedData.filter(x => x.CreatedAt >= minDate && x.CreatedAt < dEnd);
            var accumulativeItemCount = itemsTillDay.length;
            itemCounts.push({
                Day          : d,
                Incremental  : incrementalItemCount,
                Accumulative : accumulativeItemCount
            });
            d = TimeHelper.addDuration(d, 24, DurationType.Hour);
        }
        return itemCounts;
    }
    catch (err){
        ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', err);
    }
};

const userEngagement = (enrollmentTasks, ParticipantActivityResponse) => {
    try {
        var { minDate, maxDate } = getMinMaxDates(enrollmentTasks);
        var d = minDate;
        var itemCounts = [];
        while (d < maxDate)
        {
            var dStart = d;
            var dEnd = TimeHelper.addDuration(d, 24, DurationType.Hour);
            var itemsForDay = enrollmentTasks.filter(x => x.ScheduledDate >= dStart && x.ScheduledDate < dEnd);
            var enrollmentTasksCount = itemsForDay.length; //Count for the day
            var itemsForDay =
            ParticipantActivityResponse.filter(x => x.TimeResponded >= dStart && x.TimeResponded < dEnd);
            var ParticipantActivityResponseCount = itemsForDay.length;
            const userEngagement = (ParticipantActivityResponseCount / enrollmentTasksCount);
            itemCounts.push({
                Day                 : d,
                UserEngagementDaily : userEngagement,
            });
            d = TimeHelper.addDuration(d, 24, DurationType.Hour);
        }
        return itemCounts;
    }
    catch (err){
        ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', err);
    }
};

function getMinMaxDates(retrievedData: any) {
    const dates = retrievedData.map(x => new Date(x.CreatedAt).getTime());
    const minDate_ = Math.min(...dates);
    var minDate = new Date();
    if (minDate_) {
        var temp = new Date(minDate_).setUTCHours(0, 0, 0, 0);
        minDate = new Date(temp);
    }

    const maxDate_ = new Date().setUTCHours(0, 0, 0, 0);
    const maxDate = new Date(maxDate_);

    return { minDate, maxDate };
}

