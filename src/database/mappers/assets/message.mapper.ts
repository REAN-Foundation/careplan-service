import {
    MessageDto
} from '../../../domain.types/assets/message.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class MessageMapper {

    static toDto = (message: any): MessageDto => {
        if (message == null) {
            return null;
        }
        const dto: MessageDto = {
            id            : message.id,
            AssetCode     : message.AssetCode,
            Name          : message.Name,
            Description   : message.Description,
            AssetCategory : message.AssetCategory ,
            MessageType   : message.MessageType,
            OwnerUserId   : message.OwnerUserId,
            Tags          : message.Tags,
            Url           : message.Url,
            Version       : message.Version,

        };
        return dto;
    };

}
