import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { CustomAuthenticator } from './custom/custom.authenticator';
import { CustomAuthorizer } from './custom/custom.authorizer';

////////////////////////////////////////////////////////////////////////////////

export class AuthInjector {

    static registerInjections(container: DependencyContainer) {
        
        container.register('IAuthenticator', CustomAuthenticator);
        container.register('IAuthorizer', CustomAuthorizer);

    }

}
