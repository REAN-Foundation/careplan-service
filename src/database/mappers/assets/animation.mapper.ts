import {
    AnimationDto
} from '../../../domain.types/assets/animation.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class AnimationMapper {

    static toDto = (animation: any): AnimationDto => {
        if (animation == null) {
            return null;
        }
        const dto: AnimationDto = {
            id             : animation.id,
            AssetCode      : animation.AssetCode,
            Name           : animation.Name,
            Transcript     : animation.Transcript,
            Url            : animation.Url,
            FileResourceId : animation.FileResourceId,
            AssetCategory  : animation.AssetCategory,
            OwnerUserId    : animation.OwnerUserId,
            Tags           : animation.Tags,
            Version        : animation.Version,

        };
        return dto;
    };

}
