import {
    AudioDto
} from '../../../domain.types/assets/audio.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class AudioMapper {

    static toDto = (audio: any): AudioDto => {
        if (audio == null) {
            return null;
        }
        const dto: AudioDto = {
            id             : audio.id,
            AssetCode      : audio.AssetCode,
            Name           : audio.Name,
            Transcript     : audio.Transcript,
            Url            : audio.Url,
            FileResourceId : audio.FileResourceId,
            AssetCategory  : audio.AssetCategory,
            OwnerUserId    : audio.OwnerUserId,
            Tags           : audio.Tags,
            Version        : audio.Version,

        };
        return dto;
    };

}
