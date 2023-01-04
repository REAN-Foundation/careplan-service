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
import { AssetTypeList } from '../../../domain.types/assets/asset.types';

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
    //#endregion

        getDashboardStats = async () => {
            try {
                // for enrollment stats

                const EnrollmentResults = await this.Enrollment.findAndCountAll();
                console.log(`Enrollment = ${JSON.stringify(EnrollmentResults.rows)}`);

                const sortedEnrollments = (EnrollmentResults.rows).sort(
                    (a, b) => a.CreatedAt.getTime() - b.CreatedAt.getTime(),
                );

                var enrollmentsArray = function getFields(input, field) {
                    var output = [];
                    for (var i = 0; i < input.length ; ++i)
                        output.push(input[i][field]);
                    return output;
                };
                
                var retrievedDates = enrollmentsArray((sortedEnrollments), "CreatedAt");
 
                var datesAaray = retrievedDates.map((element) => {
                    var d = new Date(element);
                    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                    
                });

                console.log(datesAaray);

                var incrementalEnrollmentCount = Array.from(
                    datesAaray.reduce((date, c) => date.set(c, (date.get(c) || 0) + 1), new Map()),
                    (([x, y]) => ({ x, y }))
                );
                  
                console.log('Incrementalenrollment',incrementalEnrollmentCount);

                const enrollmentStatistics = {
                    TotalEnrollments : EnrollmentResults.count,
                    IncrementalDaily : incrementalEnrollmentCount
                };

                //for careplan stats

                const CareplanResults = await this.Careplan.findAndCountAll();

                const careplanStatistics = {
                    TotalCareplans : CareplanResults.count,
                    
                };
                
                // for api clients stats

                const ApiClientResults = await this.ApiClient.findAndCountAll();

                const apiclientStatistics = {
                    TotalApiClients : ApiClientResults.count,
                    
                };

                // for assets stats

                const assetTypes = AssetTypeList;

                const assetsStatistics = {
                    TotalAssets : assetTypes.length,
                    
                };

                // // for participant stats
                const ParticipantsResults = await this.Participant.findAndCountAll();

                const participantsStatistics = {
                    TotalParticipants : ParticipantsResults.count,
                    
                };

                const dashboardStats = {
                    EnrollmentStatistics  : enrollmentStatistics,
                    CareplanStatistics    : careplanStatistics,
                    ApiclientStatistics   : apiclientStatistics,
                    ParticipantStatistics : participantsStatistics,
                    AssetsStatistics      : assetsStatistics

                };

                return dashboardStats;

            } catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to search enrollment records!', error);
            }
   
        }

}
