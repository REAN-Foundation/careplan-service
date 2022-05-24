import {
    WebNewsfeedDto
} from '../../../domain.types/assets/web.newsfeed.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class WebNewsfeedMapper {

    static toDto = (webNewsfeed: any): WebNewsfeedDto => {
        if (webNewsfeed == null) {
            return null;
        }
        const dto: WebNewsfeedDto = {
            id            : webNewsfeed.id,
            AssetCode     : webNewsfeed.AssetCode,
            Name          : webNewsfeed.Name,
            Description   : webNewsfeed.Description,
            Url           : webNewsfeed.Url,
            AssetCategory : webNewsfeed.AssetCategory,
            OwnerUserId   : webNewsfeed.OwnerUserId,
            Tags          : webNewsfeed.Tags,
            Version       : webNewsfeed.Version,

        };
        return dto;
    };

}
