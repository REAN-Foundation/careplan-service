import { ParticipantControllerDelegate } from "../api/enrollment/participant/participant.controller.delegate";
import { EventMessage, UserDeleteEvent } from "../domain.types/events/event.types";
import { Logger } from "./logger";

export class EventHandler {

    static _delegate: ParticipantControllerDelegate = new ParticipantControllerDelegate();

    static async handleUserDeletion(event: EventMessage) {
        try {
            const payload: UserDeleteEvent = event.Payload as UserDeleteEvent;
            Logger.instance().log('User deletion event received: ' + JSON.stringify(event));
            if (!payload?.PatientUserId) {
                Logger.instance().log('Patient user id is required for user deletion event');
                return;
            }
            const participant = await EventHandler._delegate.getByUserId(payload?.PatientUserId);
            if (participant) {
                await EventHandler._delegate.delete(participant.id);
            }
            
        } catch (error) {
            Logger.instance().log('Error handling user deletion event: ' + error.message);
        }
    }

}
