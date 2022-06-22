import express from "express";
import { Logger } from "../common/logger";
import { register as registerCareplanRoutes         } from "../api/careplan/careplan/careplan.routes";
import { register as registerCareplanCategoryRoutes } from "../api/careplan/careplan.category/careplan.category.routes";
import { register as registerCareplanScheduleRoutes } from "../api/careplan/careplan.schedule/careplan.schedule.routes";
import { register as registerApiClientRoutes        } from "../api/api.client/api.client.routes";
import { register as registerActionPlanRoutes       } from "../api/assets/action.plan/action.plan.routes";
import { register as registerAnimationRoutes        } from "../api/assets/animation/animation.routes";
import { register as registerAppointmentRoutes      } from "../api/assets/appointment/appointment.routes";
import { register as registerArticleRoutes          } from "../api/assets/article/article.routes";
import { register as registerAssessmentRoutes       } from "../api/assets/assessment/assessment.routes";
import { register as registerAudioRoutes            } from "../api/assets/audio/audio.routes";
import { register as registerBiometricsRoutes       } from "../api/assets/biometrics/biometrics.routes";
import { register as registerChallengeRoutes        } from "../api/assets/challenge/challenge.routes";
import { register as registerCheckupRoutes          } from "../api/assets/checkup/checkup.routes";
import { register as registerConsulationRoutes      } from "../api/assets/consultation/consultation.routes";
import { register as registerExerciseRoutes         } from "../api/assets/exercise/exercise.routes";
import { register as registerGoalRoutes             } from "../api/assets/goal/goal.routes";
import { register as registerInfographicsRoutes     } from "../api/assets/infographics/infographics.routes";
import { register as registerMedicationRoutes       } from "../api/assets/medication/medication.routes";
import { register as registerMeditationRoutes       } from "../api/assets/meditation/meditation.routes";
import { register as registerMessageRoutes          } from "../api/assets/message/message.routes";
import { register as registerNutritionRoutes        } from "../api/assets/nutrition/nutrition.routes";
import { register as registerPhysiotherapyRoutes    } from "../api/assets/physiotherapy/physiotherapy.routes";
import { register as registerPriorityRoutes         } from "../api/assets/priority/priority.routes";
import { register as registerReflectionRoutes       } from "../api/assets/reflection/reflection.routes";
import { register as registerReminderRoutes         } from "../api/assets/reminder/reminder.routes";
import { register as registerVideoRoutes            } from "../api/assets/video/video.routes";
import { register as registerWebLinkRoutes          } from "../api/assets/web.link/web.link.routes";
import { register as registerWebNewsFeedRoutes      } from "../api/assets/web.newsfeed/web.newsfeed.routes";
import { register as registerWordPowerRoutes        } from "../api/assets/word.power/word.power.routes";
import { register as registerEnrollmentRoutes       } from "../api/enrollment/enrollment/enrollment.routes";
import { register as registerEnrollmentScheduleRoutes } from "../api/enrollment/enrollment.schedule/enrollment.schedule.routes";
import { register as registerFileREsourceRoutes       } from "../api/file.resource/file.resource.routes";
import { register as registerTypesRoutes              } from "../api/types/types.routes";
import { register as registerUserRoutes               } from "../api/user/user.routes";
import { register as registerUserActivityResponseRoutes   } from "../api/user.responses/user.activity.response/user.activity.response.routes";
import { register as registerUserSelectedActionPlanRoutes } from "../api/user.responses/user.selected.action.plan/user.selected.action.plan.routes";
import { register as registerUserSelectedGoalRoutes       } from "../api/user.responses/user.selected.goal/user.selected.goal.routes";
import { register as registerUserSelectedPriorityRoutes   } from "../api/user.responses/user.selected.priority/user.selected.priority.routes";
import { register as registerUserRoleRoutes               } from "../api/user.role/user.role.routes";

////////////////////////////////////////////////////////////////////////////////////

export class Router {

    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {

                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message : `Careplan Service API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerCareplanRoutes(this._app);
                registerCareplanCategoryRoutes(this._app);
                registerApiClientRoutes(this._app);
                registerCareplanCategoryRoutes(this._app);
                registerCareplanScheduleRoutes(this._app);
                registerApiClientRoutes(this._app);
                registerActionPlanRoutes(this._app);
                registerAnimationRoutes(this._app);
                registerAppointmentRoutes(this._app);
                registerArticleRoutes(this._app);
                registerAssessmentRoutes(this._app);
                registerAudioRoutes(this._app);
                registerBiometricsRoutes(this._app);
                registerChallengeRoutes(this._app);
                registerCheckupRoutes(this._app);
                registerConsulationRoutes(this._app);
                registerExerciseRoutes(this._app);
                registerGoalRoutes(this._app);
                registerInfographicsRoutes(this._app);
                registerMedicationRoutes(this._app);
                registerMeditationRoutes(this._app);
                registerMessageRoutes(this._app);
                registerNutritionRoutes(this._app);
                registerPhysiotherapyRoutes(this._app);
                registerPriorityRoutes(this._app);
                registerReflectionRoutes(this._app);
                registerReminderRoutes(this._app);
                registerVideoRoutes(this._app);
                registerWebLinkRoutes(this._app);
                registerWebNewsFeedRoutes(this._app);
                registerWordPowerRoutes(this._app);
                registerEnrollmentRoutes(this._app);
                registerEnrollmentScheduleRoutes(this._app);
                registerFileREsourceRoutes(this._app);
                registerTypesRoutes(this._app);
                registerUserRoutes(this._app);
                registerUserActivityResponseRoutes(this._app);
                registerUserSelectedActionPlanRoutes(this._app);
                registerUserSelectedGoalRoutes(this._app);
                registerUserSelectedPriorityRoutes(this._app);
                registerUserRoleRoutes(this._app);

                resolve(true);

            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };

}
