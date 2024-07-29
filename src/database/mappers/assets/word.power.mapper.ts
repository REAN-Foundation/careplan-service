import {
    WordPowerDto
} from '../../../domain.types/assets/word.power.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class WordPowerMapper {

    static toDto = (wordPower: any): WordPowerDto => {
        if (wordPower == null) {
            return null;
        }
        const dto: WordPowerDto = {
            id                  : wordPower.id,
            AssetCode           : wordPower.AssetCode,
            Name                : wordPower.Name,
            Description         : wordPower.Description,
            AdditionalResources : wordPower.AdditionalResources,
            AssetCategory       : wordPower.AssetCategory,
            OwnerUserId         : wordPower.OwnerUserId,
            Tags                : wordPower.Tags,
            Version             : wordPower.Version,

        };
        return dto;
    };

}
