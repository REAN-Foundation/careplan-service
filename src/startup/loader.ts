import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Logger } from '../common/logger';
import { Injector } from './injector';
import { Scheduler } from './scheduler';
import { IEventConsumer } from '../modules/events/interfaces/event.consumer.interface';

//////////////////////////////////////////////////////////////////////////////////////////////////

export class Loader {

    //#region Variables
    
    private static _scheduler: Scheduler = Scheduler.instance();

    private static _container: DependencyContainer = container;

    private static _eventConsumers: IEventConsumer = null;

    //#endregion

    public static get Scheduler() {
        return Loader._scheduler;
    }

    public static get Container() {
        return Loader._container;
    }

    public static init = async (): Promise<boolean> => {
        try {

            //Register injections here...
            Injector.registerInjections();

            // Loader._authenticator = container.resolve(Authenticator);
            // Loader._authorizer = container.resolve(Authorizer);

            Loader._eventConsumers = container.resolve('IEventConsumer');
            await Loader._eventConsumers.startListening();

            return true;

        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };

}
