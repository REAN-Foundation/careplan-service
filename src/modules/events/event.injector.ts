import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { ConfigurationManager } from '../../config/configuration.manager';
import { RabbitMqEventConsumer } from './providers/rabbitmq/rabbitmq.event.consumer';
import { MessagingProvider } from '../../domain.types/events/provider.types';
import { AwsSqsEventConsumer } from './providers/aws.sqs/sqs.event.consumer';

export class EventInjector {
    
    static registerInjections(container: DependencyContainer) {
        const provider = ConfigurationManager.MessagingProvider();
        if (provider === MessagingProvider.RABBITMQ) {
            container.register('IEventConsumer', RabbitMqEventConsumer);
        }
        if (provider === MessagingProvider.AWS_SNS_SQS) {
            container.register('IEventConsumer', AwsSqsEventConsumer);
        }
    }

}

