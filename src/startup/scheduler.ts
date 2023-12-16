import * as cron from 'node-cron';
import * as CronSchedules from '../../seed.data/cron.schedules.json';
import { Logger } from '../common/logger';
import { StatisticsControllerDelegate } from '../api/statistics/statistics.controller.delegate';

///////////////////////////////////////////////////////////////////////////

export class Scheduler {

    //#region Static privates

    private static _instance: Scheduler = null;

    private static _schedules = null;

    _delegate: StatisticsControllerDelegate = null;

    private constructor() {
        this._delegate = new StatisticsControllerDelegate();
        const env = process.env.NODE_ENV || 'development';
        Scheduler._schedules = CronSchedules[env];
        Logger.instance().log('Initializing the schedular.');
    }

    //#endregion

    //#region Publics

    public static instance(): Scheduler {
        return this._instance || (this._instance = new this());
    }

    public schedule = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {

                this.scheduleDailyReminders();
                this.scheduleDailyStatistics();
                
                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the scheduler.: ' + error.message);
                reject(false);
            }
        });
    };

    //#endregion

    //#region Privates

    private scheduleDailyReminders = () => {
        cron.schedule(Scheduler._schedules['DailyReminder'], () => {
            Logger.instance().log('Running scheducled jobs: Daily reminders...');
            // (async () => {
            // var service = Loader.container.resolve(UserTaskService);
            // await service.sendTaskReminders();
            // })();
        });
    };
    
    private scheduleDailyStatistics = () => {
        cron.schedule(Scheduler._schedules['DailyStatistics'], () => {
            (async () => {
                Logger.instance().log('Running scheduled jobs: creating overall statistics...');
                await this._delegate.createDailyStatistics();
            })();
        });
    };
    //#endregion

}
