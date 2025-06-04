import 'reflect-metadata';
import { ModuleInjector } from '../modules/module.injector';
import { container, DependencyContainer } from 'tsyringe';
import { AuthInjector } from '../auth/auth.injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

// export class Injector {

//     static registerInjections(container: DependencyContainer) {
//         //Auth
//         AuthInjector.registerInjections(container);

//         //Modules
//         ModuleInjector.registerInjections(container);
//     }

// }

export class Injector {

    private static _container: DependencyContainer = container;

    public static get Container() {
        return Injector._container;
    }

    static registerInjections() {
        AuthInjector.registerInjections(Injector.Container);
        // DatabaseInjector.registerInjections(Injector.Container);
        ModuleInjector.registerInjections(Injector.Container);
    }

}
