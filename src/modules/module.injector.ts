import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { FileStorageInjector } from './storage/file.storage.injector';
import { EventInjector } from './events/event.injector';

////////////////////////////////////////////////////////////////////////////////

export class ModuleInjector {

    static registerInjections(container: DependencyContainer) {
        FileStorageInjector.registerInjections(container);
        EventInjector.registerInjections(container);
    }

}
