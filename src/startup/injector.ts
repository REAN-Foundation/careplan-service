import 'reflect-metadata';
import { ModuleInjector } from '../modules/module.injector';
import { DependencyContainer } from 'tsyringe';
import { AuthInjector } from '../auth/auth.injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

export class Injector {

    static registerInjections(container: DependencyContainer) {
        //Auth
        AuthInjector.registerInjections(container);

        //Modules
        ModuleInjector.registerInjections(container);
    }

}
