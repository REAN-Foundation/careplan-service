import {
    WebLinkDto
} from '../../../domain.types/assets/web.link.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class WebLinkMapper {

    static toDto = (webLink: any): WebLinkDto => {
        if (webLink == null) {
            return null;
        }
        const dto: WebLinkDto = {
            id            : webLink.id,
            AssetCode     : webLink.AssetCode,
            Name          : webLink.Name,
            Description   : webLink.Description,
            Url           : webLink.Url,
            AssetCategory : webLink.AssetCategory,
            OwnerUserId   : webLink.OwnerUserId,
            Tags          : webLink.Tags,
            Version       : webLink.Version,

        };
        return dto;
    };

}
