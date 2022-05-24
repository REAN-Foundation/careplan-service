import {
    InfographicsDto
} from '../../../domain.types/assets/infographics.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class InfographicsMapper {

    static toDto = (infographics: any): InfographicsDto => {
        if (infographics == null) {
            return null;
        }
        const dto: InfographicsDto = {
            id             : infographics.id,
            AssetCode      : infographics.AssetCode,
            Name           : infographics.Name,
            Description    : infographics.Description,
            Url            : infographics.Url,
            FileResourceId : infographics.FileResourceId,
            AssetCategory  : infographics.AssetCategory,
            OwnerUserId    : infographics.OwnerUserId,
            Tags           : infographics.Tags,
            Version        : infographics.Version,

        };
        return dto;
    };

}
