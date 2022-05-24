import {
    VideoDto
} from '../../../domain.types/assets/video.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class VideoMapper {

    static toDto = (video: any): VideoDto => {
        if (video == null) {
            return null;
        }
        const dto: VideoDto = {
            id             : video.id,
            AssetCode      : video.AssetCode,
            Name           : video.Name,
            Transcript     : video.Transcript,
            Url            : video.Url,
            FileResourceId : video.FileResourceId,
            AssetCategory  : video.AssetCategory,
            OwnerUserId    : video.OwnerUserId,
            Tags           : video.Tags,
            Version        : video.Version,

        };
        return dto;
    };

}
